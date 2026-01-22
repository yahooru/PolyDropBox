import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import mongoose from 'mongoose'
import { ethers } from 'ethers'

const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/polydropbox'
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI)
}

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

const SideShiftOrder = mongoose.models.SideShiftOrder || mongoose.model('SideShiftOrder', SideShiftOrderSchema)

async function checkSideShiftOrderStatus(orderId: string) {
  try {
    const response = await axios.get(`https://api.sideshift.ai/v2/shifts/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.SIDESHIFT_SECRET && { 'x-sideshift-secret': process.env.SIDESHIFT_SECRET }),
      },
    })
    return response.data
  } catch (error: any) {
    console.error('SideShift status check error:', error.response?.data || error.message)
    throw error
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params

    // Check in database first
    const dbOrder = await SideShiftOrder.findOne({ orderId })
    if (!dbOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Check with SideShift API
    try {
      const orderStatus = await checkSideShiftOrderStatus(orderId)

      // Update database if status changed
      if (orderStatus.status !== dbOrder.status) {
        dbOrder.status = orderStatus.status
        if (orderStatus.status === 'complete') {
          dbOrder.completedAt = new Date()

          // Record payment on blockchain
          const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
          const privateKey = process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY

          if (contractAddress && privateKey) {
            try {
              const provider = new ethers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || 'https://rpc-amoy.polygon.technology'
              )
              const wallet = new ethers.Wallet(privateKey, provider)

              const contractABI = [
                'function recordCrossChainPayment(string memory fileId, address payer, uint256 amount)',
              ]

              const contract = new ethers.Contract(contractAddress, contractABI, wallet)
              const settleAmount = ethers.parseUnits(dbOrder.settleAmount, 6)

              const tx = await contract.recordCrossChainPayment(
                dbOrder.fileId,
                dbOrder.payer,
                settleAmount
              )
              await tx.wait()
              console.log(`Payment recorded for file ${dbOrder.fileId}, order ${orderId}`)
            } catch (blockchainError) {
              console.error('Blockchain error recording payment:', blockchainError)
            }
          }
        }
        await dbOrder.save()
      }

      return NextResponse.json({
        status: orderStatus.status,
        depositAddress: orderStatus.depositAddress,
        depositAmount: orderStatus.depositAmount,
        settleAmount: orderStatus.settleAmount,
        completed: orderStatus.status === 'complete',
      })
    } catch (apiError) {
      // Return database status if API fails
      return NextResponse.json({
        status: dbOrder.status,
        depositAddress: dbOrder.depositAddress,
        depositAmount: dbOrder.depositAmount,
        settleAmount: dbOrder.settleAmount,
        completed: dbOrder.status === 'complete',
      })
    }
  } catch (error: any) {
    console.error('SideShift status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check order status', message: error.message },
      { status: 500 }
    )
  }
}

