"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Upload } from "lucide-react"

export function ReportForm() {
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    dateOccurred: "",
    location: "",
    suspectInfo: "",
    evidence: "",
    contactPreference: "",
    anonymous: false,
  })

  const incidentTypes = [
    "Financial Fraud",
    "Identity Theft",
    "Online Scam",
    "Investment Fraud",
    "Credit Card Fraud",
    "Wire Fraud",
    "Phishing",
    "Romance Scam",
    "Employment Scam",
    "Other",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Submit a Report</h2>
        <p className="text-muted-foreground">Report illegal or fraudulent activities to government officials</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Important Notice</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This form is for reporting non-emergency incidents. If you are in immediate danger, please call 911. All
              reports are securely transmitted to appropriate government agencies.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>Please provide as much detail as possible about the incident</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="incident-type">Type of Incident *</Label>
                <Select
                  value={formData.incidentType}
                  onValueChange={(value) => setFormData({ ...formData, incidentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-occurred">Date Occurred *</Label>
                <Input
                  id="date-occurred"
                  type="date"
                  value={formData.dateOccurred}
                  onChange={(e) => setFormData({ ...formData, dateOccurred: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Incident *</Label>
              <Textarea
                id="description"
                placeholder="Please describe what happened in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Where did this incident occur?"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suspect-info">Suspect Information</Label>
              <Textarea
                id="suspect-info"
                placeholder="Any information about the perpetrator(s)..."
                value={formData.suspectInfo}
                onChange={(e) => setFormData({ ...formData, suspectInfo: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence/Documentation</Label>
              <Textarea
                id="evidence"
                placeholder="List any evidence you have (screenshots, emails, documents, etc.)..."
                value={formData.evidence}
                onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
              />
              <Button type="button" variant="outline" className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-preference">Preferred Contact Method</Label>
              <Select
                value={formData.contactPreference}
                onValueChange={(value) => setFormData({ ...formData, contactPreference: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How should we contact you?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="mail">Mail</SelectItem>
                  <SelectItem value="none">No contact needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={formData.anonymous}
                onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked as boolean })}
              />
              <Label htmlFor="anonymous" className="text-sm">
                Submit this report anonymously
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Submit Report
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
