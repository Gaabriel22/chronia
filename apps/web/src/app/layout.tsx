import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './global.css'

export const metadata: Metadata = {
  title: 'Chronia — Uma história visual do tempo',
  description: 'Do Big Bang à formação da Terra em uma narrativa temporal interativa.',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
