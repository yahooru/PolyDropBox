import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectDB, File } from '@/lib/db'

connectDB()

function verifyPassword(password: string, hash: string): boolean {
  const computed = crypto.createHash('sha256').update(password).digest('hex')
  return computed === hash
}

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

    const hasPassword = !!file.sharePasswordHash
    const linkExpired = file.linkExpiresAt && Date.now() / 1000 > file.linkExpiresAt
    if (linkExpired) {
      return NextResponse.json({ error: 'This share link has expired' }, { status: 410 })
    }

    return NextResponse.json({
      file: {
        ...file.toObject(),
        sharePasswordHash: undefined,
        encryptedKey: undefined,
        hasPassword,
        hasPreview: !!file.previewHash,
      },
    })
  } catch (error: any) {
    console.error('Get file error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params
    const body = await request.json()
    const { action, password } = body

    if (action === 'verify-password') {
      const file = await File.findOne({ fileId })
      if (!file) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 })
      }
      if (!file.sharePasswordHash) {
        return NextResponse.json({ valid: true })
      }
      const valid = password && verifyPassword(password, file.sharePasswordHash)
      return NextResponse.json({ valid: !!valid })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('File action error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
