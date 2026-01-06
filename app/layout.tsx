import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Shopz',
  description: 'Created with  Revellio',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/public/svg/favicon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/public/svg/favicon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/public/svg/favicon-light.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/public/svg/favicon-light.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
