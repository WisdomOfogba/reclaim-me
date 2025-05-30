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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Search,
  Download,
  MessageSquare,
  Calendar,
  MapPin,
  User,
  FileText,
} from "lucide-react";

export function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<{
    id: string;
    type: string;
    status: string;
    date: string;
    priority: string;
    description: string;
    lastUpdate: string;
    amount: string;
    location: string;
    assignedAgent: string;
    timeline: { date: string; action: string; status: string }[];
    evidence: string[];
    notes: string;
  } | null>(null);

  useEffect(() => {
    console.log("Selected Report:", selectedReport);
  }, [selectedReport]);

  const reports = [
    {
      id: "RPT-2024-001",
      type: "Financial Fraud",
      status: "Under Review",
      date: "2024-01-15",
      priority: "High",
      description: "Unauthorized charges on credit card from unknown merchant",
      lastUpdate: "2024-01-16",
      amount: "$2,450.00",
      location: "Online Transaction",
      assignedAgent: "Agent Sarah Johnson",
      timeline: [
        { date: "2024-01-15", action: "Report submitted", status: "Submitted" },
        {
          date: "2024-01-16",
          action: "Initial review completed",
          status: "Under Review",
        },
        {
          date: "2024-01-16",
          action: "Assigned to investigation team",
          status: "Under Review",
        },
      ],
      evidence: ["Credit card statements", "Email receipts", "Screenshots"],
      notes:
        "Case has been escalated to the financial crimes unit. Investigation is ongoing with the merchant's bank.",
    },
    {
      id: "RPT-2024-002",
      type: "Identity Theft",
      status: "Investigating",
      date: "2024-01-14",
      priority: "Medium",
      description: "Someone opened accounts using my personal information",
      lastUpdate: "2024-01-15",
      amount: "Unknown",
      location: "Multiple locations",
      assignedAgent: "Agent Michael Chen",
      timeline: [
        { date: "2024-01-14", action: "Report submitted", status: "Submitted" },
        {
          date: "2024-01-14",
          action: "Identity verification completed",
          status: "Verified",
        },
        {
          date: "2024-01-15",
          action: "Investigation started",
          status: "Investigating",
        },
      ],
      evidence: ["Driver's license copy", "Credit reports", "Bank statements"],
      notes:
        "Working with credit bureaus to freeze accounts. Suspect information being gathered.",
    },
    {
      id: "RPT-2024-003",
      type: "Online Scam",
      status: "Resolved",
      date: "2024-01-13",
      priority: "Low",
      description: "Fake online store took payment but never delivered goods",
      lastUpdate: "2024-01-14",
      amount: "$89.99",
      location: "www.fakeshop.com",
      assignedAgent: "Agent Lisa Rodriguez",
      timeline: [
        { date: "2024-01-13", action: "Report submitted", status: "Submitted" },
        {
          date: "2024-01-13",
          action: "Website investigated",
          status: "Investigating",
        },
        {
          date: "2024-01-14",
          action: "Merchant contacted",
          status: "Investigating",
        },
        { date: "2024-01-14", action: "Refund processed", status: "Resolved" },
      ],
      evidence: [
        "Payment confirmation",
        "Website screenshots",
        "Email correspondence",
      ],
      notes:
        "Full refund obtained from payment processor. Website has been reported to hosting provider.",
    },
    {
      id: "RPT-2024-004",
      type: "Investment Fraud",
      status: "Under Review",
      date: "2024-01-12",
      priority: "High",
      description: "Ponzi scheme investment platform disappeared with funds",
      lastUpdate: "2024-01-13",
      amount: "$15,000.00",
      location: "InvestSafe Platform",
      assignedAgent: "Agent David Kim",
      timeline: [
        { date: "2024-01-12", action: "Report submitted", status: "Submitted" },
        {
          date: "2024-01-12",
          action: "High priority case flagged",
          status: "Under Review",
        },
        {
          date: "2024-01-13",
          action: "Financial analysis started",
          status: "Under Review",
        },
      ],
      evidence: [
        "Investment contracts",
        "Bank transfers",
        "Platform screenshots",
        "Communication logs",
      ],
      notes:
        "Part of larger investigation into investment fraud ring. Multiple victims identified.",
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
      case "Closed":
        return "bg-gray-100 text-gray-800";
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

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Reports</h2>
          <p className="text-muted-foreground">
            Track the status of your submitted reports
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
          <CardDescription>Search and filter your reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{report.id}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span>{report.type}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.location}
                    </span>
                  </CardDescription>
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
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {report.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {report.assignedAgent}
                  </p>
                  <p>Last Update: {report.lastUpdate}</p>
                  {report.amount && <p>Amount: {report.amount}</p>}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between">
                        <span>Report Details - {report.id}</span>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(report.priority)}>
                            {report.priority}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        {report.type} - {report.date}
                      </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="evidence">Evidence</TabsTrigger>
                        <TabsTrigger value="communication">
                          Communication
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Incident Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Report ID
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {report.id}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Type
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {report.type}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Date Occurred
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {report.date}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Location
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {report.location}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Amount Involved
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {report.amount}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Assigned Agent
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {report.assignedAgent}
                                </p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {report.description}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Investigation Notes
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {report.notes}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="timeline" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Case Timeline</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {report.timeline.map((event, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                                >
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">
                                      {event.action}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {event.date}
                                    </p>
                                    <Badge
                                      className={getStatusColor(event.status)}
                                      variant="outline"
                                    >
                                      {event.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="evidence" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Evidence & Documentation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {report.evidence.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 border rounded"
                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">{item}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-auto"
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="communication" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Communication Log</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {report.assignedAgent}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {report.lastUpdate}
                                  </span>
                                </div>
                                <p className="text-sm">
                                  Thank you for your report. We have begun our
                                  investigation and will keep you updated on our
                                  progress.
                                </p>
                              </div>
                              <Button className="w-full">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Message
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No reports found matching your criteria.
            </p>
            <Button className="mt-4" variant="outline">
              Submit Your First Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
