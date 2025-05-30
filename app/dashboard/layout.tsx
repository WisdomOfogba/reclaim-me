// "use client"

import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import { DashboardView } from "@/components/dasboard-view"

export const metadata: Metadata = {
  title: "ReclaimMe - Victim Support Portal",
  description: "Report illegal or fraudulent activities to government officials",
    generator: 'v0.dev'
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <DashboardView>
      {children}
     </DashboardView>
    
  )
}
