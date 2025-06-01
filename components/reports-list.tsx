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
  // DialogClose,
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
  FileText,
} from "lucide-react";
import { ComplaintObj } from "@/lib/types";
import { getPriorityColor, getStatusColor, complaints } from "@/lib/utils";
// import { useIsMobile } from "@/lib/hooks/use-mobile";


export function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] =
    useState<ComplaintObj | null>(null);

  useEffect(() => {
    console.log("Selected :", selectedComplaint);
  }, [selectedComplaint]);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h2 className="text-2xl xs:text-3xl font-bold tracking-tight">
            My Complaints
          </h2>
          <p className="text-muted-foreground">
            Track the status of your submitted complaints
          </p>
        </div>
        <Button
          title="Export Complaints"
          aria-label="Export Complaints"
          className="text-sm xsm:text-base"
        >
          <Download className="xsm:mr-1 w-4 h-4" />
          <span className="hidden xsm:inline">Export Complaints</span>
        </Button>
      </div>

      <Card className="bg-slate-50 dark:bg-slate-950">
        <CardHeader>
          <CardTitle>Filter Complaints</CardTitle>
          <CardDescription>Search and filter your complaints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col fourf:flex-row gap-4">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full max-w-[220px] ml-auto">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">
                  All Statuses
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Under Review">
                  Under Review
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Investigating">
                  Investigating
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Resolved">
                  Resolved
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Closed">
                  Closed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <Card
            key={complaint.id}
            className="hover:shadow-md transition-shadow bg-slate-50 dark:bg-slate-950"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{complaint.id}</CardTitle>
                  <CardDescription className="hidden fiveh:flex items-center gap-4 mt-1">
                    <span>{complaint.type}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {complaint.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {complaint.location}
                    </span>
                  </CardDescription>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <Badge className={getPriorityColor(complaint.priority)}>
                    {complaint.priority}
                  </Badge>
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {complaint.description}
              </p>
              <div className="flex flex-col fourf:flex-row items-center justify-between gap-5 fourf:gap-0">
                <div className="flex fourf:flex-col gap-x-5 gap-y-2.5 justify-center fourf:items-start items-center text-sm flex-wrap">
                  <p className="flex items-center gap-1 w-fit font-bold text-gray-700 dark:text-white">
                    {/* <User className="h-3 w-3" /> */}
                    {complaint.assignedAgent}
                  </p>
                  <p>
                    <span className="font-bold text-gray-700 dark:text-white">
                      Last Update:
                    </span>{" "}
                    {complaint.lastUpdate}
                  </p>
                  {/* {complaint.amount && (
                    <p className="text-gray-950 dark:text-gray-50">
                      <span className="font-bold text-gray-950 dark:text-gray-50">
                        Amount:
                      </span>{" "}
                      {complaint.amount}
                    </p>
                  )} */}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-50 dark:bg-slate-950">
                    <DialogHeader className="mt-10 bg-slate-50 dark:bg-slate-950">
                      <DialogTitle className="flex items-center justify-between">
                        <span className="max-w-[350px] truncate">
                          Complaint Details - {complaint.id}
                        </span>
                        <div className="hidden xsm:flex gap-2">
                          <Badge
                            className={getPriorityColor(complaint.priority)}
                          >
                            {complaint.priority}
                          </Badge>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status}
                          </Badge>
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        {complaint.type} - {complaint.date}
                      </DialogDescription>
                    </DialogHeader>

                    <Tabs
                      defaultValue="overview"
                      className="w-full overflow-auto"
                    >
                      <TabsList className="grid w-full grid-cols-4 gap-1 bg-gray-800 min-w-[400px]">
                        <TabsTrigger
                          value="overview"
                          className="text-xs sm:text-sm text-gray-50 dark:hover:bg-gray-200 dark:hover:text-black data-[state=active]:bg-gray-200 data-[state=active]:text-black"
                        >
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="timeline"
                          className="text-xs sm:text-sm text-gray-50 dark:hover:bg-gray-200 dark:hover:text-black data-[state=active]:bg-gray-200 data-[state=active]:text-black"
                        >
                          Timeline
                        </TabsTrigger>
                        <TabsTrigger
                          value="evidence"
                          className="text-xs sm:text-sm text-gray-50 dark:hover:bg-gray-200 dark:hover:text-black data-[state=active]:bg-gray-200 data-[state=active]:text-black"
                        >
                          Evidence
                        </TabsTrigger>
                        <TabsTrigger
                          value="communication"
                          className="text-xs sm:text-sm text-gray-50 dark:hover:bg-gray-200 dark:hover:text-black data-[state=active]:bg-gray-200 data-[state=active]:text-black"
                        >
                          Communication
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <Card className="bg-slate-50 dark:bg-slate-950">
                          <CardHeader>
                            <CardTitle>Incident Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Complaint ID
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {complaint.id}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Type
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {complaint.type}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Date Occurred
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {complaint.date}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Location
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {complaint.location}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Amount Involved
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {complaint.amount}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Assigned Agent
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {complaint.assignedAgent}
                                </p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {complaint.description}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Investigation Notes
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {complaint.notes}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="timeline" className="space-y-4">
                        <Card className="bg-slate-50 dark:bg-slate-950">
                          <CardHeader>
                            <CardTitle>Case Timeline</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {complaint.timeline.map((event, index) => (
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
                        <Card className="bg-slate-50 dark:bg-slate-950">
                          <CardHeader>
                            <CardTitle>Evidence & Documentation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {complaint.evidence.map((item, index) => (
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
                        <Card className="bg-slate-50 dark:bg-slate-950">
                          <CardHeader>
                            <CardTitle>Communication Log</CardTitle>
                          </CardHeader>
                          <CardContent className="">
                            <div className="space-y-4 ">
                              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-black dark:text-white">
                                <div className="flex items-center gap-2 mb-2 ">
                                  <MessageSquare className="h-4 w-4 " />
                                  <span className="text-sm font-medium">
                                    {complaint.assignedAgent}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {complaint.lastUpdate}
                                  </span>
                                </div>
                                <p className="text-sm">
                                  Thank you for your complaint. We have begun
                                  our investigation and will keep you updated on
                                  our progress.
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

      {filteredComplaints.length === 0 && (
        <Card className="bg-slate-50 dark:bg-slate-950">
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No complaints found matching your criteria.
            </p>
            <Button className="mt-4" variant="outline">
              File Your First Complaint
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
