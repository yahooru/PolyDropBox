const path = require('path')
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
} catch (_) {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use standalone output for Docker deployments (optional)
  // output: 'standalone',
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_USDC_ADDRESS: process.env.NEXT_PUBLIC_USDC_ADDRESS,
    NEXT_PUBLIC_POLYGON_RPC: process.env.NEXT_PUBLIC_POLYGON_RPC || process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || 'https://polygon-rpc.com',
    NEXT_PUBLIC_POLYGON_AMOY_RPC: process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-rpc.com',
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig

