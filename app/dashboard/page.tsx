"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { ReportsList } from "@/components/reports-list"
// import { UserProfile } from "@/components/user-profile"
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const recentReports = [
    {
      id: "RPT-2024-001",
      type: "Financial Fraud",
      status: "Under Review",
      date: "2024-01-15",
      priority: "High",
    },
    {
      id: "RPT-2024-002",
      type: "Identity Theft",
      status: "Investigating",
      date: "2024-01-14",
      priority: "Medium",
    },
    {
      id: "RPT-2024-003",
      type: "Online Scam",
      status: "Resolved",
      date: "2024-01-13",
      priority: "Low",
    },
    {
      id: "RPT-2024-004",
      type: "Investment Fraud",
      status: "Under Review",
      date: "2024-01-12",
      priority: "High",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Investigating":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            
            {/* {activeSection === "reports" && <ReportsList />}

            {activeSection === "profile" && <UserProfile />}

            {activeSection === "submit" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Submit Report
                  </h2>
                  <p className="text-muted-foreground">
                    This feature will be available soon
                  </p>
                </div>
              </div>
            )}

            {activeSection === "search" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Search Cases
                  </h2>
                  <p className="text-muted-foreground">
                    This feature will be available soon
                  </p>
                </div>
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Analytics
                  </h2>
                  <p className="text-muted-foreground">
                    This feature will be available soon
                  </p>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Settings
                  </h2>
                  <p className="text-muted-foreground">
                    This feature will be available soon
                  </p>
                </div>
              </div>
            )} */}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
