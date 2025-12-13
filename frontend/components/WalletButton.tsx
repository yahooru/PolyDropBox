'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        disabled
      >
        Connect Wallet
      </button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
    >
      Connect Wallet
    </button>
  )
}

