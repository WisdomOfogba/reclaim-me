"use client";

import { AlertTriangle } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 slate-50 dark:bg-slate-950">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h1 className="xs:text-xl font-semibold">ReclaimMe Dashboard</h1>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 space-y-4 md:p-4 pt-6 slate-50 dark:bg-slate-950">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
    // </ThemeProvider>
  );
}
