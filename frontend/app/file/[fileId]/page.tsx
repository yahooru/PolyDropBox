'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  const fileId = params.fileId as string
  const { address, isConnected } = useAccount()
  const [fileMeta, setFileMeta] = useState<{
    fileName: string
    hasPassword: boolean
    hasPreview: boolean
    linkExpired?: boolean
    mimeType?: string
  } | null>(null)
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [fileInfo, setFileInfo] = useState<any>(null)
  const [sideshiftData, setSideshiftData] = useState<any>(null)
  const [sideshiftStatus, setSideshiftStatus] = useState<string>('pending')
  const [showCrossChain, setShowCrossChain] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState('BTC')
  const [isPolling, setIsPolling] = useState(false)

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
  const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`

  const { data: fileData } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getFile',
    args: [fileId],
    query: { enabled: !!fileId && !!contractAddress },
  })

  const { data: hasAccess } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'hasAccess',
    args: [fileId, address || '0x'],
    query: { enabled: !!fileId && !!address && !!contractAddress },
  })

  const { writeContract: approveUSDC, data: approveHash } = useWriteContract()
  const { writeContract: payForAccess, data: payHash } = useWriteContract()
  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash })
  const { isLoading: isPaying } = useWaitForTransactionReceipt({ hash: payHash })

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

  useEffect(() => {
    if (fileId) {
      axios
        .get(`/api/file/${fileId}`)
        .then((res) => {
          if (res.data.file) {
            const f = res.data.file
            setFileMeta({
              fileName: f.fileName || 'Unknown File',
              hasPassword: f.hasPassword || false,
              hasPreview: f.hasPreview || false,
              linkExpired: !!f.linkExpiresAt && Date.now() / 1000 > f.linkExpiresAt,
              mimeType: f.mimeType,
            })
          }
        })
        .catch((err) => {
          if (err.response?.status === 410) {
            setFileMeta({ fileName: '', hasPassword: false, hasPreview: false, linkExpired: true })
          } else {
            setFileMeta({ fileName: 'Unknown', hasPassword: false, hasPreview: false })
          }
        })
    }
  }, [fileId])

  useEffect(() => {
    if (!sideshiftData?.orderId || sideshiftStatus === 'complete') return
    setIsPolling(true)
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/sideshift/status/${sideshiftData.orderId}`)
        setSideshiftStatus(res.data.status)
        if (res.data.completed) {
          setIsPolling(false)
          clearInterval(interval)
          setTimeout(() => window.location.reload(), 2000)
        }
      } catch (e) {
        console.error(e)
      }
    }, 5000)
    return () => {
      clearInterval(interval)
      setIsPolling(false)
    }
  }, [sideshiftData?.orderId, sideshiftStatus])

  const handleVerifyPassword = async () => {
    setPasswordError('')
    try {
      const res = await axios.post(`/api/file/${fileId}`, {
        action: 'verify-password',
        password: passwordInput,
      })
      if (res.data.valid) {
        setPasswordVerified(true)
      } else {
        setPasswordError('Incorrect password')
      }
    } catch {
      setPasswordError('Verification failed')
    }
  }

  const handleDirectPayment = async () => {
    if (!fileInfo || !address) return
    const priceInWei = parseUnits(fileInfo.price, 6)
    approveUSDC({
      address: usdcAddress,
      abi: usdcABI,
      functionName: 'approve',
      args: [contractAddress, priceInWei],
    })
  }

  useEffect(() => {
    if (approveHash && !isApproving) {
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
      const res = await axios.post(`/api/sideshift/create`, {
        fileId,
        inputAsset: selectedAsset,
        outputAsset: 'USDC',
        outputNetwork: 'POLYGON',
        outputAddress: contractAddress,
        amount: fileInfo.price,
        payer: address,
      })
      if (res.data.success) {
        setSideshiftData(res.data)
        setSideshiftStatus('pending')
      } else throw new Error('Failed')
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed to create SideShift order')
    }
  }

  const handleDownload = async () => {
    if (!hasAccess || !address) return
    try {
      const res = await axios.post(`/api/download`, { fileId, user: address }, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = fileMeta?.fileName || 'download'
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch {
      alert('Download failed')
    }
  }

  if (!fileInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading file...</p>
        </div>
      </div>
    )
  }

  const needsPassword = fileMeta?.hasPassword && !passwordVerified
  const linkExpired = fileMeta?.linkExpired
  const isExpired = Date.now() / 1000 > fileInfo.expiryTime
  const canDownload = hasAccess && !isExpired && fileInfo.isActive

  if (linkExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h1>
            <p className="text-gray-600">This share link has expired and is no longer accessible.</p>
          </div>
        </div>
      </div>
    )
  }

  if (needsPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-primary-100">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Required</h1>
            <p className="text-gray-600 mb-4">Enter the password to view this file</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerifyPassword()}
              placeholder="Enter password"
              className="w-full px-4 py-3 border rounded-lg mb-4"
            />
            {passwordError && <p className="text-red-600 text-sm mb-2">{passwordError}</p>}
            <button
              onClick={handleVerifyPassword}
              className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-semibold"
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{fileMeta?.fileName || 'File Access'}</h1>
            <p className="text-sm text-gray-500 font-mono">ID: {fileId}</p>
          </div>

          {/* File Preview - Before Payment */}
          {fileMeta?.hasPreview && !canDownload && (
            <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <div className="p-3 bg-gray-100 border-b text-sm font-medium text-gray-700">
                🔍 Preview (before purchase)
              </div>
              <div className="p-4 flex justify-center items-center min-h-[280px]">
                {fileMeta.mimeType === 'application/pdf' ? (
                  <iframe
                    src={`/api/preview/${fileId}`}
                    className="w-full h-[320px] rounded-lg border-0"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="relative inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/preview/${fileId}`}
                      alt="Blurred preview"
                      className="max-h-[400px] rounded-lg object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black/40 rounded-full p-3 text-white text-2xl">🔒</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-primary-50 p-4 rounded-xl">
              <span className="text-sm text-gray-600 block mb-1">Price</span>
              <p className="text-2xl font-bold text-primary-600">
                {fileInfo.price === '0.0' ? 'Free' : `${fileInfo.price} USDC`}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-sm text-gray-600 block mb-1">Status</span>
              <p className={`text-lg font-semibold ${isExpired ? 'text-red-600' : fileInfo.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {isExpired ? 'Expired' : fileInfo.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-sm text-gray-600 block mb-1">Expires</span>
              <p className={isExpired ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                {new Date(fileInfo.expiryTime * 1000).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-sm text-gray-600 block mb-1">Downloads</span>
              <p className="text-lg font-semibold text-gray-900">
                {fileInfo.downloadCount} / {fileInfo.maxDownloads}
              </p>
            </div>
          </div>

          {fileInfo.burnAfterDownload && (
            <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">⚠️ This file will be permanently deleted after download</p>
            </div>
          )}

          {!isConnected ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Connect wallet to access file</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition"
              >
                Connect Wallet
              </button>
            </div>
          ) : canDownload ? (
            <div className="text-center py-8">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition font-semibold text-lg shadow-lg"
              >
                Download File
              </button>
            </div>
          ) : fileInfo.price === '0.0' ? (
            <div className="text-center py-8">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition font-semibold text-lg"
              >
                Download File (Free)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCrossChain(false)}
                  className={`flex-1 px-4 py-2 rounded-xl transition ${!showCrossChain ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Pay on Polygon
                </button>
                <button
                  onClick={() => setShowCrossChain(true)}
                  className={`flex-1 px-4 py-2 rounded-xl transition ${showCrossChain ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Pay with Any Crypto
                </button>
              </div>

              {!showCrossChain ? (
                <button
                  onClick={handleDirectPayment}
                  disabled={isApproving || isPaying}
                  className="w-full px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition disabled:opacity-50 font-semibold"
                >
                  {isApproving || isPaying ? 'Processing...' : `Pay ${fileInfo.price} USDC`}
                </button>
              ) : (
                <div className="space-y-4">
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl"
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
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition font-semibold disabled:opacity-50"
                  >
                    {sideshiftData ? 'Create New Payment' : 'Create Payment Link'}
                  </button>

                  {sideshiftData && (
                    <div className="mt-6 p-6 bg-primary-50 rounded-xl border-2 border-primary-200">
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-mono text-sm"
              />
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(`${window.location.origin}/file/${fileId}`)
                    alert('Link copied!')
                  }
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition"
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
