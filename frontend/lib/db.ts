import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/polydropbox'

export function connectDB() {
  if (!mongoose.connections[0]?.readyState) {
    mongoose.connect(MONGODB_URI)
  }
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
  // New fields
  previewHash: String,
  sharePasswordHash: String,
  linkExpiresAt: Number, // Unix timestamp - when share link expires
  mimeType: String,
  downloads: [{
    user: String,
    timestamp: Date,
    txHash: String,
  }],
})

export const File = mongoose.models.File || mongoose.model('File', FileSchema)
