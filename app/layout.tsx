import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UCI CSSA',
  description: '加州大学欧文分校中国学生学者联合会',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}