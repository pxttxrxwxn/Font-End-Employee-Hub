import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat, Prompt } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Employee Hub",
  description: "HR Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${montserrat.variable}
          ${prompt.variable}
          font-prompt
          antialiased
          bg-gray-100
        `}
      >
        

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-10 bg-white">
            {children}
          </main>
        
      </body>
    </html>
  )
}
