import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Footer } from '@/components/Footer'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PolyDropBox - Decentralized File Sharing',
  description: 'Decentralized file sharing with expiry, payments & cross-chain swaps on Polygon. Preview before purchase, multi-file upload, password protection.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

