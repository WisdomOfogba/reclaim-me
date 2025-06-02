"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Mail,
  Edit3,
  AlertTriangle,
  Loader2,
} from "lucide-react";

// Interface for AI-generated documents from FastAPI backend
interface AIDocuments {
  consoling_message: string;
  police_report_draft: string;
  bank_complaint_email: string;
  next_steps_checklist: string; // Raw string from AI
}

// Interface for the documents displayed and potentially edited by the user
interface DisplayDocuments {
  consoling_message: string;
  police_report_draft: string;
  bank_complaint_email: string;
  next_steps_checklist: string[]; // Processed into an array
}

// Interface for the main form data
interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  scamType: string;
  dateTime: string; // ISO string from datetime-local input
  description: string;
  amount: string; // Kept as string for input, parsed on submission
  currency: string;
  paymentMethod: string;
  beneficiary: {
    name: string;
    bank: string;
    account: string;
  };
}

// For saving to DB, based on your Zod schema in /api/reports/route.ts
interface ComplaintPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  scamType: string;
  incidentDate: string; // ISO string
  description: string;
  amountLost?: number | null;
  currency?: string | null;
  paymentMethod?: string | null;
  scammerInfo?: {
    name?: string | null;
    bank?: string | null;
    account?: string | null;
  } | null;
  // AI fields that will be added after AI generation
  aiConsolingMessage?: string | null;
  aiPoliceReportDraft?: string | null;
  aiBankComplaintEmail?: string | null;
  aiNextStepsChecklist?: string | null; // Joined string for DB
  status?:
    | "Under Review"
    | "Investigating"
    | "Resolved"
    | "Closed"
    | "Pending AI Generation"
    | "AI Processing Failed"
    | null;
  // userId?: number | null; // Add if you have user authentication
}

const scamTypes = [
  "Phishing Scam",
  "Romance Scam",
  "Online Marketplace Scam",
  "Investment or Cryptocurrency Scam",
  "Fake Job Offer Scam",
  "Tech Support Scam",
  "Fake Loan or Grant Scam",
  "Social Media Impersonation Scam",
  "Subscription Trap Scam",
  "Fake Charity Scam (Online)",
  "Delivery/Logistics Scam",
  "Fake Online Course or Certification Scam",
  "ATM Card Skimming",
  "Pickpocketing with Distraction",
  "Real Estate/Hostel Scam (Fake Agent)",
  "Fake Police or Official Impersonation",
  "POS Machine Tampering",
  "Lottery or You’ve Won! Scam",
  "Fake Product or Vendor (In-Person)",
  "Bus/Transport Scam (One Chance)",
  "Fake Bank Alert Scam",
  "Donation Scam (In-Person)",
  "Other Unspecified Scam",
];

export default function ReclaimMePage() {
  const initialFormData: FormData = {
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
    beneficiary: { name: "", bank: "", account: "" },
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStage, setCurrentStage] = useState<
    | "form"
    | "generatingAI"
    | "savingReport"
    | "updatingReportWithAI"
    | "displayDocs"
  >("form");
  const [processingMessage, setProcessingMessage] = useState<string>("");

  const [displayDocs, setDisplayDocs] = useState<DisplayDocuments | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [savedReportId, setSavedReportId] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const policeReportRef = useRef<HTMLPreElement>(null);
  const bankComplaintRef = useRef<HTMLPreElement>(null);

  const updateFormData = (field: string, value: string) => {
    setApiError(null);
    if (field.startsWith("beneficiary.")) {
      const beneficiaryField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        beneficiary: { ...prev.beneficiary, [beneficiaryField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(
          formData.name &&
          formData.phone &&
          formData.email &&
          formData.address
        );
      case 1:
        return !!(
          formData.scamType &&
          formData.dateTime &&
          formData.description
        );
      case 2:
        return !!(
          formData.name &&
          formData.phone &&
          formData.email &&
          formData.address &&
          formData.scamType &&
          formData.dateTime &&
          formData.description
        );
      default:
        return false;
    }
  };

  const handleFullGenerationProcess = async () => {
    if (!isStepComplete(2)) {
      setApiError(
        "Please fill in all required fields before generating documents."
      );
      return;
    }
    setApiError(null);
    setDisplayDocs(null);
    setSavedReportId(null);

    // --- Stage 1: Save Initial Report Data ---
    setCurrentStage("savingReport");
    setProcessingMessage("Saving initial report details...");
    const amountValue = parseFloat(formData.amount);
    const initialPayloadToSave: ComplaintPayload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      scamType: formData.scamType,
      incidentDate: formData.dateTime, // Ensure this is an ISO string for your backend
      description: formData.description,
      amountLost: isNaN(amountValue) ? null : amountValue,
      currency: formData.currency || null,
      paymentMethod: formData.paymentMethod || null,
      scammerInfo:
        formData.beneficiary.name ||
        formData.beneficiary.bank ||
        formData.beneficiary.account
          ? {
              name: formData.beneficiary.name || undefined,
              bank: formData.beneficiary.bank || undefined,
              account: formData.beneficiary.account || undefined,
            }
          : null,
      status: "Pending AI Generation",
    };

    let reportId: number | null = null;
    // Removed: let saveData: any; // saveData will be defined within the try block if successful

    try {
      const saveResponse = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialPayloadToSave),
      });

      // **CORRECTED ERROR HANDLING:**
      // Check if the response was successful BEFORE trying to parse JSON
      if (!saveResponse.ok) {
        let errorDetail = `Error ${saveResponse.status}: ${saveResponse.statusText}`;
        try {
          // Attempt to parse the error response as JSON, as your API routes should return JSON errors
          const errorData = await saveResponse.json();
          errorDetail = errorData.details
            ? JSON.stringify(errorData.details)
            : errorData.error || errorDetail;
        } catch (e) {
          // If .json() fails, the response body might be HTML or plain text
          try {
            const textError = await saveResponse.text();
            errorDetail += ` - Server response: ${textError.substring(0, 200)}...`; // Show a snippet
          } catch (textE) {
            /* Ignore if .text() also fails */
          }
        }
        throw new Error(errorDetail); // This will be caught by the outer catch block
      }

      // If saveResponse.ok is true, now it's safer to parse the JSON
      const saveData = await saveResponse.json();
      reportId = saveData.id;

      if (!reportId) {
        throw new Error(
          "Report saved, but no ID was returned from the server."
        );
      }

      setSavedReportId(reportId);
      setProcessingMessage("Initial report saved! Generating AI documents...");
    } catch (err) {
      console.error("Failed to save initial report:", err); // Log the full error object
      setApiError(`Failed to save initial report: ${(err as Error).message}`);
      setCurrentStage("form"); // Revert to form stage on error
      return; // Stop the process
    }

    // If reportId is still null here, it means saving failed and we returned.
    if (!reportId) {
      // This case should ideally be caught above, but as a safeguard:
      setApiError(
        "Critical error: Report ID not available after save attempt. Cannot proceed."
      );
      setCurrentStage("form");
      return;
    }

    // --- Stage 2: Generate AI Documents (remains the same as your provided code) ---
    setCurrentStage("generatingAI");
    setProcessingMessage("Contacting AI for document generation...");
    const aiPayload = {
      ...formData,
      amount: isNaN(amountValue) ? null : amountValue,
    };
    let aiGeneratedData: AIDocuments | null = null;

    try {
      const aiResponse = await fetch(
        "https://reclaimme-backend.onrender.com/generate-documents/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aiPayload),
        }
      );
      if (!aiResponse.ok) {
        const errorData = await aiResponse
          .json()
          .catch(() => ({ detail: "Unknown AI error." }));
        throw new Error(
          errorData.detail ||
            `AI Generation Error: Status ${aiResponse.statusText}`
        );
      }
      aiGeneratedData = await aiResponse.json();
      setProcessingMessage("AI documents received! Updating report...");
    } catch (err) {
      console.error("Failed to fetch AI documents:", err);
      setApiError(`AI Generation Failed: ${(err as Error).message}.`);
      // Update status to 'AI Processing Failed'
      try {
        await fetch(`/api/reports/${reportId}`, {
          // Use the captured reportId
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "AI Processing Failed" }),
        });
      } catch (updateErr) {
        console.error(
          "Failed to update status to AI Processing Failed",
          updateErr
        );
      }
      setCurrentStage("form");
      return;
    }

    if (!aiGeneratedData) {
      setApiError("No data received from AI. Cannot update report.");
      setCurrentStage("form");
      return;
    }

    // --- Stage 3: Update Report with AI Content (remains the same) ---
    setCurrentStage("updatingReportWithAI");
    setProcessingMessage("Saving AI-generated content to your report...");
    const updatePayload: Partial<ComplaintPayload> = {
      aiConsolingMessage: aiGeneratedData.consoling_message,
      aiPoliceReportDraft: aiGeneratedData.police_report_draft,
      aiBankComplaintEmail: aiGeneratedData.bank_complaint_email,
      aiNextStepsChecklist: aiGeneratedData.next_steps_checklist,
      status: "Under Review",
    };

    try {
      const updateResponse = await fetch(`/api/reports/${reportId}`, {
        // Use the captured reportId
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });
      if (!updateResponse.ok) {
        const errorData = await updateResponse
          .json()
          .catch(() => ({ detail: "Unknown update error." }));
        throw new Error(
          errorData.detail ||
            `Update Error: Status ${updateResponse.statusText}`
        );
      }
      setDisplayDocs({
        consoling_message: aiGeneratedData.consoling_message,
        police_report_draft: aiGeneratedData.police_report_draft,
        bank_complaint_email: aiGeneratedData.bank_complaint_email,
        next_steps_checklist: aiGeneratedData.next_steps_checklist
          .split("\n")
          .map((step: string) => step.trim())
          .filter((step: string) => step),
      });
      setCurrentStage("displayDocs");
    } catch (err) {
      console.error("Failed to update report with AI content:", err);
      setApiError(
        `Failed to save AI content: ${(err as Error).message}. AI documents generated but not saved to report.`
      );
      setDisplayDocs({
        /* ... populate with aiGeneratedData ... */
      }); // Still show AI docs
      setCurrentStage("displayDocs");
    }
  };

  const handleDownloadTxt = (
    content: string | null | undefined,
    filename: string
  ) => {
    if (!content) {
      alert("No content to download.");
      return;
    }
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleCopyToClipboard = (content: string | null | undefined) => {
    if (!content) {
      alert("No content to copy.");
      return;
    }
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy.");
      });
  };

  useEffect(() => {
    if (currentStage === "displayDocs" && displayDocs && resultRef.current) {
      setTimeout(
        () => resultRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  }, [displayDocs, currentStage]);

  // --- UI Rendering ---

  if (
    currentStage === "generatingAI" ||
    currentStage === "savingReport" ||
    currentStage === "updatingReportWithAI"
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
        <Loader2 className="h-16 w-16 text-blue-600 dark:text-blue-400 animate-spin mb-6" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Processing Your Request
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {processingMessage}
        </p>
        {apiError && (
          <p className="text-red-500 dark:text-red-400 mt-4 text-center">
            <AlertTriangle className="inline mr-2" />
            {apiError}
          </p>
        )}
      </div>
    );
  }

  if (currentStage === "displayDocs" && displayDocs) {
    return (
      <div
        ref={resultRef}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 p-4 selection:bg-blue-200 dark:selection:bg-blue-700"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Documents Ready
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Review and edit your generated documents below.
            </p>
            {apiError && (
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-2 flex items-center justify-center">
                <AlertTriangle className="inline mr-1 h-4 w-4" />
                {apiError} (Content displayed may not be saved to the report)
              </p>
            )}
            {savedReportId && !apiError && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Report (ID: {savedReportId}) and AI content saved successfully!
              </p>
            )}
          </div>

          {displayDocs.consoling_message && (
            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  A Message For You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {displayDocs.consoling_message}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FileText className="h-5 w-5" /> Police Report Draft
                  <span className="text-xs font-normal text-blue-500 dark:text-blue-400 flex items-center">
                    (<Edit3 size={12} className="mr-1" />
                    Editable)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre
                  ref={policeReportRef}
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-slate-700 p-4 rounded-lg max-h-96 overflow-y-auto text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {displayDocs.police_report_draft}
                </pre>
                <Button
                  className="w-full mt-4"
                  onClick={() =>
                    handleDownloadTxt(
                      policeReportRef.current?.innerText,
                      "police_report_draft.txt"
                    )
                  }
                >
                  Download Edited Report (.txt)
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <Mail className="h-5 w-5" /> Bank Complaint Email
                  {displayDocs.bank_complaint_email &&
                    !displayDocs.bank_complaint_email
                      .toLowerCase()
                      .startsWith("not applicable") && (
                      <span className="text-xs font-normal text-blue-500 dark:text-blue-400 flex items-center">
                        (<Edit3 size={12} className="mr-1" />
                        Editable)
                      </span>
                    )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {displayDocs.bank_complaint_email &&
                displayDocs.bank_complaint_email
                  .toLowerCase()
                  .startsWith("not applicable") ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                    {displayDocs.bank_complaint_email}
                  </p>
                ) : (
                  <pre
                    ref={bankComplaintRef}
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-slate-700 p-4 rounded-lg max-h-96 overflow-y-auto text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {displayDocs.bank_complaint_email}
                  </pre>
                )}
                <Button
                  className="w-full mt-4"
                  onClick={() =>
                    handleCopyToClipboard(bankComplaintRef.current?.innerText)
                  }
                  disabled={displayDocs.bank_complaint_email
                    .toLowerCase()
                    .startsWith("not applicable")}
                >
                  Copy Edited Email
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">
                Next Steps Checklist
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Follow these steps to maximize your chances of recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayDocs.next_steps_checklist.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 flex items-center justify-center text-sm font-medium mt-0.5 shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-slate-700"
              onClick={() => {
                setDisplayDocs(null);
                setFormData(initialFormData);
                setApiError(null);
                setSavedReportId(null);
                setCurrentStage("form");
              }}
            >
              Report Another Scam / Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Form UI
  return (
    <div className="min-h-screen selection:bg-blue-200 dark:selection:bg-blue-700">
      <div className="max-w-2xl mx-auto space-y-6 flex py-8 px-4">
        <Card className="bg-white dark:bg-slate-900 shadow-xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Tell Us What Happened
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              We&apos;ll guide you. Your information is used to generate helpful
              documents and save your report.
              <br />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Fields marked with <span className="text-red-500">*</span> are
                required
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            <div className="space-y-4 p-4 border dark:border-slate-700 rounded-md">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Personal Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="dark:text-slate-300">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="dark:text-slate-300">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+234801234567"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="dark:text-slate-300">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address" className="dark:text-slate-300">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Your full address"
                  rows={2}
                />
              </div>
            </div>

            {/* Step 2: Incident Details */}
            {isStepComplete(0) && (
              <div className="space-y-4 p-4 border dark:border-slate-700 rounded-md animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Incident Details
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="scamType" className="dark:text-slate-300">
                      Type of Scam <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.scamType}
                      onValueChange={(value) =>
                        updateFormData("scamType", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
                        <SelectValue placeholder="Select scam type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 dark:text-slate-200">
                        {scamTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dateTime" className="dark:text-slate-300">
                      Date & Time of Incident{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateTime"
                      className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                      type="datetime-local"
                      value={formData.dateTime}
                      onChange={(e) =>
                        updateFormData("dateTime", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="dark:text-slate-300">
                    What Happened? <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    placeholder="Describe what happened in detail..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {isStepComplete(1) && (
              <div className="space-y-4 p-4 border dark:border-slate-700 rounded-md animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Financial Information (Optional)
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="amount" className="dark:text-slate-300">
                      Amount Lost
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                      value={formData.amount}
                      onChange={(e) => updateFormData("amount", e.target.value)}
                      placeholder="50000"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="currency" className="dark:text-slate-300">
                      Currency
                    </Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        updateFormData("currency", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 dark:text-slate-200">
                        <SelectItem value="NGN">NGN</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="paymentMethod"
                      className="dark:text-slate-300"
                    >
                      Payment Method
                    </Label>
                    <Input
                      id="paymentMethod"
                      className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                      value={formData.paymentMethod}
                      onChange={(e) =>
                        updateFormData("paymentMethod", e.target.value)
                      }
                      placeholder="e.g., Bank Transfer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Beneficiary Information */}
            {isStepComplete(1) && parseFloat(formData.amount) > 0 && (
              <div className="space-y-4 p-4 border dark:border-slate-700 rounded-md animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Scammer/Beneficiary Details (If known)
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="beneficiaryName"
                      className="dark:text-slate-300"
                    >
                      Beneficiary Name
                    </Label>
                    <Input
                      id="beneficiaryName"
                      className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                      value={formData.beneficiary.name}
                      onChange={(e) =>
                        updateFormData("beneficiary.name", e.target.value)
                      }
                      placeholder="Name on account"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="beneficiaryBank"
                      className="dark:text-slate-300"
                    >
                      Bank Name
                    </Label>
                    <Input
                      id="beneficiaryBank"
                      className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                      value={formData.beneficiary.bank}
                      onChange={(e) =>
                        updateFormData("beneficiary.bank", e.target.value)
                      }
                      placeholder="Bank name"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="beneficiaryAccount"
                    className="dark:text-slate-300"
                  >
                    Account Number
                  </Label>
                  <Input
                    id="beneficiaryAccount"
                    className="bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                    value={formData.beneficiary.account}
                    onChange={(e) =>
                      updateFormData("beneficiary.account", e.target.value)
                    }
                    placeholder="Account number"
                  />
                </div>
              </div>
            )}

            {apiError && currentStage === "form" && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center mt-2 flex items-center justify-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {apiError}
              </p>
            )}

            {isStepComplete(2) && (
              <div className="pt-6 animate-in slide-in-from-bottom-4">
                <Button
                  onClick={handleFullGenerationProcess}
                  className="w-full h-12 text-lg"
                >
                  Generate <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-center mt-2 text-slate-500 dark:text-slate-400">
                  Saves your report and generates AI-assisted documents.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="sticky top-8 left-0 h-full flex items-start pl-4">
          <div className="w-3 min-h-[400px] max-h-[600px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
            <div
              className={`absolute left-0 bottom-0 w-full transition-all duration-500 ${isStepComplete(2) ? "bg-green-500" : isStepComplete(1) ? "bg-blue-500" : isStepComplete(0) ? "bg-yellow-500" : "bg-gray-300"}`}
              style={{
                height: isStepComplete(2)
                  ? "100%"
                  : isStepComplete(1)
                    ? "70%"
                    : isStepComplete(0)
                      ? "35%"
                      : "5%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
