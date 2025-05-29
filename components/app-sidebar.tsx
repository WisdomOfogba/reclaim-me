"use client"

import { AlertTriangle, FileText, BarChart3, Settings, User, Home, Plus, Search, Shield } from "lucide-react"
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
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Overview",
    url: "#",
    icon: Home,
    id: "overview",
  },
  {
    title: "Submit Report",
    url: "#",
    icon: Plus,
    id: "submit",
  },
  {
    title: "My Reports",
    url: "#",
    icon: FileText,
    id: "reports",
  },
  {
    title: "Search Cases",
    url: "#",
    icon: Search,
    id: "search",
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
    id: "profile",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    id: "settings",
  },
]

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
            <Shield className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">ReclaimMe</span>
            <span className="truncate text-xs text-muted-foreground">Victim Support Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => setActiveSection(item.id)} isActive={activeSection === item.id}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <div className="rounded-lg bg-red-50 p-3 text-sm">
            <div className="flex items-center gap-2 font-medium text-red-800">
              <AlertTriangle className="h-4 w-4" />
              Emergency?
            </div>
            <p className="text-red-700 mt-1">Call 911 for immediate assistance</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
