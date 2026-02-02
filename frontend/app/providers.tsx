'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'

const polygonRpc = process.env.NEXT_PUBLIC_POLYGON_RPC || process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || 'https://polygon-rpc.com'

const config = createConfig({
  chains: [polygon],
  connectors: [
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [polygon.id]: http(polygonRpc),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
