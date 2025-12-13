'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/Navbar'

const QRCodeSVG = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false })

const contractABI = [
  {
    inputs: [{ name: 'fileId', type: 'string' }],
    name: 'payForAccess',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'fileId', type: 'string' },
      { name: 'user', type: 'address' },
    ],
    name: 'hasAccess',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'fileId', type: 'string' }],
    name: 'getFile',
    outputs: [
      { name: 'ipfsHash', type: 'string' },
      { name: 'creator', type: 'address' },
      { name: 'price', type: 'uint256' },
      { name: 'expiryTime', type: 'uint256' },
      { name: 'maxDownloads', type: 'uint256' },
      { name: 'downloadCount', type: 'uint256' },
      { name: 'burnAfterDownload', type: 'bool' },
      { name: 'isActive', type: 'bool' },
      { name: 'createdAt', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const usdcABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export default function FilePage() {
  const params = useParams()
  const router = useRouter()
  const fileId = params.fileId as string
  const { address, isConnected } = useAccount()
  const [fileInfo, setFileInfo] = useState<any>(null)
  const [sideshiftData, setSideshiftData] = useState<any>(null)
  const [sideshiftStatus, setSideshiftStatus] = useState<string>('pending')
  const [showCrossChain, setShowCrossChain] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState('BTC')
  const [isPolling, setIsPolling] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
  const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`

  const { data: fileData } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getFile',
    args: [fileId],
    query: {
      enabled: !!fileId && !!contractAddress,
    },
  })

  const { data: hasAccess } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'hasAccess',
    args: [fileId, address || '0x'],
    query: {
      enabled: !!fileId && !!address && !!contractAddress,
    },
  })

  const { writeContract: approveUSDC, data: approveHash } = useWriteContract()
  const { writeContract: payForAccess, data: payHash } = useWriteContract()

  const { isLoading: isApproving } = useWaitForTransactionReceipt({
    hash: approveHash,
  })

  const { isLoading: isPaying } = useWaitForTransactionReceipt({
    hash: payHash,
  })

  useEffect(() => {
    if (fileData) {
      const [
        ipfsHash,
        creator,
        price,
        expiryTime,
        maxDownloads,
        downloadCount,
        burnAfterDownload,
        isActive,
        createdAt,
      ] = fileData as any

      setFileInfo({
        ipfsHash,
        creator,
        price: formatUnits(price, 6),
        expiryTime: Number(expiryTime),
        maxDownloads: Number(maxDownloads),
        downloadCount: Number(downloadCount),
        burnAfterDownload,
        isActive,
        createdAt: Number(createdAt),
      })
    }
  }, [fileData])

  // Fetch file metadata from backend
  useEffect(() => {
    if (fileId) {
      axios.get(`/api/file/${fileId}`)
        .then(res => {
          if (res.data.file) {
            setFileName(res.data.file.fileName || 'Unknown File')
          }
        })
        .catch(err => console.error('Error fetching file metadata:', err))
    }
  }, [fileId])

  // Poll for SideShift payment status
  useEffect(() => {
    if (!sideshiftData?.orderId || sideshiftStatus === 'complete') return

    setIsPolling(true)
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `/api/sideshift/status/${sideshiftData.orderId}`
        )
        
        setSideshiftStatus(response.data.status)
        
        if (response.data.completed) {
          setIsPolling(false)
          clearInterval(interval)
          // Refresh access status
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      } catch (error) {
        console.error('Status check error:', error)
      }
    }, 5000) // Poll every 5 seconds

    return () => {
      clearInterval(interval)
      setIsPolling(false)
    }
  }, [sideshiftData?.orderId, sideshiftStatus])

  const handleDirectPayment = async () => {
    if (!fileInfo || !address) return

    const priceInWei = parseUnits(fileInfo.price, 6)

    // First approve USDC
    approveUSDC({
      address: usdcAddress,
      abi: usdcABI,
      functionName: 'approve',
      args: [contractAddress, priceInWei],
    })
  }

  useEffect(() => {
    if (approveHash && !isApproving) {
      // After approval, pay for access
      payForAccess({
        address: contractAddress,
        abi: contractABI,
        functionName: 'payForAccess',
        args: [fileId],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveHash, isApproving])

  const handleCrossChainPayment = async () => {
    if (!address || !fileInfo) return
    
    try {
      const response = await axios.post(`/api/sideshift/create`, {
        fileId,
        inputAsset: selectedAsset,
        outputAsset: 'USDC',
        outputNetwork: 'POLYGON',
        outputAddress: contractAddress,
        amount: fileInfo.price,
        payer: address,
      })

      if (response.data.success) {
        setSideshiftData(response.data)
        setSideshiftStatus('pending')
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error: any) {
      console.error('SideShift error:', error)
      alert(error.response?.data?.error || 'Failed to create SideShift order. Please try again.')
    }
  }

  const handleDownload = async () => {
    if (!hasAccess || !address) return

    try {
      const response = await axios.post(
        `/api/download`,
        {
          fileId,
          user: address,
        },
        {
          responseType: 'blob',
        }
      )

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileInfo.fileName || 'download')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed')
    }
  }

  if (!fileInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading file...</p>
        </div>
      </div>
    )
  }

  const isExpired = Date.now() / 1000 > fileInfo.expiryTime
  const canDownload = hasAccess && !isExpired && fileInfo.isActive

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{fileName || 'File Access'}</h1>
            <p className="text-sm text-gray-500 font-mono">ID: {fileId}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-primary-50 p-4 rounded-lg">
              <span className="text-sm text-gray-600 block mb-1">Price</span>
              <p className="text-2xl font-bold text-primary-600">
                {fileInfo.price === '0.0' ? 'Free' : `${fileInfo.price} USDC`}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm text-gray-600 block mb-1">Status</span>
              <p className={`text-lg font-semibold ${isExpired ? 'text-red-600' : fileInfo.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {isExpired ? 'Expired' : fileInfo.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm text-gray-600 block mb-1">Expires</span>
              <p className={isExpired ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                {new Date(fileInfo.expiryTime * 1000).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm text-gray-600 block mb-1">Downloads</span>
              <p className="text-lg font-semibold text-gray-900">
                {fileInfo.downloadCount} / {fileInfo.maxDownloads}
              </p>
            </div>
          </div>

          {fileInfo.burnAfterDownload && (
            <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ This file will be permanently deleted after download
              </p>
            </div>
          )}

          {!isConnected ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Connect wallet to access file</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                Connect Wallet
              </button>
            </div>
          ) : canDownload ? (
            <div className="text-center py-8">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-semibold text-lg"
              >
                Download File
              </button>
            </div>
          ) : fileInfo.price === '0.0' ? (
            <div className="text-center py-8">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-semibold text-lg"
              >
                Download File (Free)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCrossChain(false)}
                  className={`flex-1 px-4 py-2 rounded-lg transition ${
                    !showCrossChain
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Pay on Polygon
                </button>
                <button
                  onClick={() => setShowCrossChain(true)}
                  className={`flex-1 px-4 py-2 rounded-lg transition ${
                    showCrossChain
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Pay with Any Crypto
                </button>
              </div>

              {!showCrossChain ? (
                <button
                  onClick={handleDirectPayment}
                  disabled={isApproving || isPaying}
                  className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50 font-semibold"
                >
                  {isApproving || isPaying ? 'Processing...' : `Pay ${fileInfo.price} USDC`}
                </button>
              ) : (
                <div className="space-y-4">
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="SOL">Solana (SOL)</option>
                    <option value="BNB">BNB</option>
                    <option value="LTC">Litecoin (LTC)</option>
                  </select>
                  <button
                    onClick={handleCrossChainPayment}
                    disabled={!fileInfo || !address}
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sideshiftData ? 'Create New Payment' : 'Create Payment Link'}
                  </button>

                  {sideshiftData && (
                    <div className="mt-6 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {sideshiftStatus === 'complete' ? '✅ Payment Received!' : 'Send Payment'}
                        </h3>
                        {sideshiftStatus === 'pending' && isPolling && (
                          <div className="flex items-center justify-center space-x-2 text-primary-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                            <span className="text-sm">Waiting for payment confirmation...</span>
                          </div>
                        )}
                      </div>

                      {sideshiftStatus !== 'complete' && (
                        <>
                          <div className="bg-white p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-600 mb-1">Send exactly:</p>
                            <p className="text-xl font-bold text-primary-600 mb-3">
                              {sideshiftData.depositAmount} {selectedAsset}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">To this address:</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-mono text-sm break-all flex-1 bg-gray-100 p-2 rounded">
                                {sideshiftData.depositAddress}
                              </p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(sideshiftData.depositAddress)
                                  alert('Address copied!')
                                }}
                                className="px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 text-sm"
                              >
                                Copy
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-center mb-4">
                            <div className="bg-white p-4 rounded-lg">
                              <QRCodeSVG value={sideshiftData.depositAddress} size={200} />
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-xs text-blue-800 text-center">
                              💡 After sending, payment will be automatically converted to {sideshiftData.settleAmount} USDC on Polygon
                            </p>
                            <p className="text-xs text-blue-600 text-center mt-1">
                              This page will automatically refresh when payment is confirmed
                            </p>
                          </div>
                        </>
                      )}

                      {sideshiftStatus === 'complete' && (
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <p className="text-green-800 font-semibold mb-2">
                            Payment confirmed! You can now download the file.
                          </p>
                          <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-semibold"
                          >
                            Download File
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Share this link:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? `${window.location.origin}/file/${fileId}` : ''}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              />
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(`${window.location.origin}/file/${fileId}`)
                    alert('Link copied!')
                  }
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

