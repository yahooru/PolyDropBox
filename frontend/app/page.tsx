'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            ✨ Preview • Multi-file • Password protection
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Decentralized File Sharing
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share files with expiry, cross-chain payments & blockchain access control on Polygon
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <Link href="/upload" className="px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105">
              📤 Upload File
            </Link>
            <Link href="/dashboard" className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-500 rounded-xl hover:bg-primary-50 transition text-lg font-semibold shadow-lg hover:shadow-xl">
              📊 View Dashboard
            </Link>
          </div>
        </div>

        <div className="mb-16 bg-gradient-to-r from-primary-50 to-white rounded-xl p-8 border border-primary-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">🚀 Powered by Polygon & SideShift</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">⛓️</span>
                <h4 className="text-xl font-semibold text-gray-900">Polygon Blockchain</h4>
              </div>
              <p className="text-gray-600 mb-3">
                Built on <strong>Polygon Amoy Testnet</strong> for fast, low-cost transactions. All file access permissions, payments, and download records are stored on-chain for complete transparency and immutability.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Smart contract-based access control</li>
                <li>✓ On-chain payment verification</li>
                <li>✓ Transparent transaction history</li>
                <li>✓ Gas-efficient operations</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🔄</span>
                <h4 className="text-xl font-semibold text-gray-900">SideShift Integration</h4>
              </div>
              <p className="text-gray-600 mb-3">
                Accept payments in <strong>any cryptocurrency</strong> (BTC, ETH, SOL, BNB, LTC, etc.) via SideShift. Payments are automatically converted to USDC on Polygon, enabling true cross-chain file sharing.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Multi-chain payment support</li>
                <li>✓ Automatic USDC conversion</li>
                <li>✓ Real-time payment tracking</li>
                <li>✓ No manual swaps needed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Encrypted</h3>
            <p className="text-gray-600">Files are encrypted with AES-256 and stored on IPFS with blockchain access control. Your files are protected with military-grade encryption.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition">
            <div className="text-5xl mb-4">💸</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cross-Chain Payments</h3>
            <p className="text-gray-600">Pay with BTC, ETH, SOL, BNB, LTC via SideShift - automatically converted to USDC on Polygon. Accept payments from any blockchain!</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Limited Access</h3>
            <p className="text-gray-600">Set expiry times, download limits, and burn-after-download options for complete control over your shared files.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Features</h3>
            <p className="text-gray-600">Smart pricing suggestions, file type detection, and intelligent access control recommendations powered by AI.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600">Track downloads, payments, and file performance with detailed analytics and insights.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Decentralized Storage</h3>
            <p className="text-gray-600">Files stored on IPFS (InterPlanetary File System) for true decentralization and censorship resistance.</p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">🚀 Built on Polygon Amoy Testnet</h3>
          <p className="text-lg mb-6 text-center">All transactions are on-chain and verifiable</p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="font-semibold text-lg mb-2">Smart Contracts</p>
              <p className="opacity-90 text-sm">Access Control & Payments</p>
              <p className="opacity-75 text-xs mt-2">Contract: 0x570c2d5E...d6938</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="font-semibold text-lg mb-2">IPFS Storage</p>
              <p className="opacity-90 text-sm">Decentralized & Censorship-Resistant</p>
              <p className="opacity-75 text-xs mt-2">Powered by Pinata</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="font-semibold text-lg mb-2">SideShift</p>
              <p className="opacity-90 text-sm">Cross-Chain Payments</p>
              <p className="opacity-75 text-xs mt-2">Multi-chain support</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">View on PolygonScan:</p>
            <a 
              href="https://amoy.polygonscan.com/address/0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-100 hover:text-white underline text-sm"
            >
              PolyDropBox Contract
            </a>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-primary-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-primary-600">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload</h4>
              <p className="text-sm text-gray-600">Upload your file and set access rules (price, expiry, limits)</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-primary-600">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Encrypt & Store</h4>
              <p className="text-sm text-gray-600">File is encrypted with AES-256 and stored on IPFS</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-primary-600">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Link</h4>
              <p className="text-sm text-gray-600">Get a shareable link with blockchain access control</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-primary-600">4</div>
              <h4 className="font-semibold text-gray-900 mb-2">Pay & Access</h4>
              <p className="text-sm text-gray-600">Users pay via Polygon USDC or any crypto via SideShift</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

