import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import mongoose from 'mongoose'
import { ethers } from 'ethers'

const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/polydropbox'
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI)
}

const FileSchema = new mongoose.Schema({
  fileId: { type: String, required: true, unique: true },
  fileName: String,
  fileSize: Number,
  ipfsHash: String,
  encryptedKey: String,
  creator: String,
  price: Number,
  expiryTime: Number,
  maxDownloads: Number,
  downloadCount: { type: Number, default: 0 },
  burnAfterDownload: Boolean,
  enableCrossChain: Boolean,
  createdAt: { type: Date, default: Date.now },
})

const SideShiftOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  fileId: { type: String, required: true },
  payer: String,
  depositAddress: String,
  depositAmount: String,
  settleAmount: String,
  inputAsset: String,
  outputAsset: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
})

const File = mongoose.models.File || mongoose.model('File', FileSchema)
const SideShiftOrder = mongoose.models.SideShiftOrder || mongoose.model('SideShiftOrder', SideShiftOrderSchema)

// Asset mapping for SideShift
const assetMap: Record<string, string> = {
  'BTC': 'btc',
  'ETH': 'eth',
  'SOL': 'sol',
  'BNB': 'bnb',
  'LTC': 'ltc',
  'USDC': 'usdc',
}

// Get quote from SideShift (latest API)
async function getSideShiftQuote(
  inputAsset: string,
  outputAsset: string,
  outputNetwork: string,
  amount: string
) {
  try {
    const depositMethodId = assetMap[inputAsset.toUpperCase()] || inputAsset.toLowerCase()
    const settleMethodId = `${assetMap[outputAsset.toUpperCase()] || outputAsset.toLowerCase()}-${outputNetwork.toLowerCase()}`

    const response = await axios.post('https://api.sideshift.ai/v2/quotes', {
      depositMethodId: depositMethodId,
      settleMethodId: settleMethodId,
      depositAmount: parseFloat(amount).toFixed(6),
    }, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.SIDESHIFT_SECRET && { 'x-sideshift-secret': process.env.SIDESHIFT_SECRET }),
      },
    })

    return response.data
  } catch (error: any) {
    console.error('SideShift quote error:', error.response?.data || error.message)
    throw new Error(`SideShift quote failed: ${error.response?.data?.message || error.message}`)
  }
}

// Create fixed shift using quote (latest API)
async function createSideShiftOrder(
  inputAsset: string,
  outputAsset: string,
  outputNetwork: string,
  outputAddress: string,
  amount: string
) {
  try {
    // Step 1: Get quote
    const quote = await getSideShiftQuote(inputAsset, outputAsset, outputNetwork, amount)
    
    if (!quote.id) {
      throw new Error('Invalid quote response')
    }

    // Step 2: Create fixed shift using quote
    const depositMethodId = assetMap[inputAsset.toUpperCase()] || inputAsset.toLowerCase()
    const settleMethodId = `${assetMap[outputAsset.toUpperCase()] || outputAsset.toLowerCase()}-${outputNetwork.toLowerCase()}`

    const response = await axios.post('https://api.sideshift.ai/v2/shifts/fixed', {
      quoteId: quote.id,
      depositMethodId: depositMethodId,
      settleMethodId: settleMethodId,
      settleAddress: outputAddress,
    }, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.SIDESHIFT_SECRET && { 'x-sideshift-secret': process.env.SIDESHIFT_SECRET }),
      },
    })

    return response.data
  } catch (error: any) {
    console.error('SideShift API error:', error.response?.data || error.message)
    throw new Error(`SideShift order creation failed: ${error.response?.data?.message || error.message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fileId, inputAsset, outputAsset, outputNetwork, outputAddress, amount, payer } = body

    // Get file info
    const file = await File.findOne({ fileId })
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    if (!file.enableCrossChain) {
      return NextResponse.json(
        { error: 'Cross-chain payments not enabled for this file' },
        { status: 400 }
      )
    }

    // Create SideShift order
    const order = await createSideShiftOrder(
      inputAsset,
      outputAsset,
      outputNetwork,
      outputAddress,
      amount
    )

    // Store order in database
    const shiftOrder = new SideShiftOrder({
      orderId: order.id,
      fileId,
      payer: payer || 'unknown',
      depositAddress: order.depositAddress || order.deposit?.address,
      depositAmount: (order.depositAmount || order.deposit?.amount || amount).toString(),
      settleAmount: (order.settleAmount || order.settle?.amount || amount).toString(),
      inputAsset,
      outputAsset,
      status: order.status || 'pending',
    })

    await shiftOrder.save()

    return NextResponse.json({
      success: true,
      orderId: order.id,
      depositAddress: order.depositAddress || order.deposit?.address,
      depositAmount: order.depositAmount || order.deposit?.amount || amount,
      settleAmount: order.settleAmount || order.settle?.amount || amount,
      inputAsset,
      outputAsset,
      expiry: order.expiresAt || order.expires || null,
      status: order.status || 'pending',
    })
  } catch (error: any) {
    console.error('SideShift create error:', error)
    return NextResponse.json(
      { error: 'Failed to create SideShift order', message: error.message },
      { status: 500 }
    )
  }
}

