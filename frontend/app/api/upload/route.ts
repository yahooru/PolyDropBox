import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { ethers } from 'ethers'
import { connectDB, File } from '@/lib/db'

connectDB()

const PINATA_API_KEY = process.env.PINATA_API_KEY || process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('hex')
}

function encryptFile(buffer: Buffer, key: string): string {
  return CryptoJS.AES.encrypt(
    buffer.toString('base64'),
    key
  ).toString()
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

async function uploadToIPFS(buffer: Buffer, fileName: string): Promise<string> {
  const formData = new FormData()
  const blob = new Blob([new Uint8Array(buffer)])
  formData.append('file', blob, fileName)
  formData.append('pinataMetadata', JSON.stringify({ name: fileName }))
  formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }))

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
}

async function generatePreview(buffer: Buffer, fileName: string, mimeType: string): Promise<string | null> {
  try {
    const ext = fileName.toLowerCase().split('.').pop()
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')
    const isPdf = ext === 'pdf'

    if (isImage) {
      const sharp = (await import('sharp')).default
      const previewBuffer = await sharp(buffer)
        .resize(400, 400, { fit: 'inside' })
        .blur(15)
        .png()
        .toBuffer()
      return uploadToIPFS(previewBuffer, `preview_${fileName}.png`)
    }

    if (isPdf) {
      const { PDFDocument } = await import('pdf-lib')
      const pdfDoc = await PDFDocument.load(buffer)
      const pages = pdfDoc.getPages()
      if (pages.length > 0) {
        const newPdf = await PDFDocument.create()
        const [firstPage] = await newPdf.copyPages(pdfDoc, [0])
        newPdf.addPage(firstPage)
        const pdfBytes = await newPdf.save()
        return uploadToIPFS(Buffer.from(pdfBytes), `preview_${fileName}`)
      }
    }
  } catch (err) {
    console.error('Preview generation failed:', err)
  }
  return null
}

async function processSingleFile(
  file: File,
  options: {
    price: string
    expiryHours: string
    maxDownloads: string
    burnAfterDownload: boolean
    enableCrossChain: boolean
    creator: string
    sharePassword?: string
    linkExpiryHours?: string
  }
) {
  const fileId = crypto.randomBytes(16).toString('hex')
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const encryptionKey = generateEncryptionKey()
  const encryptedString = encryptFile(buffer, encryptionKey)
  const encryptedBuffer = Buffer.from(encryptedString, 'utf8')

  const ipfsHash = await uploadToIPFS(encryptedBuffer, file.name)

  let previewHash: string | null = null
  const mimeType = file.type || 'application/octet-stream'
  try {
    previewHash = await generatePreview(buffer, file.name, mimeType)
  } catch (_) {}

  const expiryTime = Math.floor(Date.now() / 1000) + parseInt(options.expiryHours) * 3600
  const linkExpiresAt = options.linkExpiryHours
    ? Math.floor(Date.now() / 1000) + parseInt(options.linkExpiryHours) * 3600
    : undefined

  const fileRecord = new File({
    fileId,
    fileName: file.name,
    fileSize: file.size,
    ipfsHash,
    encryptedKey: encryptionKey,
    creator: options.creator,
    price: parseFloat(options.price || '0'),
    expiryTime,
    maxDownloads: parseInt(options.maxDownloads || '1'),
    burnAfterDownload: options.burnAfterDownload,
    enableCrossChain: options.enableCrossChain,
    previewHash: previewHash || undefined,
    sharePasswordHash: options.sharePassword ? hashPassword(options.sharePassword) : undefined,
    linkExpiresAt,
    mimeType,
  })

  await fileRecord.save()

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
      const priceInWei = ethers.parseUnits(options.price || '0', 6)
      const tx = await contract.createFile(
        fileId,
        ipfsHash,
        priceInWei,
        expiryTime,
        parseInt(options.maxDownloads || '1'),
        options.burnAfterDownload
      )
      await tx.wait()
    } catch (error) {
      console.error('Blockchain error:', error)
    }
  }

  return {
    fileId,
    fileName: file.name,
    shareLink: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/file/${fileId}`,
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const creator = formData.get('creator') as string

    if (!creator) {
      return NextResponse.json({ error: 'Creator address required' }, { status: 400 })
    }

    const price = (formData.get('price') as string) || '0'
    const expiryHours = (formData.get('expiryHours') as string) || '24'
    const maxDownloads = (formData.get('maxDownloads') as string) || '1'
    const burnAfterDownload = formData.get('burnAfterDownload') === 'true'
    const enableCrossChain = formData.get('enableCrossChain') !== 'false'
    const sharePassword = formData.get('sharePassword') as string | undefined
    const linkExpiryHours = formData.get('linkExpiryHours') as string | undefined

    const options = {
      price,
      expiryHours,
      maxDownloads,
      burnAfterDownload,
      enableCrossChain,
      creator,
      sharePassword: sharePassword || undefined,
      linkExpiryHours: linkExpiryHours || undefined,
    }

    const files = formData.getAll('file') as File[]
    const validFiles = files.filter((f) => f && f.size > 0)

    if (validFiles.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const results: { fileId: string; fileName: string; shareLink: string }[] = []

    for (const file of validFiles) {
      const result = await processSingleFile(file, options)
      results.push(result)
    }

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
    return NextResponse.json({
      success: true,
      count: results.length,
      files: results,
      fileId: results[0]?.fileId,
      shareLink: results.length === 1 ? `${baseUrl}/file/${results[0].fileId}` : undefined,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', message: error.message },
      { status: 500 }
    )
  }
}
