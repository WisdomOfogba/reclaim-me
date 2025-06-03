import {
  TDocumentDefinitions,
  Content,
  Column,
  StyleDictionary,
} from "pdfmake/interfaces";

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
  // Dynamic imports for client-side only
  const pdfMake = await import("pdfmake/build/pdfmake");
  const pdfFonts = await import("pdfmake/build/vfs_fonts");

  // ✅ Assign fonts and vfs correctly
  (pdfMake as any).vfs = pdfFonts.default; // 👈 Correct assignment
  (pdfMake as any).fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
  };

  // Image loader helper
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

  // Build document definition
  const docDefinition: TDocumentDefinitions = {
    header: {
      columns: [
        ...(logoBase64
          ? [
              {
                image: logoBase64,
                width: 50,
                height: 50,
                margin: [40, 10, 0, 0],
                alignment: "left",
              } as Column,
            ]
          : []),
        {
          text: "ReclaimMe Police Report",
          style: "headerTitle",
          alignment: "right",
          margin: [0, 20, 40, 0],
        } as Column,
      ],
      columnGap: 10,
    },

    content: [
      {
        text: "OFFICIAL POLICE REPORT DRAFT",
        style: "mainTitle",
        alignment: "center",
        margin: [0, 80, 0, 20],
      } as Content,

      {
        text: `Report ID: RM-${reportId.toString().padStart(6, "0")}`,
        style: "reportId",
        alignment: "center",
        margin: [0, 0, 0, 20],
      } as Content,

      {
        text: "INCIDENT DETAILS:",
        style: "sectionHeader",
        margin: [0, 10, 0, 10],
      } as Content,
      {
        columns: [
          { text: "Date of Incident:", width: "auto", style: "label" },
          {
            text: new Date(formData.dateTime).toLocaleString(),
            width: "*",
            style: "value",
          },
        ],
        margin: [0, 5, 0, 5],
      } as Content,
      {
        columns: [
          { text: "Type of Scam:", width: "auto", style: "label" },
          { text: formData.scamType, width: "*", style: "value" },
        ],
        margin: [0, 5, 0, 5],
      } as Content,
      {
        columns: [
          { text: "Amount Lost:", width: "auto", style: "label" },
          {
            text: formData.amount
              ? `${formData.currency} ${parseFloat(formData.amount).toLocaleString()}`
              : "N/A",
            width: "*",
            style: "value",
          },
        ],
        margin: [0, 5, 0, 5],
      } as Content,
      {
        columns: [
          { text: "Payment Method:", width: "auto", style: "label" },
          { text: formData.paymentMethod || "N/A", width: "*", style: "value" },
        ],
        margin: [0, 5, 0, 15],
      } as Content,

      {
        text: "COMPLAINANT DETAILS:",
        style: "sectionHeader",
        margin: [0, 10, 0, 10],
      } as Content,
      {
        ul: [
          `Name: ${formData.name}`,
          `Phone: ${formData.phone}`,
          `Email: ${formData.email}`,
          `Address: ${formData.address}`,
        ],
        style: "listItem",
        margin: [0, 0, 0, 15],
      } as Content,

      ...(formData.beneficiary.name ||
      formData.beneficiary.bank ||
      formData.beneficiary.account
        ? [
            {
              text: "SCAMMER / BENEFICIARY DETAILS (IF KNOWN):",
              style: "sectionHeader",
              margin: [0, 10, 0, 10],
            } as Content,
            {
              ul: [
                formData.beneficiary.name
                  ? `Name: ${formData.beneficiary.name}`
                  : "",
                formData.beneficiary.bank
                  ? `Bank: ${formData.beneficiary.bank}`
                  : "",
                formData.beneficiary.account
                  ? `Account No.: ${formData.beneficiary.account}`
                  : "",
              ].filter(Boolean),
              style: "listItem",
              margin: [0, 0, 0, 15],
            } as Content,
          ]
        : []),

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

      { text: "NOTE:", style: "noteHeader" } as Content,
      {
        text: "This document is a draft generated by ReclaimMe. It is intended to assist in preparing an official police report. Please review, verify, and present this to the appropriate law enforcement agency. Actual reporting procedures may vary.",
        style: "noteText",
      } as Content,
    ],

    styles: {
      headerTitle: {
        fontSize: 18,
        bold: true,
        color: "#2A3042",
      },
      mainTitle: {
        fontSize: 24,
        bold: true,
        color: "#0D47A1",
        decoration: "underline",
      },
      reportId: {
        fontSize: 14,
        bold: true,
        color: "#555555",
      },
      sectionHeader: {
        fontSize: 13,
        bold: true,
        color: "#0D47A1",
      },
      label: {
        fontSize: 11,
        bold: true,
        color: "#333333",
      },
      value: {
        fontSize: 11,
        color: "#555555",
      },
      listItem: {
        fontSize: 11,
        color: "#555555",
        margin: [0, 2],
      },
      bodyText: {
        fontSize: 11,
        lineHeight: 1.3,
        color: "#444444",
        alignment: "justify",
      },
      noteHeader: {
        fontSize: 10,
        bold: true,
        color: "#777777",
        margin: [0, 20, 0, 5],
      },
      noteText: {
        fontSize: 9,
        italics: true,
        color: "#777777",
      },
    } as StyleDictionary,

    pageMargins: [40, 80, 40, 40],
  };

  // Generate and download the PDF
  pdfMake
    .createPdf(docDefinition)
    .download(`Police_Report_RM-${reportId.toString().padStart(6, "0")}.pdf`);
};
