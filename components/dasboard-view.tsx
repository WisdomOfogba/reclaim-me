"use client";

import {
  AlertTriangle,
} from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";



export function DashboardView({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="reclaimme-theme">
      <SidebarProvider>
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h1 className="text-xl font-semibold">ReclaimMe Dashboard</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {children}
          </main>

          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
