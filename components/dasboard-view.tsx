"use client";

import { AlertTriangle } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";

export function DashboardView({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    // <ThemeProvider defaultTheme="dark" storageKey="reclaimme-theme">
    <SidebarProvider>
      <AppSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/logo.png"
                alt="Reclaimme Logo"
                width={100}
                height={50}
                className="dark:hidden"
              />
              <Image
                src="/assets/logo-white.png"
                alt="Reclaimme Logo"
                width={100}
                height={50}
                className="dark:flex hidden"
              />
            </Link>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
    // </ThemeProvider>
  );
}
