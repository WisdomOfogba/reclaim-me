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

export async function generatePoliceReportPDF({
  formData,
  policeReport,
  reportId,
}: PoliceReportPDFData) {
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
    fontStyle = "normal"
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle as any);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * (fontSize * 0.35) + 2;
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

  // Official Header with Logo Space
  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, pageWidth, 40, "F");

  // Police Department Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("NIGERIA POLICE FORCE", pageWidth / 2, 15, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("INCIDENT REPORT FORM", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(10);
  doc.text("CONFIDENTIAL DOCUMENT", pageWidth / 2, 32, { align: "center" });

  yPosition = 50;

  // Report Header Information
  doc.setFillColor(250, 250, 250);
  doc.rect(margin, yPosition, contentWidth, 25, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 25);

  yPosition += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("REPORT DETAILS", margin + 5, yPosition);
  yPosition += 5;

  doc.setFont("helvetica", "normal");
  doc.text(
    `Report No: NPF/${new Date().getFullYear()}/${reportId.toString().padStart(6, "0")}`,
    margin + 5,
    yPosition
  );
  doc.text(
    `Date Filed: ${new Date().toLocaleDateString()}`,
    pageWidth - margin - 50,
    yPosition,
    { align: "right" }
  );
  yPosition += 4;
  doc.text(
    `Time Filed: ${new Date().toLocaleTimeString()}`,
    margin + 5,
    yPosition
  );
  doc.text(`Status: UNDER INVESTIGATION`, pageWidth - margin - 50, yPosition, {
    align: "right",
  });

  yPosition += 15;

  // Complainant Information Section
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 8);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SECTION A: COMPLAINANT INFORMATION", margin + 5, yPosition + 5);
  yPosition += 15;

  // Complainant details in a structured format
  const complainantData = [
    [`Full Name: ${formData.name}`, `Phone Number: ${formData.phone}`],
    [`Email Address: ${formData.email}`, `Date of Birth: _______________`],
    [`Residential Address: ${formData.address}`, `Occupation: _______________`],
    [`Next of Kin: _______________`, `Relationship: _______________`],
  ];

  complainantData.forEach(([left, right]) => {
    checkNewPage(15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(left, margin + 5, yPosition);
    doc.text(right, margin + contentWidth / 2 + 5, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Incident Information Section
  checkNewPage(40);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 8);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SECTION B: INCIDENT DETAILS", margin + 5, yPosition + 5);
  yPosition += 15;

  const incidentDate = new Date(formData.dateTime);
  const incidentData = [
    [
      `Nature of Crime: ${formData.scamType}`,
      `Classification: FRAUD/CYBERCRIME`,
    ],
    [
      `Date of Incident: ${incidentDate.toLocaleDateString()}`,
      `Time of Incident: ${incidentDate.toLocaleTimeString()}`,
    ],
    [`Location: ONLINE/DIGITAL PLATFORM`, `Jurisdiction: CYBERCRIME UNIT`],
    [
      `Amount Involved: ${formData.amount ? `${formData.currency} ${Number.parseFloat(formData.amount).toLocaleString()}` : "N/A"}`,
      `Recovery Status: PENDING`,
    ],
  ];

  incidentData.forEach(([left, right]) => {
    checkNewPage(15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(left, margin + 5, yPosition);
    doc.text(right, margin + contentWidth / 2 + 5, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Suspect Information Section
  if (
    formData.beneficiary.name ||
    formData.beneficiary.bank ||
    formData.beneficiary.account
  ) {
    checkNewPage(40);
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, yPosition, contentWidth, 8, "F");
    doc.setLineWidth(0.5);
    doc.rect(margin, yPosition, contentWidth, 8);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("SECTION C: SUSPECT INFORMATION", margin + 5, yPosition + 5);
    yPosition += 15;

    const suspectData = [
      [
        `Suspect Name: ${formData.beneficiary.name || "UNKNOWN"}`,
        `Alias: _______________`,
      ],
      [
        `Bank Name: ${formData.beneficiary.bank || "UNKNOWN"}`,
        `Account Number: ${formData.beneficiary.account || "UNKNOWN"}`,
      ],
      [`Phone Number: _______________`, `Email Address: _______________`],
      [`Last Known Address: _______________`, `Other Details: _______________`],
    ];

    suspectData.forEach(([left, right]) => {
      checkNewPage(15);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(left, margin + 5, yPosition);
      doc.text(right, margin + contentWidth / 2 + 5, yPosition);
      yPosition += 6;
    });

    yPosition += 10;
  }

  // Incident Narrative Section
  checkNewPage(60);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 8);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SECTION D: DETAILED INCIDENT NARRATIVE", margin + 5, yPosition + 5);
  yPosition += 15;

  // Add narrative box
  const narrativeHeight = 60;
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, narrativeHeight);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  yPosition = addWrappedText(
    policeReport,
    margin + 3,
    yPosition + 5,
    contentWidth - 6,
    9
  );

  yPosition = Math.max(yPosition, yPosition + narrativeHeight - 15);
  yPosition += 20;

  // Evidence Section
  checkNewPage(40);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 8);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SECTION E: EVIDENCE AND EXHIBITS", margin + 5, yPosition + 5);
  yPosition += 15;

  const evidenceItems = [
    "☐ Screenshots of fraudulent messages/emails",
    "☐ Bank transaction records",
    "☐ Phone call recordings (if available)",
    "☐ Social media communications",
    "☐ Payment receipts/confirmations",
    "☐ Other supporting documents: _______________",
  ];

  evidenceItems.forEach((item) => {
    checkNewPage(10);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(item, margin + 5, yPosition);
    yPosition += 6;
  });

  yPosition += 15;

  // Declaration Section
  checkNewPage(50);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 8);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SECTION F: COMPLAINANT DECLARATION", margin + 5, yPosition + 5);
  yPosition += 15;

  const declaration = `I, ${formData.name}, hereby declare that the information provided in this report is true and accurate to the best of my knowledge. I understand that providing false information to the police is an offense punishable by law. I am willing to cooperate fully with the investigation and provide additional information as required.`;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  yPosition = addWrappedText(
    declaration,
    margin + 5,
    yPosition,
    contentWidth - 10,
    9
  );
  yPosition += 15;

  // Signature Section
  checkNewPage(40);
  const signatureY = yPosition;

  // Complainant signature
  doc.setLineWidth(0.5);
  doc.line(margin + 5, signatureY + 15, margin + 80, signatureY + 15);
  doc.setFontSize(8);
  doc.text("Complainant Signature", margin + 5, signatureY + 20);
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    margin + 5,
    signatureY + 25
  );

  // Officer signature
  doc.line(
    pageWidth - margin - 75,
    signatureY + 15,
    pageWidth - margin - 5,
    signatureY + 15
  );
  doc.text("Receiving Officer", pageWidth - margin - 75, signatureY + 20);
  doc.text("Date: _______________", pageWidth - margin - 75, signatureY + 25);

  yPosition += 35;

  // Official Footer
  checkNewPage(30);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  doc.setFillColor(240, 240, 240);
  doc.rect(0, yPosition, pageWidth, 25, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("FOR OFFICIAL USE ONLY", pageWidth / 2, yPosition + 5, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.text(`Case Officer: _______________`, margin + 5, yPosition + 12);
  doc.text(
    `Badge No: _______________`,
    pageWidth - margin - 50,
    yPosition + 12,
    { align: "right" }
  );
  doc.text(`Investigation Status: PENDING`, margin + 5, yPosition + 18);
  doc.text(
    `File Reference: NPF/CYB/${new Date().getFullYear()}/${reportId}`,
    pageWidth - margin - 80,
    yPosition + 18,
    {
      align: "right",
    }
  );

  // Save the PDF
  const fileName = `police-report-${reportId}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}
