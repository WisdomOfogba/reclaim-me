// components/pdf-generator.ts

// Import jsPDF and jspdf-autotable
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // This extends the jsPDF prototype
import type { UserOptions } from "jspdf-autotable"; // For typing autoTable options

// You'll need to decide how to handle fonts with jsPDF.
// For standard fonts, jsPDF has built-in support.
// For custom fonts (like Roboto here), you'd typically:
// 1. Convert them to base64.
// 2. Add them to jsPDF using doc.addFont().
// For simplicity in this conversion, we'll stick to jsPDF's core fonts for text.
// If you absolutely need Roboto, you'll have to add it to jsPDF manually.
// For this example, we'll use jsPDF's built-in 'helvetica' font for text.

// You might also need to define custom types if @types/jspdf doesn't cover all cases.
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
  }
}

interface PoliceReportPDFData {
  formData: {
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
  };
  policeReport: string;
  reportId: number;
}

export const generatePoliceReportPDF = async ({
  formData,
  policeReport,
  reportId,
}: PoliceReportPDFData) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Image loader helper (remains similar, but you'll add it directly)
  const getBase64ImageFromURL = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to load logo image:", error);
      return "";
    }
  };

  let logoBase64 = "";
  try {
    logoBase64 = await getBase64ImageFromURL(
      "https://reclaim-me.vercel.app/assets/Logo.png"
    );
  } catch {
    console.warn("Logo could not be loaded into PDF.");
  }

  // --- PDF Content Generation with jsPDF ---

  // Set default font for consistency (jsPDF default is 'helvetica')
  doc.setFont("helvetica");

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 40; // Left/Right margin
  const topMargin = 80; // Adjusted top margin for content after header
  let y = topMargin; // Current Y position for drawing content

  // 1. Header
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", margin, 22, 40, 20); // x, y, width, height
  }
  doc.setFontSize(18);
  doc.text("ReclaimMe Police Report", pageWidth - margin, 35, {
    align: "right",
  });

  // 2. Main Title
  y += 20; // Space after header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  const mainTitleText = "OFFICIAL POLICE REPORT DRAFT";
  const mainTitleWidth =
    (doc.getStringUnitWidth(mainTitleText) * doc.getFontSize()) /
    doc.internal.scaleFactor;
  const mainTitleX = (pageWidth - mainTitleWidth) / 2;
  doc.text(mainTitleText, mainTitleX, y);
  doc.setDrawColor("#0D47A1"); // Primary blue for underline
  doc.line(mainTitleX, y + 2, mainTitleX + mainTitleWidth, y + 2); // Underline

  y += 15;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const reportIdText = `Report ID: RM-${reportId.toString().padStart(6, "0")}`;
  doc.text(reportIdText, pageWidth / 2, y, { align: "center" });

  // 3. Incident Details
  y += 25;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#0D47A1"); // Primary blue for section header
  doc.text("INCIDENT DETAILS:", margin, y);
  y += 10;
  doc.setTextColor(0, 0, 0); // Reset color to black

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const details = [
    ["Date of Incident:", new Date(formData.dateTime).toLocaleString()],
    ["Type of Scam:", formData.scamType],
    [
      "Amount Lost:",
      formData.amount
        ? `${formData.currency} ${parseFloat(formData.amount).toLocaleString()}`
        : "N/A",
    ],
    ["Payment Method:", formData.paymentMethod || "N/A"],
  ];

  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      value,
      margin + doc.getStringUnitWidth(label) * doc.getFontSize() + 5,
      y
    ); // Position value
    y += 7; // Line height for details
  });

  // 4. Complainant Details
  y += 15;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#0D47A1");
  doc.text("COMPLAINANT DETAILS:", margin, y);
  y += 10;
  doc.setTextColor(0, 0, 0);

  const complainantDetails = [
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Email: ${formData.email}`,
    `Address: ${formData.address}`,
  ];
  complainantDetails.forEach((item) => {
    doc.text(`• ${item}`, margin + 5, y);
    y += 7;
  });

  // 5. Scammer/Beneficiary Details (Conditional)
  if (
    formData.beneficiary.name ||
    formData.beneficiary.bank ||
    formData.beneficiary.account
  ) {
    y += 15;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#0D47A1");
    doc.text("SCAMMER / BENEFICIARY DETAILS (IF KNOWN):", margin, y);
    y += 10;
    doc.setTextColor(0, 0, 0);

    const beneficiaryDetails = [
      formData.beneficiary.name ? `Name: ${formData.beneficiary.name}` : "",
      formData.beneficiary.bank ? `Bank: ${formData.beneficiary.bank}` : "",
      formData.beneficiary.account
        ? `Account No.: ${formData.beneficiary.account}`
        : "",
    ].filter(Boolean);

    beneficiaryDetails.forEach((item) => {
      doc.text(`• ${item}`, margin + 5, y);
      y += 7;
    });
  }

  // 6. Incident Description (FIXED LOGIC)
  y += 15;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#0D47A1");
  doc.text("INCIDENT DESCRIPTION:", margin, y);
  y += 10;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // Split the policeReport into lines that fit the page width
  const splitDescriptionLines = doc.splitTextToSize(
    policeReport,
    pageWidth - 2 * margin // Account for left and right margins
  );

  // Iterate through each line of the description
  for (const line of splitDescriptionLines) {
    // Check if adding this line would go beyond the page bottom margin
    if (y > pageHeight - margin) {
      doc.addPage(); // Add a new page
      y = margin; // Reset Y position for the new page (start from top margin)
      // You might want to re-add headers/footers on new pages if needed,
      // but that's more complex and often involves a loop over pages or a plugin.
    }
    doc.text(line, margin, y); // Print the current line
    y += 7; // Increment Y for the next line (adjust line height as needed)
  }

  y += 20; // Add some space after the description

  // 7. Note Section (FIXED LOGIC)
  // Check if the note section needs a new page
  if (y > pageHeight - margin) {
    doc.addPage();
    y = margin; // Reset Y for the new page
  }

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#777777");
  doc.text("NOTE:", margin, y);
  y += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  const noteText =
    "This document is a draft generated by ReclaimMe. It is intended to assist in preparing an official police report. Please review, verify, and present this to the appropriate law enforcement agency. Actual reporting procedures may vary.";
  const splitNote = doc.splitTextToSize(noteText, pageWidth - 2 * margin);
  doc.text(splitNote, margin, y);

  // Final Save/Download
  doc.save(`Police_Report_RM-${reportId.toString().padStart(6, "0")}.pdf`);
};
