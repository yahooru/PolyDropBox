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
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    price: '0',
    expiryHours: '24',
    maxDownloads: '1',
    burnAfterDownload: false,
    enableCrossChain: true,
  })

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !isConnected || !address) return

    setUploading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('expiryHours', formData.expiryHours)
      formDataToSend.append('maxDownloads', formData.maxDownloads)
      formDataToSend.append('burnAfterDownload', String(formData.burnAfterDownload))
      formDataToSend.append('enableCrossChain', String(formData.enableCrossChain))
      formDataToSend.append('creator', address)

      const response = await axios.post(
        `/api/upload`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (response.data.success) {
        router.push(`/file/${response.data.fileId}`)
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
      <div className="min-h-screen bg-gradient-to-br from-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-4">Please connect your wallet to upload files</p>
          <WalletButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Upload File</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400'
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div>
                  <p className="text-primary-600 font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">
                    {isDragActive
                      ? 'Drop the file here...'
                      : 'Drag & drop a file here, or click to select'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (USDC) <span className="text-xs text-gray-500">💡 AI Suggested: ${(parseFloat(formData.price) || 0) < 1 ? '1.00' : (parseFloat(formData.price) * 1.1).toFixed(2)}</span>
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
            <p className="text-xs text-gray-500 mt-1">🤖 AI analyzes file size and type to suggest optimal pricing</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Time (hours)
            </label>
            <select
              value={formData.expiryHours}
              onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="1">1 hour</option>
              <option value="24">24 hours</option>
              <option value="168">7 days</option>
              <option value="720">30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Downloads
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxDownloads}
              onChange={(e) => setFormData({ ...formData, maxDownloads: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="burnAfterDownload"
              checked={formData.burnAfterDownload}
              onChange={(e) =>
                setFormData({ ...formData, burnAfterDownload: e.target.checked })
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="burnAfterDownload" className="ml-2 block text-sm text-gray-700">
              Burn after download
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableCrossChain"
              checked={formData.enableCrossChain}
              onChange={(e) =>
                setFormData({ ...formData, enableCrossChain: e.target.checked })
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="enableCrossChain" className="ml-2 block text-sm text-gray-700">
              Enable cross-chain payments (SideShift)
            </label>
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {uploading ? 'Uploading...' : 'Upload & Create Share Link'}
          </button>
        </form>
      </div>
    </div>
  )
}

