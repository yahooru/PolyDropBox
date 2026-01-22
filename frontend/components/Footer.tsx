'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg">
                📦
              </div>
              <span className="text-xl font-bold text-primary-600">PolyDropBox</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-md">
              Decentralized file sharing with blockchain access control, IPFS storage, and cross-chain payments on Polygon.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/upload" className="text-gray-600 hover:text-primary-600 text-sm">Upload</Link></li>
              <li><Link href="/dashboard" className="text-gray-600 hover:text-primary-600 text-sm">Dashboard</Link></li>
              <li><a href="https://amoy.polygonscan.com/address/0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 text-sm">Contract</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Powered by</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Polygon</li>
              <li>IPFS / Pinata</li>
              <li>SideShift</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          Built with ❤️ using Polygon, SideShift, IPFS, and Next.js
        </div>
      </div>
    </footer>
  )
}
