"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

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

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    setActiveSection("overview");
  }, []);

  return (
    activeSection === "overview" && (
      <>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-grad-back">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 vmain:grid-cols-7">
          <Card className="col-span-4 bg-grad-back">
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
                      <Badge className={getPriorityColor(report.priority)}>
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

          <Card className="col-span-4 vmain:col-span-3 bg-grad-back w-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/dashboard/reports/new"
                className="w-full block justify-start"
              >
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit New Report
                </Button>
              </Link>
              <Link
                href="/dashboard/reports"
                className="w-full block justify-start"
              >
                <Button className="w-full" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Check Report Status
                </Button>
              </Link>

              <Link
                href="/dashboard/analytics"
                className="w-full block justify-start"
              >
                <Button className="w-full" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
              <Link
                href="/contact-support"
                className="w-full block justify-start"
              >
                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    )
  );
}
