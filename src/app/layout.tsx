import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import { RelayProvider } from "@/relay/RelayProvider"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flamingo Issue Tracker",
  description: "Minimal issue tracker built with Next.js, Relay, and Supabase",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RelayProvider>
          {children}
          <Toaster position="bottom-right" />
        </RelayProvider>
      </body>
    </html>
  )
}
