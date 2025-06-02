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
import {
  FileText,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react"; // Added AlertCircle for errors
import Link from "next/link";

// Interface for the data expected from the API
interface DashboardApiStats {
  totalReports: number;
  underInvestigation: number;
  resolvedCases: number;
  activeUsers: number;
}

// Interface for individual stat item displayed on the dashboard
interface DisplayStat {
  title: string;
  value: string;
  change: string; // This will remain static for now
  icon: React.ElementType;
  color: string;
}

// Interface for individual recent report item
interface RecentReport {
  id: string;
  type: string;
  status: string;
  date: string;
  priority: string;
}

// Initial static structure for stats - values will be updated from API
const initialDisplayStats: DisplayStat[] = [
  {
    title: "Total Reports",
    value: "0",
    change: "+0%", // Static: API doesn't provide this
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Under Investigation",
    value: "0",
    change: "+0%", // Static: API doesn't provide this
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Resolved Cases",
    value: "0",
    change: "+0%", // Static: API doesn't provide this
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Active Users", // Assuming this means users who have submitted complaints
    value: "0",
    change: "+0%", // Static: API doesn't provide this
    icon: Users,
    color: "text-purple-600",
  },
];

// Static recent reports data as provided in your initial code
// To make this dynamic, you'd fetch from an API endpoint like /api/recent-reports
const staticRecentReports: RecentReport[] = [
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
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "Investigating":
      return "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100";
    case "Resolved":
      return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "Low":
      return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

export default function Dashboard() {
  const [dashboardDisplayStats, setDashboardDisplayStats] =
    useState<DisplayStat[]>(initialDisplayStats);
  // For now, recent reports are static. If fetched, you'd use a similar state.
  const [recentReportsDisplay] = useState<RecentReport[]>(staticRecentReports);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview"); // Keeping this from your original code

  useEffect(() => {
    // This effect from your original code, seems fine.
    setActiveSection("overview");

    async function fetchDashboardData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/dashboard-stats"); // Path to your API route
        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Failed to fetch dashboard statistics" }));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        const data: DashboardApiStats = await response.json();

        setDashboardDisplayStats((prevStats) =>
          prevStats.map((stat) => {
            switch (stat.title) {
              case "Total Reports":
                return { ...stat, value: data.totalReports?.toString() || "0" };
              case "Under Investigation":
                return {
                  ...stat,
                  value: data.underInvestigation?.toString() || "0",
                };
              case "Resolved Cases":
                return {
                  ...stat,
                  value: data.resolvedCases?.toString() || "0",
                };
              case "Active Users":
                return { ...stat, value: data.activeUsers?.toString() || "0" };
              default:
                return stat;
            }
          })
        );

        // If you were fetching recent reports:
        // const recentReportsResponse = await fetch('/api/recent-reports');
        // const recentReportsData = await recentReportsResponse.json();
        // setRecentReportsDisplay(recentReportsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching data."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []); // Empty dependency array to run once on mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-500 animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Dashboard Data...
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700 dark:text-red-200">
              <AlertCircle className="mr-2 h-6 w-6" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    // Conditional rendering based on activeSection from your original code
    activeSection === "overview" && (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Overview
          </h2>
          {/* Download Report button - functionality would need to be implemented */}
          <div className="flex items-center space-x-2">
            <Button variant="outline">Download Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardDisplayStats.map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-slate-900 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {/* The 'change' part remains static as API doesn't provide it */}
                  <span
                    className={
                      parseInt(stat.change) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  {/* Consider removing "from last month" if not dynamic */}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="lg:col-span-4 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Recent Reports
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Latest incident reports submitted to the system. (Static Data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentReportsDisplay.length > 0 ? (
                <div className="space-y-4">
                  {recentReportsDisplay.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="space-y-1 mb-2 sm:mb-0">
                        <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                          {report.id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {report.type}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`${getPriorityColor(report.priority)} px-2 py-1 text-xs`}
                        >
                          {report.priority}
                        </Badge>
                        <Badge
                          className={`${getStatusColor(report.status)} px-2 py-1 text-xs`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No recent reports to display.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/reports/new" passHref legacyBehavior>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="outline"
                >
                  <a>
                    <FileText className="mr-2 h-4 w-4" /> Submit New Report
                  </a>
                </Button>
              </Link>
              <Link href="/dashboard/reports" passHref legacyBehavior>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="outline"
                >
                  <a>
                    <Clock className="mr-2 h-4 w-4" /> Check Report Status
                  </a>
                </Button>
              </Link>
              <Link href="/dashboard/analytics" passHref legacyBehavior>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="outline"
                >
                  <a>
                    <TrendingUp className="mr-2 h-4 w-4" /> View Analytics
                  </a>
                </Button>
              </Link>
              <Link href="/contact-support" passHref legacyBehavior>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="outline"
                >
                  <a>
                    <Users className="mr-2 h-4 w-4" /> Contact Support
                  </a>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}
