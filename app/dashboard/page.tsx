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
  // TrendingUp,
  AlertCircle,
  Download,
  Calendar,
  // MapPin, // MapPin was used for a 'location' field not in current schema
} from "lucide-react";
import Link from "next/link";

// Interface for the data expected from the /api/dashboard-stats
interface DashboardApiStats {
  totalReports: number;
  underInvestigation: number;
  resolvedCases: number;
  totalUsers: number;
}

// Interface for individual stat item displayed on the dashboard
interface DisplayStat {
  title: string;
  value: string;
  change: string; // This will remain static as API doesn't provide historical change
  icon: React.ElementType;
  color: string;
}

// Interface for individual recent report item (matching complaint schema)
interface RecentReportDisplay {
  id: number; // Assuming id is a number from DB
  formattedId: string; // For display like RPT-2024-001
  scamType: string | null;
  status: string | null;
  incidentDate: string | null; // ISO string or formatted date string
  // priority: string | null; // 'priority' is not in the current 'complaints' schema
  // For now, we'll omit priority or use a default/derived value if needed
}

// Initial static structure for stats - values will be updated from API
const initialDisplayStats: DisplayStat[] = [
  {
    title: "Total Reports",
    value: "0",
    change: "+0%",
    icon: FileText,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Under Investigation",
    value: "0",
    change: "+0%",
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Resolved Cases",
    value: "0",
    change: "+0%",
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Active Users",
    value: "0",
    change: "+0%",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400",
  },
];

// Helper functions for badge colors (can be moved to utils if shared)
const getStatusColor = (status: string | null) => {
  switch (status) {
    case "Under Review":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "Investigating":
    case "Pending AI Generation":
    case "AI Processing Failed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100";
    case "Resolved":
    case "Closed":
      return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

// Priority is not in schema, so this is a placeholder if you add it later
// const getPriorityColor = (priority: string | null) => {
//   switch (priority) {
//     case "High":
//       return "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
//     case "Medium":
//       return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
//     case "Low":
//       return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
//     default:
//       return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
//   }
// };

export default function Dashboard() {
  const [dashboardDisplayStats, setDashboardDisplayStats] =
    useState<DisplayStat[]>(initialDisplayStats);
  const [recentReportsDisplay, setRecentReportsDisplay] = useState<
    RecentReportDisplay[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    setActiveSection("overview");

    async function fetchDashboardData() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch aggregate stats
        const statsResponse = await fetch("/api/dashboard-stats");
        if (!statsResponse.ok) {
          const errorData = await statsResponse
            .json()
            .catch(() => ({ message: "Failed to fetch dashboard statistics" }));
          throw new Error(
            errorData.message || `HTTP error! status: ${statsResponse.status}`
          );
        }
        const statsData: DashboardApiStats = await statsResponse.json();

        setDashboardDisplayStats((prevStats) =>
          prevStats.map((stat) => {
            switch (stat.title) {
              case "Total Reports":
                return {
                  ...stat,
                  value: statsData.totalReports?.toString() || "0",
                };
              case "Under Investigation":
                return {
                  ...stat,
                  value: statsData.underInvestigation?.toString() || "0",
                };
              case "Resolved Cases":
                return {
                  ...stat,
                  value: statsData.resolvedCases?.toString() || "0",
                };
              case "Active Users":
                return {
                  ...stat,
                  value: statsData.totalUsers?.toString() || "0",
                };
              default:
                return stat;
            }
          })
        );

        // Fetch recent reports (e.g., latest 4)
        const recentReportsResponse = await fetch(
          "/api/reports?page=1&limit=4"
        ); // Using existing endpoint
        if (!recentReportsResponse.ok) {
          const errorData = await recentReportsResponse
            .json()
            .catch(() => ({ message: "Failed to fetch recent reports" }));
          throw new Error(
            errorData.message ||
              `HTTP error! status: ${recentReportsResponse.status}`
          );
        }
        const recentReportsData = await recentReportsResponse.json();

        const formattedRecentReports = recentReportsData.data.map(
          (report: any) => ({
            id: report.id,
            formattedId: `RPT-${new Date(report.incidentDate || report.createdAt).getFullYear()}-${report.id.toString().padStart(3, "0")}`,
            scamType: report.scamType,
            status: report.status,
            incidentDate: report.incidentDate
              ? new Date(report.incidentDate).toLocaleDateString()
              : report.createdAt
                ? new Date(report.createdAt).toLocaleDateString()
                : "N/A",
            // priority: report.priority || "Normal", // Add if priority field exists in schema
          })
        );
        setRecentReportsDisplay(formattedRecentReports);
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
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-500 dark:text-gray-400 animate-spin mx-auto mb-4" />
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
        <Card className="w-full max-w-md bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700 dark:text-red-300">
              <AlertCircle className="mr-2 h-6 w-6" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-400">{error}</p>
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
    activeSection === "overview" && (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Overview
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
            >
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardDisplayStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow"
            >
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
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  <span
                    className={
                      stat.change.startsWith("+")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {stat.change}
                  </span>
                  {/* "from last month" is static, consider removing or making dynamic */}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="lg:col-span-4 bg-white dark:bg-slate-800/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Recent Reports
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Latest incident reports submitted to the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentReportsDisplay.length > 0 ? (
                <div className="space-y-4">
                  {recentReportsDisplay.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border dark:border-slate-700/50 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="space-y-1 mb-2 sm:mb-0">
                        <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                          {report.formattedId}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {report.scamType || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1.5" />
                          {report.incidentDate || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Priority Badge - Add back if 'priority' field is added to schema and API */}
                        {/* <Badge className={`${getPriorityColor(report.priority)} px-2 py-1 text-xs`}>
                          {report.priority}
                        </Badge> */}
                        <Badge
                          className={`${getStatusColor(report.status)} px-2 py-1 text-xs`}
                        >
                          {report.status || "N/A"}
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

          <Card className="lg:col-span-3 bg-white dark:bg-slate-800/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex flex-col">
              <Link href="/dashboard/reports/new" passHref={true}>
                <Button
                  asChild
                  className="w-full justify-start dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
                  variant="outline"
                >
                  <a>
                    <FileText className="mr-2 h-4 w-4" /> Submit New Report
                  </a>
                </Button>
              </Link>
              <Link href="/dashboard/reports" passHref={true}>
                <Button
                  asChild
                  className="w-full justify-start dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
                  variant="outline"
                >
                  <a>
                    <Clock className="mr-2 h-4 w-4" /> Check Report Status
                  </a>
                </Button>
              </Link>
              {/* <Link href="/dashboard/analytics" passHref={true}>
                <Button
                  asChild
                  className="w-full justify-start dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
                  variant="outline"
                >
                  <a>
                    <TrendingUp className="mr-2 h-4 w-4" /> View Analytics
                  </a>
                </Button>
              </Link> */}
              <Link href="/contact" passHref={true}>
                <Button
                  asChild
                  className="w-full justify-start dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
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
