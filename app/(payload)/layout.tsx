import React from 'react'

export const metadata = {
  title: 'ElektroIN Admin',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  )
}
