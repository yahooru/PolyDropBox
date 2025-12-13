import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/polydropbox'

// Connect to MongoDB if not connected
if (!mongoose.connections[0] || mongoose.connections[0].readyState !== 1) {
  mongoose.connect(MONGODB_URI).catch(err => console.error('MongoDB connection error:', err))
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creator = searchParams.get('creator')

    // Return 400 if creator is missing
    if (!creator) {
      return NextResponse.json({ error: 'Creator address required' }, { status: 400 })
    }

    // Ensure MongoDB is connected
    if (!mongoose.connections[0] || mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(MONGODB_URI)
    }

    const files = await File.find({ creator }).sort({ createdAt: -1 })
    return NextResponse.json({ files })
  } catch (error: any) {
    console.error('Get files error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch files', message: error.message },
      { status: 500 }
    )
  }
}
