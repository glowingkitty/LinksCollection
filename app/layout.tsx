import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Links Collection',
  description: 'A beautiful Linktree-like page to showcase your links',
  keywords: 'links, social media, portfolio, bio link',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Links Collection',
    description: 'A beautiful Linktree-like page to showcase your links',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links Collection',
    description: 'A beautiful Linktree-like page to showcase your links',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
