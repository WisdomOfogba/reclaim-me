// "use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
// import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AlertTriangle, Badge, FileText, Link, Clock, TrendingUp, Users } from "lucide-react"
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { DashboardView } from "@/components/dasboard-view"

const inter = Inter({ subsets: ["latin"] })

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
    // <html lang="en" suppressHydrationWarning>
    //   <body className={inter.className}>
    //     {children}
    //   </body>
    // </html>
     <DashboardView>
      {children}
     </DashboardView>
    
  )
}
