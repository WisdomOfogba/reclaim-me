import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ReclaimMe - Victim Support Portal",
    template: "%s | ReclaimMe",
  },
  description: "Report illegal or fraudulent activities to government officials",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className=" font-[family-name:var(--font-roboto)]">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
