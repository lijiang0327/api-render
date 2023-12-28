import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import ReactQueryProvider from './_provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Api-Render',
  description: 'Render Beer API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
