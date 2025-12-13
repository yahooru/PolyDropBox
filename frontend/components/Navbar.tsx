'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { WalletButton } from './WalletButton'

export function Navbar() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="bg-white/80 backdrop-blur-sm border-b border-primary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl">
                📦
              </div>
              <h1 className="text-2xl font-bold text-primary-600">PolyDropBox</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <WalletButton />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-primary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl">
              📦
            </div>
            <h1 className="text-2xl font-bold text-primary-600">PolyDropBox</h1>
          </Link>
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                <Link href="/upload" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
                  Upload
                </Link>
                <Link href="/dashboard" className="px-4 py-2 text-primary-600 hover:text-primary-700">
                  Dashboard
                </Link>
                <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              </>
            ) : (
              <WalletButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

