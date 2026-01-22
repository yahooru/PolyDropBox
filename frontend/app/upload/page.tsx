'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { WalletButton } from '@/components/WalletButton'
import { Navbar } from '@/components/Navbar'

export default function UploadPage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    price: '0',
    expiryHours: '24',
    maxDownloads: '1',
    burnAfterDownload: false,
    enableCrossChain: true,
    sharePassword: '',
    linkExpiryHours: '',
  })

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 10))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files.length || !isConnected || !address) return

    setUploading(true)
    try {
      const formDataToSend = new FormData()
      files.forEach((file) => formDataToSend.append('file', file))
      formDataToSend.append('price', formData.price)
      formDataToSend.append('expiryHours', formData.expiryHours)
      formDataToSend.append('maxDownloads', formData.maxDownloads)
      formDataToSend.append('burnAfterDownload', String(formData.burnAfterDownload))
      formDataToSend.append('enableCrossChain', String(formData.enableCrossChain))
      formDataToSend.append('creator', address)
      if (formData.sharePassword) {
        formDataToSend.append('sharePassword', formData.sharePassword)
      }
      if (formData.linkExpiryHours) {
        formDataToSend.append('linkExpiryHours', formData.linkExpiryHours)
      }

      const response = await axios.post(`/api/upload`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.data.success) {
        if (response.data.count === 1) {
          router.push(`/file/${response.data.fileId}`)
        } else {
          router.push(`/dashboard`)
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-4">Please connect your wallet to upload files</p>
          <WalletButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload File</h1>
        <p className="text-gray-600 mb-8">Upload single or multiple files. Organize and share securely.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File(s) — up to 10 files
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50/50 scale-[1.01]'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-4xl mb-3">📁</div>
              {files.length > 0 ? (
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-center gap-2">
                      <span className="text-primary-600 font-medium truncate max-w-xs">{file.name}</span>
                      <span className="text-sm text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <p className="text-sm text-gray-500">Click or drag to add more</p>
                </div>
              ) : (
                <p className="text-gray-600">
                  {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (USDC) <span className="text-xs text-gray-500">Applies to each file</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Time</label>
              <select
                value={formData.expiryHours}
                onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="1">1 hour</option>
                <option value="24">24 hours</option>
                <option value="168">7 days</option>
                <option value="720">30 days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Downloads</label>
              <input
                type="number"
                min="1"
                value={formData.maxDownloads}
                onChange={(e) => setFormData({ ...formData, maxDownloads: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Expiry (optional) — when the share link stops working
            </label>
            <select
              value={formData.linkExpiryHours}
              onChange={(e) => setFormData({ ...formData, linkExpiryHours: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">No link expiry</option>
              <option value="24">24 hours</option>
              <option value="168">7 days</option>
              <option value="720">30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Protection (optional)
            </label>
            <input
              type="password"
              value={formData.sharePassword}
              onChange={(e) => setFormData({ ...formData, sharePassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Leave empty for no password"
            />
            <p className="text-xs text-gray-500 mt-1">Recipients must enter this password to view the file page</p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.burnAfterDownload}
                onChange={(e) => setFormData({ ...formData, burnAfterDownload: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Burn after download</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enableCrossChain}
                onChange={(e) => setFormData({ ...formData, enableCrossChain: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Enable cross-chain (SideShift)</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!files.length || uploading}
            className="w-full px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
          >
            {uploading ? 'Uploading...' : files.length > 1 ? `Upload ${files.length} Files` : 'Upload & Create Share Link'}
          </button>
        </form>
      </div>
    </div>
  )
}
