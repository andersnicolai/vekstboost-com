import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import EdgePerformanceOptimizer from '@/components/vekst/EdgePerformanceOptimizer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'VekstBoost',
  description: 'VekstBoost - Din partner for digital vekst',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" className={inter.variable}>
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.wixstatic.com" />
        <link rel="preconnect" href="https://frog.wix.com" />
        
        {/* DNS prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/images/logo/onedev-logo.png" as="image" />
      </head>
      <body className={inter.className}>
        <EdgePerformanceOptimizer />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
} 