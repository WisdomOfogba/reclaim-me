"use client"

import { AlertTriangle, Badge, FileText, Link, Clock, TrendingUp, Users, CheckCircle } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { AppSidebar } from "./app-sidebar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";
import React, { useState } from "react";

const stats = [
    {
      title: "Total Reports",
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Under Investigation",
      value: "89",
      change: "+5%",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Resolved Cases",
      value: "1,158",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "2,341",
      change: "+15%",
      icon: Users,
      color: "text-purple-600",
    },
  ];

export function DashboardView({children}: {children: React.ReactNode}){
    
const [activeSection, setActiveSection] = useState("overview");
    
    return (

<ThemeProvider defaultTheme="light" storageKey="reclaimme-theme">
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
          </header>

          <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {activeSection === "overview" && (
              <>
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Overview
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button>Download Report</Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-600">{stat.change}</span>{" "}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Reports</CardTitle>
                      <CardDescription>
                        Latest incident reports submitted to the system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentReports.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {report.id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {report.type}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {report.date}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getPriorityColor(report.priority)}
                              >
                                {report.priority}
                              </Badge>
                              <Badge className={getStatusColor(report.status)}>
                                {report.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>
                        Common tasks and shortcuts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                        onClick={() => setActiveSection("submit")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Submit New Report
                      </Button>
                      <Link href="/dashboard/reports">
                        <Button
                          className="w-full justify-start"
                          variant="outline"
                          // onClick={() => setActiveSection("reports")}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Check Report Status
                        </Button>
                      </Link>

                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <TrendingUp className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            

                 <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>

    )
}