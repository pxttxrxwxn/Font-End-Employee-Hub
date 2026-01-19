// src/app/layout.tsx
import './globals.css'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employee Hub',
  description: 'HR Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>



      <body className="flex h-screen overflow-hidden bg-gray-500">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
