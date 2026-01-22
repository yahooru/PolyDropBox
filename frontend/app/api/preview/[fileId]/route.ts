import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { connectDB, File } from '@/lib/db'

connectDB()

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params
    const file = await File.findOne({ fileId })
    if (!file || !file.previewHash) {
      return NextResponse.json({ error: 'Preview not available' }, { status: 404 })
    }

    const response = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${file.previewHash}`,
      { responseType: 'arraybuffer' }
    )

    const contentType = file.mimeType?.startsWith('image/')
      ? 'image/png'
      : 'application/pdf'

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error: any) {
    console.error('Preview error:', error)
    return NextResponse.json({ error: 'Preview unavailable' }, { status: 500 })
  }
}
