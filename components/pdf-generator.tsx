"use client";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  scamType: string;
  dateTime: string;
  description: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  beneficiary: {
    name: string;
    bank: string;
    account: string;
  };
}

interface Documents {
  consoling_message: string;
  police_report_draft: string;
  bank_complaint_email: string;
  next_steps_checklist: string[];
}

interface PDFData {
  formData: FormData;
  documents: Documents;
  reportId: number;
}

export async function generatePDF({ formData, documents, reportId }: PDFData) {
  // Dynamic import to avoid SSR issues
  const jsPDF = (await import("jspdf")).default;

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize = 10
  ) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * (fontSize * 0.35); // Return new Y position
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("SCAM INCIDENT REPORT", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 15;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Report ID: #${reportId}`, margin, yPosition);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    pageWidth - margin,
    yPosition,
    { align: "right" }
  );
  yPosition += 15;

  // Draw line
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Victim Information Section
  checkNewPage(40);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("VICTIM INFORMATION", margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const victimInfo = [
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Email: ${formData.email}`,
    `Address: ${formData.address}`,
  ];

  victimInfo.forEach((info) => {
    yPosition = addWrappedText(info, margin, yPosition, contentWidth);
    yPosition += 2;
  });
  yPosition += 10;

  // Incident Details Section
  checkNewPage(60);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("INCIDENT DETAILS", margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const incidentInfo = [
    `Type of Scam: ${formData.scamType}`,
    `Date & Time: ${new Date(formData.dateTime).toLocaleString()}`,
    ...(formData.amount && Number.parseFloat(formData.amount) > 0
      ? [
          `Amount Lost: ${formData.currency} ${Number.parseFloat(formData.amount).toLocaleString()}`,
          `Payment Method: ${formData.paymentMethod || "Not specified"}`,
        ]
      : []),
    `Description: ${formData.description}`,
  ];

  incidentInfo.forEach((info) => {
    yPosition = addWrappedText(info, margin, yPosition, contentWidth);
    yPosition += 2;
  });
  yPosition += 10;

  // Scammer Information (if available)
  if (
    formData.beneficiary.name ||
    formData.beneficiary.bank ||
    formData.beneficiary.account
  ) {
    checkNewPage(30);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SCAMMER/BENEFICIARY INFORMATION", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const scammerInfo = [
      `Name: ${formData.beneficiary.name || "Unknown"}`,
      `Bank: ${formData.beneficiary.bank || "Unknown"}`,
      `Account: ${formData.beneficiary.account || "Unknown"}`,
    ];

    scammerInfo.forEach((info) => {
      yPosition = addWrappedText(info, margin, yPosition, contentWidth);
      yPosition += 2;
    });
    yPosition += 15;
  }

  // New page for AI documents
  doc.addPage();
  yPosition = margin;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("AI-GENERATED SUPPORT DOCUMENTS", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 15;

  // Support Message
  if (documents.consoling_message) {
    checkNewPage(40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SUPPORT MESSAGE", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    yPosition = addWrappedText(
      documents.consoling_message,
      margin,
      yPosition,
      contentWidth,
      9
    );
    yPosition += 10;
  }

  // Police Report Draft
  checkNewPage(60);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("POLICE REPORT DRAFT", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(8);
  doc.setFont("courier", "normal");
  yPosition = addWrappedText(
    documents.police_report_draft,
    margin,
    yPosition,
    contentWidth,
    8
  );
  yPosition += 10;

  // Bank Complaint Email
  if (
    documents.bank_complaint_email &&
    !documents.bank_complaint_email.toLowerCase().startsWith("not applicable")
  ) {
    checkNewPage(60);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("BANK COMPLAINT EMAIL TEMPLATE", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(8);
    doc.setFont("courier", "normal");
    yPosition = addWrappedText(
      documents.bank_complaint_email,
      margin,
      yPosition,
      contentWidth,
      8
    );
    yPosition += 10;
  }

  // Next Steps Checklist
  checkNewPage(80);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("RECOVERY ACTION PLAN", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  documents.next_steps_checklist.forEach((step, index) => {
    checkNewPage(15);

    // Add checkbox
    doc.rect(margin, yPosition - 3, 3, 3);

    // Add step number and text
    doc.text(`${index + 1}.`, margin + 5, yPosition);
    yPosition = addWrappedText(
      step,
      margin + 12,
      yPosition,
      contentWidth - 12,
      9
    );
    yPosition += 5;
  });

  // Footer
  yPosition += 10;
  checkNewPage(20);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Important: This report and supporting documents are generated to assist you in your recovery efforts.",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 4;
  doc.text(
    "Please review all information for accuracy before submitting to authorities or financial institutions.",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 4;
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} | Report ID: #${reportId}`,
    pageWidth / 2,
    yPosition,
    {
      align: "center",
    }
  );

  // Save the PDF
  const fileName = `scam-report-${reportId}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}

interface PoliceReportPDFData {
  formData: FormData;
  policeReport: string;
  reportId: number;
}

// Function to parse and extract information from the edited police report text
function parsePoliceReportContent(reportText: string) {
  const lines = reportText.split("\n").filter((line) => line.trim() !== "");

  // Extract key information using regex patterns
  const extractInfo = {
    subject: "",
    complainantName: "",
    address: "",
    phone: "",
    email: "",
    incidentDate: "",
    scamType: "",
    amount: "",
    currency: "",
    description: "",
    evidence: "",
    request: "",
    closing: "",
  };

  let currentSection = "";
  const descriptionLines: string[] = [];
  const evidenceLines: string[] = [];
  const requestLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Extract subject
    if (line.startsWith("Subject:")) {
      extractInfo.subject = line.replace("Subject:", "").trim();
    }

    // Extract complainant info from opening line
    if (line.includes("I,") && line.includes("residing at")) {
      const nameMatch = line.match(/I,\s*([^,]+),/);
      if (nameMatch) extractInfo.complainantName = nameMatch[1].trim();

      const addressMatch = line.match(/residing at\s*([^,]+),/);
      if (addressMatch) extractInfo.address = addressMatch[1].trim();
    }

    // Extract contact info
    if (line.includes("contact number is")) {
      const phoneMatch = line.match(/contact number is\s*([^\s]+)/);
      if (phoneMatch) extractInfo.phone = phoneMatch[1].trim();
    }

    if (line.includes("email address is")) {
      const emailMatch = line.match(/email address is\s*([^\s.]+)/);
      if (emailMatch) extractInfo.email = emailMatch[1].trim();
    }

    // Extract incident date
    if (line.includes("On ") && line.match(/\d{4}-\d{2}-\d{2}/)) {
      const dateMatch = line.match(/On\s*(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) extractInfo.incidentDate = dateMatch[1];
    }

    // Extract amount and currency
    const amountMatch = line.match(/(NGN|USD|EUR|GBP)\s*([\d,]+\.?\d*)/);
    if (amountMatch) {
      extractInfo.currency = amountMatch[1];
      extractInfo.amount = amountMatch[2];
    }

    // Identify sections
    if (
      line.includes("documentation including") ||
      line.includes("I have documentation")
    ) {
      currentSection = "evidence";
    } else if (
      line.includes("I kindly request") ||
      line.includes("request the assistance")
    ) {
      currentSection = "request";
    } else if (line.includes("Thank you")) {
      currentSection = "closing";
      extractInfo.closing = line;
    } else if (currentSection === "evidence") {
      evidenceLines.push(line);
    } else if (currentSection === "request") {
      requestLines.push(line);
    } else if (
      line.includes("discovered") ||
      line.includes("misled") ||
      line.includes("began charging")
    ) {
      currentSection = "description";
      descriptionLines.push(line);
    } else if (
      currentSection === "description" &&
      !line.includes("documentation") &&
      !line.includes("request")
    ) {
      descriptionLines.push(line);
    }
  }

  extractInfo.description = descriptionLines.join(" ").trim();
  extractInfo.evidence = evidenceLines.join(" ").trim();
  extractInfo.request = requestLines.join(" ").trim();

  return extractInfo;
}

export async function generatePoliceReportPDF({
  formData,
  policeReport,
  reportId,
}: PoliceReportPDFData) {
  // Parse the edited police report content
  const parsedContent = parsePoliceReportContent(policeReport);

  // Dynamic import to avoid SSR issues
  const jsPDF = (await import("jspdf")).default;

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize = 10,
    fontStyle = "normal",
    align: "left" | "center" | "right" = "left"
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle as any);
    const lines = doc.splitTextToSize(text, maxWidth);

    if (align === "center") {
      lines.forEach((line: string, index: number) => {
        doc.text(line, pageWidth / 2, y + index * fontSize * 0.35, {
          align: "center",
        });
      });
    } else if (align === "right") {
      lines.forEach((line: string, index: number) => {
        doc.text(line, x + maxWidth, y + index * fontSize * 0.35, {
          align: "right",
        });
      });
    } else {
      doc.text(lines, x, y);
    }

    return y + lines.length * (fontSize * 0.35) + 3;
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin + 20; // Leave space for header on new pages
      return true;
    }
    return false;
  };

  // Official Header with Nigerian Police Force Branding
  doc.setFillColor(0, 51, 102); // Dark blue background
  doc.rect(0, 0, pageWidth, 35, "F");

  // Nigerian Police Force Header
  doc.setTextColor(255, 255, 255); // White text
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("NIGERIA POLICE FORCE", pageWidth / 2, 15, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("CYBERCRIME UNIT - INCIDENT REPORT", pageWidth / 2, 25, {
    align: "center",
  });

  // Reset text color to black
  doc.setTextColor(0, 0, 0);
  yPosition = 45;

  // Report Classification Box
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, contentWidth, 20, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 20);

  yPosition += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIDENTIAL POLICE REPORT", margin + 5, yPosition);
  doc.text(
    "CLASSIFICATION: CYBERCRIME/FRAUD",
    pageWidth - margin - 5,
    yPosition,
    { align: "right" }
  );

  yPosition += 5;
  doc.setFont("helvetica", "normal");
  doc.text(
    `Report No: NPF/CYB/${new Date().getFullYear()}/${reportId.toString().padStart(6, "0")}`,
    margin + 5,
    yPosition
  );
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    pageWidth - margin - 5,
    yPosition,
    { align: "right" }
  );

  yPosition += 5;
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, margin + 5, yPosition);
  doc.text("Status: UNDER INVESTIGATION", pageWidth - margin - 5, yPosition, {
    align: "right",
  });

  yPosition += 25;

  // Subject Line (extracted from edited content)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  const subject = parsedContent.subject || `Report of ${formData.scamType}`;
  yPosition = addWrappedText(
    `Subject: ${subject}`,
    margin,
    yPosition,
    contentWidth,
    12,
    "bold"
  );
  yPosition += 8;

  // Main Report Content (using parsed content)
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // Use the actual edited police report content, but format it nicely
  const reportLines = policeReport
    .split("\n")
    .filter((line) => line.trim() !== "");

  for (const line of reportLines) {
    checkNewPage(15);

    // Handle different types of content with appropriate formatting
    if (line.startsWith("Subject:")) {
      // Skip subject as we already handled it
      continue;
    } else if (line.includes("Sincerely,") || line.includes("Thank you")) {
      yPosition += 5; // Add extra space before closing
      doc.setFont("helvetica", "normal");
      yPosition = addWrappedText(line, margin, yPosition, contentWidth, 11);
    } else if (
      line.trim() === parsedContent.complainantName ||
      line.includes("Contact:") ||
      line.includes("Email:") ||
      line.includes("Address:")
    ) {
      // Format contact information
      doc.setFont("helvetica", "bold");
      yPosition = addWrappedText(
        line,
        margin,
        yPosition,
        contentWidth,
        11,
        "bold"
      );
    } else {
      // Regular paragraph text
      doc.setFont("helvetica", "normal");
      yPosition = addWrappedText(line, margin, yPosition, contentWidth, 11);
    }
    yPosition += 4;
  }

  yPosition += 15;

  // Official processing section
  checkNewPage(80);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 8);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("FOR OFFICIAL USE ONLY", margin + 5, yPosition + 5);
  yPosition += 15;

  // Official fields
  const officialFields = [
    "Receiving Officer: _________________________________",
    "Badge Number: _______________  Date Received: _______________",
    "Case Assigned To: _________________________________",
    "Investigation Status: ☐ Pending  ☐ Active  ☐ Closed",
    "Priority Level: ☐ High  ☐ Medium  ☐ Low",
    "Evidence Collected: ☐ Yes  ☐ No  ☐ Pending",
    "Follow-up Required: ☐ Yes  ☐ No",
    "Additional Notes: _________________________________",
    "_________________________________________________",
  ];

  officialFields.forEach((field) => {
    checkNewPage(10);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(field, margin + 5, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Footer with file reference
  checkNewPage(25);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  doc.setFillColor(0, 51, 102);
  doc.rect(0, yPosition, pageWidth, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(
    "NIGERIA POLICE FORCE - CYBERCRIME UNIT",
    pageWidth / 2,
    yPosition + 6,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.text(
    `File Reference: NPF/CYB/${new Date().getFullYear()}/${reportId} | Generated: ${new Date().toLocaleString()}`,
    pageWidth / 2,
    yPosition + 12,
    { align: "center" }
  );

  doc.text(
    "This document contains confidential information and is intended for official use only",
    pageWidth / 2,
    yPosition + 16,
    { align: "center" }
  );

  // Save the PDF
  const fileName = `police-report-${reportId}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}
