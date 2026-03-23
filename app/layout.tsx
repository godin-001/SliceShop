import type { Metadata } from "next"
import "./globals.css"
import { Web3Provider } from "@/components/Web3Provider"
import NavBar from "@/components/ui/NavBar"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "SliceShop — Open a store. Get paid onchain.",
  description: "Create an onchain store with an ENS name, accept stablecoin payments via Celo, and process orders autonomously using Slice commerce infrastructure.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#ededed]">
        <Web3Provider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  )
}
