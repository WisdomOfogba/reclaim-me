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
  Calendar,
  // MapPin, // Not in current schema
  FileText,
  AlertCircle,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { downloadPDF } from "@/lib/utils";
// import { ComplaintObj } from "@/lib/types"; // We'll define ComplaintDisplay based on schema
// import { getPriorityColor, getStatusColor, complaints as staticComplaints } from "@/lib/utils"; // Will use fetched data

// Interface for a single complaint object fetched from the API
// This should align with your Drizzle schema for 'complaints'
interface ComplaintDisplay {
  id: number;
  formattedId: string;
  name: string; // Victim's name
  phone: string;
  email: string;
  address: string;
  scamType: string | null;
  incidentDate: string; // ISO string from DB, will be formatted for display
  description: string;
  amountLost: number | null;
  currency: string | null;
  paymentMethod: string | null;
  scammerInfo: {
    name?: string | null;
    bank?: string | null;
    account?: string | null;
  } | null;
  aiConsolingMessage: string | null;
  aiPoliceReportDraft: string | null;
  aiBankComplaintEmail: string | null;
  aiNextStepsChecklist: string | null; // Joined string from DB
  status: string;
  // userId: number | null; // If you want to display user info
  createdAt: string; // ISO string from DB
  updatedAt: string; // ISO string from DB

  pdfLink: string | null;
  // Fields from your static data that are not in the current schema
  // We'll handle these gracefully or you can add them to your schema
  // location?: string | null; // Example: could be derived from address
  // assignedAgent?: string | null; // Needs new schema field
  // priority?: string | null; // Needs new schema field
  // notes?: string | null; // Needs new schema field
  // timeline?: { action: string; date: string; status: string }[]; // Needs new schema field or related table
  // evidence?: string[]; // Needs new schema field or related table
}

// Helper functions for badge colors (can be moved to utils if shared)
const getStatusColor = (status: string | null) => {
  switch (status) {
    case "Under Review":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "Investigating":
    case "Pending AI Generation":
      return "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100";
    case "AI Processing Failed":
      return "bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100";
    case "Resolved":
    case "Closed":
      return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

// Priority is not in schema, so this is a placeholder if you add it later
/* const getPriorityColor = (priority: string | null) => {
  // Assuming 'priority' might be added
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
} */

export default function ReportsList() {
  // Changed component name to PascalCase
  const [allComplaints, setAllComplaints] = useState<ComplaintDisplay[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] =
    useState<ComplaintDisplay | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (content?: string) => {
    try {
      if (!content) {
        alert("No content to copy.");
        return;
      }

      navigator.clipboard.writeText(content).then(() => setCopied(true));
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = () => {
    alert("download button clicked!");
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchComplaints() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/reports?page=${currentPage}&limit=${itemsPerPage}`
        );
        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Failed to fetch complaints" }));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        const result = await response.json();
        const formattedComplaints = result.data.map((c: ComplaintDisplay) => ({
          ...c,
          formattedId: `RPT-${new Date(c.incidentDate || c.createdAt).getFullYear()}-${c.id.toString().padStart(3, "0")}`,
          // Ensure dates are consistently formatted for display
          incidentDate: c.incidentDate
            ? new Date(c.incidentDate).toLocaleDateString()
            : "N/A",
          createdAt: new Date(c.createdAt).toLocaleString(),
          updatedAt: new Date(c.updatedAt).toLocaleString(),
          // Placeholder for fields not in current schema
          // priority: c.priority || "Normal",
          // location: c.address, // Or a specific location field if you add one
          // assignedAgent: c.assignedAgent || "Not Assigned",
          // notes: c.notes || "No notes yet.",
          // timeline: c.timeline || [],
          // evidence: c.evidence || [],
        }));
        setAllComplaints(formattedComplaints);
        setTotalPages(result.pagination.totalPages || 1);
      } catch (err) {
        // console.error("Error fetching complaints:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching complaints."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchComplaints();
  }, [currentPage]); // Refetch when currentPage changes

  const filteredComplaints = allComplaints.filter((complaint) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      complaint.formattedId.toLowerCase().includes(searchLower) ||
      (complaint.scamType &&
        complaint.scamType.toLowerCase().includes(searchLower)) ||
      (complaint.name && complaint.name.toLowerCase().includes(searchLower)) || // Search by victim's name
      (complaint.email &&
        complaint.email.toLowerCase().includes(searchLower)) || // Search by victim's email
      complaint.description.toLowerCase().includes(searchLower);
    const matchesStatus =
      statusFilter === "all" ||
      (complaint.status && complaint.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-500 dark:text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Reports...
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
              Error Loading Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button onClick={() => setCurrentPage(1)} className="mt-4 w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl xs:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            My Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track the status of your submitted reports.
          </p>
        </div>
        <Button
          title="Export Reports"
          aria-label="Export Reports"
          className="text-sm xsm:text-base dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
          variant="outline"
        >
          <Download className="xsm:mr-1.5 w-4 h-4" />{" "}
          <span className="hidden xsm:inline">Export Reports</span>
        </Button>
      </div>

      <Card className="bg-white dark:bg-slate-800/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Filter Reports
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Search and filter your reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search by ID, type, description, name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[220px] dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:text-gray-200">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Pending AI Generation">
                  Pending AI Generation
                </SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="AI Processing Failed">
                  AI Processing Failed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <Card
              key={complaint.id}
              className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-800/50"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                      {complaint.formattedId}
                    </CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-gray-600 dark:text-gray-400">
                      <span>{complaint.scamType}</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />{" "}
                        {complaint.incidentDate}
                      </span>
                      {/* <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {complaint.address}</span> */}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    {/* Placeholder for Priority Badge if you add it */}
                    {/* <Badge className={getPriorityColor(complaint.priority || "Normal")}>{complaint.priority || "Normal"}</Badge> */}
                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {complaint.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p>
                      Submitted by: {complaint.name || "N/A"} ({complaint.email}
                      )
                    </p>
                    <p>Last Updated: {complaint.updatedAt}</p>
                  </div>
                  <div className="flex gap-x-2.5">
                    <Button
                      variant="outline"
                      // size="sm"
                      className="p-5 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
                      onClick={() => {
                        downloadPDF(complaint.pdfLink, complaint.name!);
                      }}
                    >
                      <Download /> Download PDF
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          // size="sm"
                          className="p-5 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-slate-700"
                          onClick={() => setSelectedComplaint(complaint)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                      </DialogTrigger>
                      {selectedComplaint &&
                        selectedComplaint.id === complaint.id && (
                          <DialogContent className="min-w-[calc(100vw-2rem)] sm:min-w-fit sm:w-4/5 max-w-4xl mx-auto bg-white dark:bg-slate-900 p-0 max-h-[90vh] flex flex-col">
                            <DialogHeader className="p-6 pb-4 border-b dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
                              <DialogTitle className="flex items-center justify-between text-xl text-gray-900 dark:text-gray-100">
                                <span className="truncate max-w-[calc(100%-150px)]">
                                  Report - {selectedComplaint.formattedId}
                                </span>
                                <div className="flex gap-2">
                                  {/* <Badge className={getPriorityColor(selectedComplaint.priority || "Normal")}>{selectedComplaint.priority || "Normal"}</Badge> */}
                                  <Badge
                                    className={getStatusColor(
                                      selectedComplaint.status
                                    )}
                                  >
                                    {selectedComplaint.status}
                                  </Badge>
                                </div>
                              </DialogTitle>
                              <DialogDescription className="text-gray-600 dark:text-gray-400">
                                {selectedComplaint.scamType} - Submitted on{" "}
                                {new Date(
                                  selectedComplaint.createdAt
                                ).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="overflow-y-auto flex-grow p-6">
                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100 h-auto dark:bg-slate-800 p-1 rounded-md mb-4">
                                  {[
                                    "overview",
                                    "victimScammerInfo",
                                    "aiDocuments",
                                    "actions",
                                  ].map((tab) => (
                                    <TabsTrigger
                                      key={tab}
                                      value={tab}
                                      className="p-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 rounded-sm transition-colors"
                                    >
                                      {tab
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) =>
                                          str.toUpperCase()
                                        )}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>

                                <TabsContent
                                  value="overview"
                                  className="space-y-4"
                                >
                                  <Card className="bg-slate-50 dark:bg-slate-800/50">
                                    <CardHeader>
                                      <CardTitle className="text-base dark:text-gray-200">
                                        Incident Details
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        <p>
                                          <strong className="dark:text-gray-300">
                                            Incident Date:
                                          </strong>{" "}
                                          <span className="dark:text-gray-400">
                                            {selectedComplaint.incidentDate}
                                          </span>
                                        </p>
                                        <p>
                                          <strong className="dark:text-gray-300">
                                            Scam Type:
                                          </strong>{" "}
                                          <span className="dark:text-gray-400">
                                            {selectedComplaint.scamType}
                                          </span>
                                        </p>
                                        {selectedComplaint.amountLost && (
                                          <p>
                                            <strong className="dark:text-gray-300">
                                              Amount Lost:
                                            </strong>{" "}
                                            <span className="dark:text-gray-400">
                                              {selectedComplaint.currency}{" "}
                                              {selectedComplaint.amountLost.toLocaleString()}
                                            </span>
                                          </p>
                                        )}
                                        {selectedComplaint.paymentMethod && (
                                          <p>
                                            <strong className="dark:text-gray-300">
                                              Payment Method:
                                            </strong>{" "}
                                            <span className="dark:text-gray-400">
                                              {selectedComplaint.paymentMethod}
                                            </span>
                                          </p>
                                        )}
                                      </div>
                                      <div>
                                        <strong className="dark:text-gray-300">
                                          Description:
                                        </strong>{" "}
                                        <p className="text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-wrap">
                                          {selectedComplaint.description}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                <TabsContent
                                  value="victimScammerInfo"
                                  className="space-y-4"
                                >
                                  <Card className="bg-slate-50 dark:bg-slate-800/50">
                                    <CardHeader>
                                      <CardTitle className="text-base dark:text-gray-200">
                                        Victim Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-1 text-sm">
                                      <p>
                                        <strong className="dark:text-gray-300">
                                          Name:
                                        </strong>{" "}
                                        <span className="dark:text-gray-400">
                                          {selectedComplaint.name}
                                        </span>
                                      </p>
                                      <p>
                                        <strong className="dark:text-gray-300">
                                          Email:
                                        </strong>{" "}
                                        <span className="dark:text-gray-400">
                                          {selectedComplaint.email}
                                        </span>
                                      </p>
                                      <p>
                                        <strong className="dark:text-gray-300">
                                          Phone:
                                        </strong>{" "}
                                        <span className="dark:text-gray-400">
                                          {selectedComplaint.phone}
                                        </span>
                                      </p>
                                      <p>
                                        <strong className="dark:text-gray-300">
                                          Address:
                                        </strong>{" "}
                                        <span className="dark:text-gray-400">
                                          {selectedComplaint.address}
                                        </span>
                                      </p>
                                    </CardContent>
                                  </Card>
                                  {selectedComplaint.scammerInfo &&
                                    (selectedComplaint.scammerInfo.name ||
                                      selectedComplaint.scammerInfo.bank ||
                                      selectedComplaint.scammerInfo
                                        .account) && (
                                      <Card className="bg-slate-50 dark:bg-slate-800/50">
                                        <CardHeader>
                                          <CardTitle className="text-base dark:text-gray-200">
                                            Scammer Information (If Provided)
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-1 text-sm">
                                          {selectedComplaint.scammerInfo
                                            .name && (
                                            <p>
                                              <strong className="dark:text-gray-300">
                                                Name:
                                              </strong>{" "}
                                              <span className="dark:text-gray-400">
                                                {
                                                  selectedComplaint.scammerInfo
                                                    .name
                                                }
                                              </span>
                                            </p>
                                          )}
                                          {selectedComplaint.scammerInfo
                                            .bank && (
                                            <p>
                                              <strong className="dark:text-gray-300">
                                                Bank:
                                              </strong>{" "}
                                              <span className="dark:text-gray-400">
                                                {
                                                  selectedComplaint.scammerInfo
                                                    .bank
                                                }
                                              </span>
                                            </p>
                                          )}
                                          {selectedComplaint.scammerInfo
                                            .account && (
                                            <p>
                                              <strong className="dark:text-gray-300">
                                                Account:
                                              </strong>{" "}
                                              <span className="dark:text-gray-400">
                                                {
                                                  selectedComplaint.scammerInfo
                                                    .account
                                                }
                                              </span>
                                            </p>
                                          )}
                                        </CardContent>
                                      </Card>
                                    )}
                                </TabsContent>

                                <TabsContent
                                  value="aiDocuments"
                                  className="space-y-4"
                                >
                                  {selectedComplaint.aiConsolingMessage && (
                                    <Card className="bg-slate-50 dark:bg-slate-800/50">
                                      <CardHeader>
                                        <CardTitle className="text-base dark:text-gray-200">
                                          AI Consoling Message
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="text-sm dark:text-gray-400 whitespace-pre-wrap">
                                          {selectedComplaint.aiConsolingMessage}
                                        </p>
                                      </CardContent>
                                    </Card>
                                  )}
                                  {selectedComplaint.aiPoliceReportDraft && (
                                    <Card className="bg-slate-50 dark:bg-slate-800/50">
                                      <CardHeader className="flex justify-between items-center flex-row w-full">
                                        <CardTitle className="text-base dark:text-gray-200">
                                          AI Police Report Draft
                                        </CardTitle>
                                        <Button
                                          variant="outline"
                                          onClick={() => handleDownload()}
                                          size="icon"
                                        >
                                          <Download />
                                        </Button>
                                      </CardHeader>
                                      <CardContent>
                                        <pre className="text-sm dark:text-gray-400 whitespace-pre-wrap max-h-60 overflow-y-auto">
                                          {
                                            selectedComplaint.aiPoliceReportDraft
                                          }
                                        </pre>
                                      </CardContent>
                                    </Card>
                                  )}
                                  {selectedComplaint.aiBankComplaintEmail && (
                                    <Card className="bg-slate-50 dark:bg-slate-800/50">
                                      <CardHeader className="flex justify-between items-center flex-row w-full">
                                        <CardTitle className="text-base dark:text-gray-200">
                                          AI Bank Complaint Email
                                        </CardTitle>
                                        {copied ? (
                                          <Button variant="outline" size="icon">
                                            <Check />
                                          </Button>
                                        ) : (
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              handleCopy(
                                                selectedComplaint.aiBankComplaintEmail ??
                                                  undefined
                                              )
                                            }
                                            size="icon"
                                          >
                                            <Copy />
                                          </Button>
                                        )}
                                      </CardHeader>
                                      <CardContent>
                                        <pre className="text-sm dark:text-gray-400 whitespace-pre-wrap max-h-60 overflow-y-auto">
                                          {
                                            selectedComplaint.aiBankComplaintEmail
                                          }
                                        </pre>
                                      </CardContent>
                                    </Card>
                                  )}
                                  {selectedComplaint.aiNextStepsChecklist && (
                                    <Card className="bg-slate-50 dark:bg-slate-800/50">
                                      <CardHeader>
                                        <CardTitle className="text-base dark:text-gray-200">
                                          AI Next Steps Checklist
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <ul className="list-disc pl-5 space-y-1 text-sm dark:text-gray-400">
                                          {selectedComplaint.aiNextStepsChecklist
                                            .split("\n")
                                            .map(
                                              (step, i) =>
                                                step.trim() && (
                                                  <li key={i}>{step}</li>
                                                )
                                            )}
                                        </ul>
                                      </CardContent>
                                    </Card>
                                  )}
                                  {!selectedComplaint.aiConsolingMessage &&
                                    !selectedComplaint.aiPoliceReportDraft && (
                                      <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">
                                        No AI-generated documents available for
                                        this report yet.
                                      </p>
                                    )}
                                </TabsContent>

                                <TabsContent
                                  value="actions"
                                  className="space-y-4"
                                >
                                  <Card className="bg-slate-50 dark:bg-slate-800/50">
                                    <CardHeader>
                                      <CardTitle className="text-base dark:text-gray-200">
                                        Manage Report
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Current Status:{" "}
                                        <Badge
                                          className={getStatusColor(
                                            selectedComplaint.status
                                          )}
                                        >
                                          {selectedComplaint.status}
                                        </Badge>
                                      </div>
                                      {/* Add buttons for Update Status, Add Note, etc. here */}
                                      {/* These would typically trigger other dialogs or forms */}
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full dark:text-gray-300 dark:border-gray-600"
                                      >
                                        Update Status (Admin)
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full dark:text-gray-300 dark:border-gray-600"
                                      >
                                        Add Internal Note (Admin)
                                      </Button>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </DialogContent>
                        )}
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-white dark:bg-slate-800/50">
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No reports found matching your criteria.
              </p>
              <Link href="/dashboard/reports/new" passHref legacyBehavior>
                <Button className="mt-6" variant="default">
                  File Your First Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="dark:text-gray-300 dark:border-gray-600"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="dark:text-gray-300 dark:border-gray-600"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
