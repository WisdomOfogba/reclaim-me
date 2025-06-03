// components/pdf-generator.ts

// IMPORTANT: pdfFonts MUST be imported at the top-level
// because it relies on pdfmake to be available globally (or via its specific setup)
// when it runs. It has a side-effect of populating pdfMake.vfs.
// We will still dynamically import pdfMake itself within the function.
import pdfFonts from "pdfmake/build/vfs_fonts";

// Import specific types directly from pdfmake's interfaces
// These types are used to provide strong typing for the pdfmake document definition.
import {
  TDocumentDefinitions,
  Content,
  Column,
  StyleDictionary,
  TDocumentInformation,
} from "pdfmake/interfaces";

interface PoliceReportPDFData {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    scamType: string;
    dateTime: string;
    description: string; // Ensure this is present in the interface
    amount: string;
    currency: string;
    paymentMethod: string;
    beneficiary: {
      name: string;
      bank: string;
      account: string;
    };
  };
  policeReport: string; // This is the AI-generated and potentially edited police_report_draft
  reportId: number;
}

export const generatePoliceReportPDF = async ({
  formData,
  policeReport,
  reportId,
}: PoliceReportPDFData) => {
  // Dynamically import the main pdfmake library.
  // This ensures the core pdfmake code is only loaded and executed on the client-side.
  const pdfMakeLoader = await import("pdfmake/build/pdfmake");
  const pdfMake = pdfMakeLoader.default || pdfMakeLoader;

  // IMPORTANT: Assign pdfFonts' vfs data to the pdfMake instance.
  // This step is crucial for pdfmake to have access to the default fonts.
  // We use 'as any' here because the types might not perfectly reflect
  // pdfmake's internal runtime structure for this specific assignment,
  // but it's a known safe pattern.
  (pdfMake as any).vfs = (pdfFonts as any).vfs;

  // Helper function to convert an image URL to a base64 string.
  // This is required because pdfmake needs image data directly embedded in the PDF.
  const getBase64ImageFromURL = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to load logo image:", error);
      // Return an empty string if the logo fails to load gracefully,
      // so the PDF generation can continue without it.
      return "";
    }
  };

  let logoBase64: string = "";
  try {
    logoBase64 = await getBase64ImageFromURL(
      "https://reclaim-me.vercel.app/assets/Logo.png"
    );
  } catch {
    // The error is already logged within getBase64ImageFromURL, so no need to re-log here.
  }

  // Define the document structure and content for the PDF using pdfmake's TDocumentDefinitions interface.
  const docDefinition: TDocumentDefinitions = {
    // PDF header section: Contains the logo and the report title.
    header: {
      columns: [
        // Conditionally include the logo image column only if logoBase64 is available.
        ...(logoBase64
          ? [
              // Wrap in an array because 'columns' expects an array of Column objects.
              {
                image: logoBase64,
                width: 50,
                height: 50,
                margin: [40, 10, 0, 0],
                alignment: "left",
              } as Column, // Explicitly cast to Column for type safety.
            ]
          : []), // If no logo, this spread operator adds nothing to the columns array.
        // The main report title in the header, aligned to the right.
        {
          text: "ReclaimMe Police Report",
          style: "headerTitle",
          alignment: "right",
          margin: [0, 20, 40, 0],
        } as Column, // Explicitly cast to Column.
      ],
      columnGap: 10, // Defines the spacing between columns in the header.
    },

    // Main content of the PDF. Each element is cast to 'Content' type for type safety.
    content: [
      // Main title of the report.
      {
        text: "OFFICIAL POLICE REPORT DRAFT",
        style: "mainTitle",
        alignment: "center",
        margin: [0, 80, 0, 20],
      } as Content,
      // Report ID, formatted with leading zeros for consistent display.
      {
        text: `Report ID: RM-${reportId.toString().padStart(6, "0")}`,
        style: "reportId",
        alignment: "center",
        margin: [0, 0, 0, 20],
      } as Content,

      // --- Incident Details Section ---
      {
        text: "INCIDENT DETAILS:",
        style: "sectionHeader",
        margin: [0, 10, 0, 10],
      } as Content,
      {
        columns: [
          {
            text: "Date of Incident:",
            width: "auto",
            style: "label",
          } as Content,
          {
            text: new Date(formData.dateTime).toLocaleString(), // Formats date/time for display.
            width: "*",
            style: "value",
          } as Content,
        ],
        margin: [0, 5, 0, 5],
      } as Content,
      {
        columns: [
          { text: "Type of Scam:", width: "auto", style: "label" } as Content,
          { text: formData.scamType, width: "*", style: "value" } as Content,
        ],
        margin: [0, 5, 0, 5],
      } as Content,
      {
        columns: [
          { text: "Amount Lost:", width: "auto", style: "label" } as Content,
          {
            text: formData.amount // Displays amount with currency, or "N/A" if empty.
              ? `${formData.currency} ${parseFloat(formData.amount).toLocaleString()}`
              : "N/A",
            width: "*",
            style: "value",
          } as Content,
        ],
        margin: [0, 5, 0, 5],
      } as Content,
      {
        columns: [
          { text: "Payment Method:", width: "auto", style: "label" } as Content,
          {
            text: formData.paymentMethod || "N/A",
            width: "*",
            style: "value",
          } as Content,
        ],
        margin: [0, 5, 0, 15],
      } as Content,

      // --- Complainant Details Section ---
      {
        text: "COMPLAINANT DETAILS:",
        style: "sectionHeader",
        margin: [0, 10, 0, 10],
      } as Content,
      {
        ul: [
          // Unordered list for complainant details.
          `Name: ${formData.name}`,
          `Phone: ${formData.phone}`,
          `Email: ${formData.email}`,
          `Address: ${formData.address}`,
        ],
        style: "listItem",
        margin: [0, 0, 0, 15],
      } as Content,

      // --- Scammer/Beneficiary Details Section (conditionally rendered) ---
      // This section only appears if any beneficiary information is provided in the form.
      ...(formData.beneficiary.name ||
      formData.beneficiary.bank ||
      formData.beneficiary.account
        ? ([
            // Wrap conditional content in an array to satisfy PdfMake.Content definition.
            {
              text: "SCAMMER / BENEFICIARY DETAILS (IF KNOWN):",
              style: "sectionHeader",
              margin: [0, 10, 0, 10],
            } as Content,
            {
              ul: [
                // Unordered list for beneficiary details, filtering out empty strings.
                formData.beneficiary.name
                  ? `Name: ${formData.beneficiary.name}`
                  : "",
                formData.beneficiary.bank
                  ? `Bank: ${formData.beneficiary.bank}`
                  : "",
                formData.beneficiary.account
                  ? `Account No.: ${formData.beneficiary.account}`
                  : "",
              ].filter(Boolean), // `filter(Boolean)` removes any falsy values (like empty strings) from the array.
              style: "listItem",
              margin: [0, 0, 0, 15],
            } as Content,
          ] as Content[]) // Explicitly cast the array to Content[] to match the expected type.
        : []), // If no beneficiary info, this spread operator adds nothing to the content array.

      // --- Incident Description Section (uses the AI-generated police report draft) ---
      {
        text: "INCIDENT DESCRIPTION:",
        style: "sectionHeader",
        margin: [0, 10, 0, 10],
      } as Content,
      {
        text: policeReport,
        style: "bodyText",
        margin: [0, 0, 0, 30],
      } as Content,

      // --- Important Note section ---
      { text: "NOTE:", style: "noteHeader" } as Content,
      {
        text: "This document is a draft generated by ReclaimMe. It is intended to assist in preparing an official police report. Please review, verify, and present this to the appropriate law enforcement agency. Actual reporting procedures may vary.",
        style: "noteText",
      } as Content,
    ],

    // Stylesheet for the PDF document, defined using PdfMake.StyleDictionary for type safety.
    // These styles aim to match ReclaimMe's UI aesthetic for a consistent brand experience.
    styles: {
      headerTitle: {
        fontSize: 18,
        bold: true,
        color: "#2A3042", // Dark blue/charcoal, matching a sleek UI.
      },
      mainTitle: {
        fontSize: 24,
        bold: true,
        color: "#0D47A1", // ReclaimMe's primary blue.
        decoration: "underline", // Underline for emphasis, common in document titles.
      },
      reportId: {
        fontSize: 14,
        bold: true,
        color: "#555555", // Slightly lighter grey for report ID.
      },
      sectionHeader: {
        fontSize: 13,
        bold: true,
        color: "#0D47A1", // Primary blue for section headers.
        margin: [0, 10, 0, 5], // Top and bottom margin for clear spacing.
      },
      label: {
        fontSize: 11,
        bold: true,
        color: "#333333", // Darker text for labels (e.g., "DATE OF INCIDENT:").
      },
      value: {
        fontSize: 11,
        color: "#555555", // Standard text color for values.
      },
      listItem: {
        fontSize: 11,
        color: "#555555",
        margin: [0, 2], // Small vertical margin for list items, improving readability.
      },
      bodyText: {
        fontSize: 11,
        lineHeight: 1.3, // Line height for comfortable reading.
        color: "#444444", // Slightly darker for main content readability.
        alignment: "justify", // Justify main text for a professional document look.
      },
      noteHeader: {
        fontSize: 10,
        bold: true,
        color: "#777777", // Lighter grey for notes.
        margin: [0, 20, 0, 5], // Top margin to separate from main content.
      },
      noteText: {
        fontSize: 9,
        italics: true,
        color: "#777777",
      },
    } as StyleDictionary, // Cast the styles object to StyleDictionary.
    // Default page margins [left, top, right, bottom].
    pageMargins: [40, 80, 40, 40],
  };

  // Create the PDF and trigger its download.
  pdfMake
    .createPdf(docDefinition)
    .download(`Police_Report_RM-${reportId.toString().padStart(6, "0")}.pdf`);
};
