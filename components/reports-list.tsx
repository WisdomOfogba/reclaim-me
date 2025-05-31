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
import { ReportObj } from "@/lib/types";
import { getPriorityColor, getStatusColor, reports } from "@/lib/utils";


export function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<ReportObj | null>(null);


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

      <Card className="bg-slate-50 dark:bg-slate-950">
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
          <Card key={report.id} className="hover:shadow-md transition-shadow bg-slate-50 dark:bg-slate-950">
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
                        <Card className="bg-slate-50 dark:bg-slate-950">
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
                        <Card className="bg-slate-50 dark:bg-slate-950">
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
                        <Card className="bg-slate-50 dark:bg-slate-950">
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
        <Card className="bg-slate-50 dark:bg-slate-950">
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
