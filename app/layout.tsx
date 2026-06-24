import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/shop/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ElektroIN — Elektromaterijal Beograd',
    template: '%s | ElektroIN',
  },
  description:
    'Elektromaterijal za profesionalce i domaćinstva. Kablovi, rasveta, razvodne table, automatika, Schneider Electric, Legrand. Brza dostava po Srbiji.',
  keywords: ['elektromaterijal', 'kablovi', 'rasveta', 'razvodne table', 'Schneider', 'Beograd'],
  openGraph: {
    siteName: 'ElektroIN',
    locale: 'sr_RS',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <CartDrawer />
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
