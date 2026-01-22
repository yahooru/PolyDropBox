import { NextRequest, NextResponse } from 'next/server'
import { connectDB, File } from '@/lib/db'

connectDB()

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creator = searchParams.get('creator')

    if (!creator) {
      return NextResponse.json({ error: 'Creator address required' }, { status: 400 })
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
