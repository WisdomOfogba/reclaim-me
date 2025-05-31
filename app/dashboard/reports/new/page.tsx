"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, FileText, Mail, CheckCircle, ArrowRight } from "lucide-react"

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  scamType: string
  dateTime: string
  description: string
  amount: string
  currency: string
  paymentMethod: string
  beneficiary: {
    name: string
    bank: string
    account: string
  }
}

interface GeneratedDocuments {
  policeReport: string
  bankComplaint: string
  nextSteps: string[]
}

export default function ReclaimMePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    scamType: "",
    dateTime: "",
    description: "",
    amount: "",
    currency: "NGN",
    paymentMethod: "",
    beneficiary: {
      name: "",
      bank: "",
      account: "",
    },
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocuments | null>(null)

  const updateFormData = (field: string, value: string) => {
    if (field.startsWith("beneficiary.")) {
      const beneficiaryField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        beneficiary: {
          ...prev.beneficiary,
          [beneficiaryField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return formData.name && formData.phone && formData.email && formData.address
      case 1:
        return formData.scamType && formData.dateTime && formData.description
      case 2:
        return formData.amount && formData.paymentMethod
      case 3:
        return formData.beneficiary.name && formData.beneficiary.bank && formData.beneficiary.account
      default:
        return false
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      const mockDocs: GeneratedDocuments = {
        policeReport: `POLICE INCIDENT REPORT DRAFT

Personal Information:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}

Incident Details:
Type of Scam: ${formData.scamType}
Date & Time: ${formData.dateTime}
Amount Lost: ${formData.currency} ${Number(formData.amount).toLocaleString()}
Payment Method: ${formData.paymentMethod}

Description of Incident:
${formData.description}

Suspected Fraudster Details:
Name: ${formData.beneficiary.name}
Bank: ${formData.beneficiary.bank}
Account Number: ${formData.beneficiary.account}

I hereby report this incident and request investigation into this matter.

Signature: _________________
Date: ${new Date().toLocaleDateString()}`,

        bankComplaint: `Subject: Fraudulent Transaction Report - Account Holder: ${formData.name}

Dear Sir/Madam,

I am writing to formally report a fraudulent transaction from my account. Below are the details:

Account Holder: ${formData.name}
Contact: ${formData.phone}
Email: ${formData.email}

Transaction Details:
- Amount: ${formData.currency} ${Number(formData.amount).toLocaleString()}
- Date: ${formData.dateTime}
- Payment Method: ${formData.paymentMethod}
- Beneficiary: ${formData.beneficiary.name}
- Beneficiary Bank: ${formData.beneficiary.bank}
- Beneficiary Account: ${formData.beneficiary.account}

Description:
${formData.description}

I request immediate investigation and reversal of this fraudulent transaction. I have also filed a police report regarding this matter.

Please contact me at your earliest convenience.

Regards,
${formData.name}`,

        nextSteps: [
          "Print and submit the police report to your nearest police station",
          "Send the bank complaint email to your bank's fraud department",
          "Keep all evidence (screenshots, messages, receipts) safe",
          "Monitor your accounts for any additional unauthorized transactions",
          "Consider placing a fraud alert on your credit reports",
          "Report the scam to relevant authorities (EFCC, CBN, etc.)",
        ],
      }

      setGeneratedDocs(mockDocs)
      setIsGenerating(false)
    }, 2000)
  }

  if (generatedDocs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Documents Generated Successfully</h1>
            </div>
            <p className="text-gray-600">
              Your professional documents are ready. Follow the next steps to take action.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Police Report Draft
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  {generatedDocs.policeReport}
                </pre>
                <Button className="w-full mt-4">Download PDF</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Bank Complaint Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  {generatedDocs.bankComplaint}
                </pre>
                <Button className="w-full mt-4">Copy to Clipboard</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps Checklist</CardTitle>
              <CardDescription>Follow these steps to maximize your chances of recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedDocs.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => {
                setGeneratedDocs(null)
                setCurrentStep(0)
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  scamType: "",
                  dateTime: "",
                  description: "",
                  amount: "",
                  currency: "NGN",
                  paymentMethod: "",
                  beneficiary: {
                    name: "",
                    bank: "",
                    account: "",
                  },
                })
              }}
            >
              Help Another Victim
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">ReclaimMe</h1>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Professional Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Ready-to-Send Emails</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Step-by-Step Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tell Us What Happened</CardTitle>
            <CardDescription>
              We'll guide you through this step by step. Your information is secure and will only be used to generate
              your documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+234801234567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Your full address"
                  rows={2}
                />
              </div>
            </div>

            {/* Step 2: Incident Details */}
            {isStepComplete(0) && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-gray-900">Incident Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="scamType">Type of Scam</Label>
                    <Select value={formData.scamType} onValueChange={(value) => updateFormData("scamType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scam type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online-shopping">Online Shopping Fraud</SelectItem>
                        <SelectItem value="romance">Romance Scam</SelectItem>
                        <SelectItem value="investment">Investment Fraud</SelectItem>
                        <SelectItem value="phishing">Phishing/Email Scam</SelectItem>
                        <SelectItem value="social-media">Social Media Scam</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateTime">Date & Time of Incident</Label>
                    <Input
                      id="dateTime"
                      value={formData.dateTime}
                      onChange={(e) => updateFormData("dateTime", e.target.value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">What Happened?</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder="Describe what happened in detail. Include how you were contacted, what you were promised, and how the scam unfolded..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {isStepComplete(1) && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount Lost</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => updateFormData("amount", e.target.value)}
                      placeholder="50000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">NGN (Naira)</SelectItem>
                        <SelectItem value="USD">USD (Dollar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                        <SelectItem value="GBP">GBP (Pound)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Input
                      id="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={(e) => updateFormData("paymentMethod", e.target.value)}
                      placeholder="Bank Transfer, Card, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Beneficiary Information */}
            {isStepComplete(2) && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-gray-900">Scammer/Beneficiary Details</h3>
                <p className="text-sm text-gray-600">Any information you have about who received your money</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
                    <Input
                      id="beneficiaryName"
                      value={formData.beneficiary.name}
                      onChange={(e) => updateFormData("beneficiary.name", e.target.value)}
                      placeholder="Name on the account"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beneficiaryBank">Bank Name</Label>
                    <Input
                      id="beneficiaryBank"
                      value={formData.beneficiary.bank}
                      onChange={(e) => updateFormData("beneficiary.bank", e.target.value)}
                      placeholder="Bank name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beneficiaryAccount">Account Number</Label>
                  <Input
                    id="beneficiaryAccount"
                    value={formData.beneficiary.account}
                    onChange={(e) => updateFormData("beneficiary.account", e.target.value)}
                    placeholder="Account number"
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            {isStepComplete(3) && (
              <div className="pt-6 animate-in slide-in-from-bottom-4">
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full h-12 text-lg">
                  {isGenerating ? (
                    "Generating Your Documents..."
                  ) : (
                    <>
                      Generate My Documents
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  This will generate your police report, bank complaint, and action plan
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
