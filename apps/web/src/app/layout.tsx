import type { ReactNode } from 'react'

import { createMetadata, getSiteUrl } from '@/lib/seo'

import { displayFont, readingFont } from './fonts'
import './global.css'

export const metadata = createMetadata(getSiteUrl())

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={`${displayFont.variable} ${readingFont.variable}`} lang="pt-BR">
      <body className="bg-ink font-reading text-starlight antialiased">{children}</body>
    </html>
  )
}
