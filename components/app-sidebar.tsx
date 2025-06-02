"use client";

import { AlertTriangle, FileText, Settings, Home, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    title: "Overview",
    url: "#",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "File Complaint",
    url: "#",
    icon: Plus,
    href: "/dashboard/reports/new",
  },
  {
    title: "My Complaints",
    url: "#",
    icon: FileText,
    href: "/dashboard/reports",
  },
  // {
  //   title: "Analytics",
  //   url: "#",
  //   icon: BarChart3,
  //   href: "/dashboard/analytics"
  // },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function AppSidebar({
  activeSection,
  setActiveSection,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-2 px-2 py-2">
          <Link
            href="/"
            className="grid flex-1 text-left text-sm leading-tight no-underline"
          >
            <Image
              src="/assets/Logo.png"
              alt="ReclaimMe Logo"
              width={120}
              height={50}
              className="dark:hidden w-[120px] h-[50px]"
            />
            <Image
              src="/assets/Logo-white.png"
              alt="ReclaimMe Logo"
              width={120}
              height={50}
              className="hidden dark:block w-[120px] h-[50px]"
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-50 dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.href} className="w-full block justify-start">
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.href)}
                      isActive={activeSection === item.href}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-slate-50 dark:bg-slate-950">
        <div className="rounded-lg p-2 bg-slate-700 dark:bg-red-50 text-gray-200">
          <div className="p-3 text-sm">
            <div className="flex items-center gap-2 font-medium text-white dark:text-red-800">
              <AlertTriangle className="h-4 w-4" />
              Emergency?
            </div>
            <p className="dark:text-red-700 mt-1">
              Call 911 for immediate assistance
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
