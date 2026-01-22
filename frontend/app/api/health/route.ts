import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      contractAddress: !!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      usdcAddress: !!process.env.NEXT_PUBLIC_USDC_ADDRESS,
      pinataApiKey: !!(process.env.PINATA_API_KEY || process.env.NEXT_PUBLIC_PINATA_API_KEY),
      privateKey: !!(process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY),
      mongodb: !!(process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI),
    }

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'running',
        environment: envCheck,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    )
  }
}
