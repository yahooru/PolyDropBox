import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

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

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params

    const file = await File.findOne({ fileId })
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    return NextResponse.json({ file })
  } catch (error: any) {
    console.error('Get file error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 }
    )
  }
}

