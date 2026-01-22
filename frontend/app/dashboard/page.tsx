'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import axios from 'axios'
import { WalletButton } from '@/components/WalletButton'
import { Navbar } from '@/components/Navbar'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalDownloads: 0,
    totalRevenue: 0,
  })
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null)

  const fetchFiles = React.useCallback(async () => {
    try {
      const response = await axios.get(`/api/files?creator=${address}`)
      const filesData = response.data.files || []
      setFiles(filesData)

      const totalDownloads = filesData.reduce((sum: number, f: any) => sum + (f.downloadCount || 0), 0)
      const totalRevenue = filesData.reduce((sum: number, f: any) => {
        const revenue = (f.price || 0) * (f.downloadCount || 0)
        return sum + revenue
      }, 0)

      setStats({
        totalFiles: filesData.length,
        totalDownloads,
        totalRevenue,
      })
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }, [address])

  useEffect(() => {
    if (address) fetchFiles()
  }, [address, fetchFiles])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-4">Please connect your wallet to view your dashboard</p>
          <WalletButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your files, downloads, and revenue</p>
          </div>
          <Link
            href="/upload"
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition font-semibold shadow-lg"
          >
            Upload New File
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-100 hover:shadow-xl transition">
            <p className="text-sm text-gray-600 mb-1">Total Files</p>
            <p className="text-3xl font-bold text-primary-600">{stats.totalFiles}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-100 hover:shadow-xl transition">
            <p className="text-sm text-gray-600 mb-1">Total Downloads</p>
            <p className="text-3xl font-bold text-primary-600">{stats.totalDownloads}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-100 hover:shadow-xl transition">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-primary-600">{stats.totalRevenue.toFixed(2)} USDC</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-gray-600 mb-4">No files uploaded yet</p>
            <Link
              href="/upload"
              className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition inline-block font-semibold"
            >
              Upload Your First File
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Your Files</h2>
              <p className="text-sm text-gray-500">Click a row to view download audit logs</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">File Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Downloads</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {files.map((file) => {
                    const isExpired = Date.now() / 1000 > (file.expiryTime || 0)
                    const isExpanded = expandedFileId === file.fileId
                    const downloads = file.downloads || []

                    return (
                      <React.Fragment key={file.fileId}>
                        <tr
                          key={file.fileId}
                          className="hover:bg-gray-50 cursor-pointer transition"
                          onClick={() => setExpandedFileId(isExpanded ? null : file.fileId)}
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{file.fileName || file.fileId}</p>
                            <p className="text-xs text-gray-500 font-mono">{file.fileId.slice(0, 16)}...</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-900 font-semibold">
                              {file.price === 0 ? 'Free' : `${file.price} USDC`}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-900">
                              {file.downloadCount || 0} / {file.maxDownloads || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                isExpired
                                  ? 'bg-red-100 text-red-800'
                                  : file.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {isExpired ? 'Expired' : file.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/file/${file.fileId}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                            >
                              View →
                            </Link>
                          </td>
                        </tr>
                        {isExpanded && downloads.length > 0 && (
                          <tr key={`${file.fileId}-logs`} className="bg-gray-50/50">
                            <td colSpan={5} className="px-6 py-4">
                              <div className="rounded-xl bg-white border border-gray-200 p-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                  📋 Download Audit Logs
                                </h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                  {downloads.map((d: any, i: number) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between text-sm py-2 px-3 bg-gray-50 rounded-lg"
                                    >
                                      <span className="font-mono text-gray-600">
                                        {d.user?.slice(0, 10)}...{d.user?.slice(-8)}
                                      </span>
                                      <span className="text-gray-500">
                                        {d.timestamp
                                          ? new Date(d.timestamp).toLocaleString()
                                          : 'N/A'}
                                      </span>
                                      {d.txHash && (
                                        <a
                                          href={`https://amoy.polygonscan.com/tx/${d.txHash}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary-600 hover:underline text-xs"
                                        >
                                          View TX
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
