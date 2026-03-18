import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

// Set to false when ready to launch the full site
export const COMING_SOON = true

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Solitude of Mechanics',
  description: 'A love letter to watchmaking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {!COMING_SOON && <Navigation />}
        {children}
        {!COMING_SOON && <Footer />}
      </body>
    </html>
  )
}
