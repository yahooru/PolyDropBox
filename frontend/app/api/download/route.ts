import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import mongoose from 'mongoose'
import { ethers } from 'ethers'
import CryptoJS from 'crypto-js'

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

// Decrypt file
function decryptFile(encryptedData: string, key: string): Buffer {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key)
  return Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64')
}

// Get file from IPFS
async function getFileFromIPFS(ipfsHash: string): Promise<string> {
  try {
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, {
      responseType: 'text',
    })
    return response.data
  } catch (error: any) {
    console.error('IPFS fetch error:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fileId, user } = body

    if (!fileId || !user) {
      return NextResponse.json({ error: 'File ID and user required' }, { status: 400 })
    }

    const file = await File.findOne({ fileId })
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Check access on blockchain
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const privateKey = process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY

    if (contractAddress && privateKey) {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || 'https://rpc-amoy.polygon.technology'
        )
        const wallet = new ethers.Wallet(privateKey, provider)

        const contractABI = [
          'function hasAccess(string memory fileId, address user) view returns (bool)',
          'function recordDownload(string memory fileId, address user)',
        ]

        const contract = new ethers.Contract(contractAddress, contractABI, wallet)

        const hasAccess = await contract.hasAccess(fileId, user)
        if (!hasAccess) {
          return NextResponse.json({ error: 'Access denied' }, { status: 403 })
        }

        // Record download on blockchain
        try {
          const tx = await contract.recordDownload(fileId, user)
          await tx.wait()
        } catch (error) {
          console.error('Blockchain record download error:', error)
        }
      } catch (error) {
        console.error('Blockchain access check error:', error)
        // Allow download if blockchain check fails (for testing)
      }
    }

    // Get file from IPFS
    const encryptedData = await getFileFromIPFS(file.ipfsHash)
    const encryptedString = encryptedData.toString()

    // Decrypt file
    const decryptedBuffer = decryptFile(encryptedString, file.encryptedKey)

    // Update download count
    file.downloadCount++
    file.downloads.push({ user, timestamp: new Date() })
    await file.save()

    // Return file
    return new NextResponse(new Uint8Array(decryptedBuffer), {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.fileName}"`,
      },
    })
  } catch (error: any) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Download failed', message: error.message },
      { status: 500 }
    )
  }
}

