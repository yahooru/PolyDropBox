import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { ethers } from 'ethers'
import mongoose from 'mongoose'

// MongoDB connection
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
  downloads: [{
    user: String,
    timestamp: Date,
  }],
})

const File = mongoose.models.File || mongoose.model('File', FileSchema)

// Pinata SDK
const PINATA_API_KEY = process.env.PINATA_API_KEY || process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

// Generate encryption key
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('hex')
}

// Encrypt file
function encryptFile(buffer: Buffer, key: string): string {
  return CryptoJS.AES.encrypt(
    buffer.toString('base64'),
    key
  ).toString()
}

// Upload to IPFS via Pinata
async function uploadToIPFS(buffer: Buffer, fileName: string): Promise<string> {
  try {
    const formData = new FormData()
    const blob = new Blob([new Uint8Array(buffer)])
    formData.append('file', blob, fileName)

    const metadata = JSON.stringify({
      name: fileName,
    })
    formData.append('pinataMetadata', metadata)

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options)

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
        maxBodyLength: Infinity,
      }
    )

    return response.data.IpfsHash
  } catch (error: any) {
    console.error('IPFS upload error:', error)
    throw new Error(`IPFS upload failed: ${error.message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const price = formData.get('price') as string || '0'
    const expiryHours = formData.get('expiryHours') as string || '24'
    const maxDownloads = formData.get('maxDownloads') as string || '1'
    const burnAfterDownload = formData.get('burnAfterDownload') === 'true'
    const enableCrossChain = formData.get('enableCrossChain') === 'true'
    const creator = formData.get('creator') as string

    if (!creator) {
      return NextResponse.json({ error: 'Creator address required' }, { status: 400 })
    }

    // Generate file ID
    const fileId = crypto.randomBytes(16).toString('hex')

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate encryption key
    const encryptionKey = generateEncryptionKey()

    // Encrypt file
    const encryptedString = encryptFile(buffer, encryptionKey)
    const encryptedBuffer = Buffer.from(encryptedString, 'utf8')

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(encryptedBuffer, file.name)

    // Calculate expiry time
    const expiryTime = Math.floor(Date.now() / 1000) + parseInt(expiryHours) * 3600

    // Price in USDC (6 decimals)
    const priceInWei = ethers.parseUnits(price || '0', 6)

    // Create file record in MongoDB
    const fileRecord = new File({
      fileId,
      fileName: file.name,
      fileSize: file.size,
      ipfsHash,
      encryptedKey: encryptionKey,
      creator,
      price: parseFloat(price || '0'),
      expiryTime,
      maxDownloads: parseInt(maxDownloads || '1'),
      burnAfterDownload,
      enableCrossChain,
    })

    await fileRecord.save()

    // Create file on blockchain
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const privateKey = process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY

    if (contractAddress && privateKey) {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || 'https://rpc-amoy.polygon.technology'
        )
        const wallet = new ethers.Wallet(privateKey, provider)
        
        const contractABI = [
          'function createFile(string memory fileId, string memory ipfsHash, uint256 price, uint256 expiryTime, uint256 maxDownloads, bool burnAfterDownload)',
        ]
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet)
        
        const tx = await contract.createFile(
          fileId,
          ipfsHash,
          priceInWei,
          expiryTime,
          parseInt(maxDownloads || '1'),
          burnAfterDownload
        )
        await tx.wait()
      } catch (error) {
        console.error('Blockchain error:', error)
        // Continue even if blockchain fails
      }
    }

    return NextResponse.json({
      success: true,
      fileId,
      shareLink: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/file/${fileId}`,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', message: error.message },
      { status: 500 }
    )
  }
}

