import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { ethers } from 'ethers'
import CryptoJS from 'crypto-js'
import { connectDB, File } from '@/lib/db'

connectDB()

function decryptFile(encryptedData: string, key: string): Buffer {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key)
  return Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64')
}

async function getFileFromIPFS(ipfsHash: string): Promise<string> {
  const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, {
    responseType: 'text',
  })
  return response.data
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

    if (file.linkExpiresAt && Date.now() / 1000 > file.linkExpiresAt) {
      return NextResponse.json({ error: 'Share link has expired' }, { status: 410 })
    }

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const privateKey = process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY
    let txHash: string | undefined

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

        try {
          const tx = await contract.recordDownload(fileId, user)
          await tx.wait()
          txHash = tx.hash
        } catch (error) {
          console.error('Blockchain record download error:', error)
        }
      } catch (error) {
        console.error('Blockchain access check error:', error)
      }
    }

    const encryptedData = await getFileFromIPFS(file.ipfsHash)
    const decryptedBuffer = decryptFile(encryptedData, file.encryptedKey)

    file.downloadCount++
    file.downloads.push({
      user,
      timestamp: new Date(),
      txHash,
    })
    await file.save()

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
