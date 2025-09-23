import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Legal notice and contact information',
  robots: 'index, follow',
}

export default function ImprintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


