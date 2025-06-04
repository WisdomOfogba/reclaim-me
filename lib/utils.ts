import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Document } from "@/components/complain-letter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const broadcastChannel = new BroadcastChannel("reclaimMe");

export const complaints = [
  {
    id: "CMPT-2024-001",
    type: "Financial Fraud",
    status: "Under Review",
    date: "2024-01-15",
    priority: "High",
    description: "Unauthorized charges on credit card from unknown merchant",
    lastUpdate: "2024-01-16",
    amount: "$2,450.00",
    location: "Online Transaction",
    assignedAgent: "Agent Sarah Johnson",
    timeline: [
      { date: "2024-01-15", action: "Report submitted", status: "Submitted" },
      {
        date: "2024-01-16",
        action: "Initial review completed",
        status: "Under Review",
      },
      {
        date: "2024-01-16",
        action: "Assigned to investigation team",
        status: "Under Review",
      },
    ],
    evidence: ["Credit card statements", "Email receipts", "Screenshots"],
    notes:
      "Case has been escalated to the financial crimes unit. Investigation is ongoing with the merchant's bank.",
  },
  {
    id: "CMPT-2024-002",
    type: "Identity Theft",
    status: "Investigating",
    date: "2024-01-14",
    priority: "Medium",
    description: "Someone opened accounts using my personal information",
    lastUpdate: "2024-01-15",
    amount: "Unknown",
    location: "Multiple locations",
    assignedAgent: "Agent Michael Chen",
    timeline: [
      { date: "2024-01-14", action: "Report submitted", status: "Submitted" },
      {
        date: "2024-01-14",
        action: "Identity verification completed",
        status: "Verified",
      },
      {
        date: "2024-01-15",
        action: "Investigation started",
        status: "Investigating",
      },
    ],
    evidence: ["Driver's license copy", "Credit reports", "Bank statements"],
    notes:
      "Working with credit bureaus to freeze accounts. Suspect information being gathered.",
  },
  {
    id: "CMPT-2024-003",
    type: "Online Scam",
    status: "Resolved",
    date: "2024-01-13",
    priority: "Low",
    description: "Fake online store took payment but never delivered goods",
    lastUpdate: "2024-01-14",
    amount: "$89.99",
    location: "www.fakeshop.com",
    assignedAgent: "Agent Lisa Rodriguez",
    timeline: [
      { date: "2024-01-13", action: "Report submitted", status: "Submitted" },
      {
        date: "2024-01-13",
        action: "Website investigated",
        status: "Investigating",
      },
      {
        date: "2024-01-14",
        action: "Merchant contacted",
        status: "Investigating",
      },
      { date: "2024-01-14", action: "Refund processed", status: "Resolved" },
    ],
    evidence: [
      "Payment confirmation",
      "Website screenshots",
      "Email correspondence",
    ],
    notes:
      "Full refund obtained from payment processor. Website has been reported to hosting provider.",
  },
  {
    id: "CMPT-2024-004",
    type: "Investment Fraud",
    status: "Under Review",
    date: "2024-01-12",
    priority: "High",
    description: "Ponzi scheme investment platform disappeared with funds",
    lastUpdate: "2024-01-13",
    amount: "$15,000.00",
    location: "InvestSafe Platform",
    assignedAgent: "Agent David Kim",
    timeline: [
      { date: "2024-01-12", action: "Report submitted", status: "Submitted" },
      {
        date: "2024-01-12",
        action: "High priority case flagged",
        status: "Under Review",
      },
      {
        date: "2024-01-13",
        action: "Financial analysis started",
        status: "Under Review",
      },
    ],
    evidence: [
      "Investment contracts",
      "Bank transfers",
      "Platform screenshots",
      "Communication logs",
    ],
    notes:
      "Part of larger investigation into investment fraud ring. Multiple victims identified.",
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Under Review":
      return "bg-yellow-100 text-yellow-800";
    case "Investigating":
      return "bg-blue-100 text-blue-800";
    case "Resolved":
      return "bg-green-100 text-green-800";
    case "Closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: "1",
    type: "police-report",
    title: "Police Report",
    content: `POLICE REPORT

Date: December 1, 2024
Case Number: PR-2024-001234
Reporting Officer: Officer Johnson

INCIDENT DETAILS:
Location: 123 Main Street, Downtown District
Date/Time of Incident: November 30, 2024, 3:45 PM
Type of Incident: Vehicle Theft

DESCRIPTION:
On November 30, 2024, at approximately 3:45 PM, the complainant reported that their vehicle, a 2020 Honda Civic (License Plate: ABC-1234), was stolen from the parking lot at 123 Main Street. The vehicle was parked and locked at approximately 2:00 PM when the complainant entered the nearby shopping center. Upon returning at 3:45 PM, the vehicle was no longer in the parking space.

PARTIES INVOLVED:
Complainant: John Smith, 456 Oak Avenue, Phone: (555) 123-4567
Witness(es): Mary Johnson (saw suspicious individual near vehicle), Phone: (555) 987-6543
Suspect(s): Unknown at this time

EVIDENCE:
- Security camera footage from parking lot (requested)
- Photographs of the parking space
- Vehicle registration and insurance documents

OFFICER NOTES:
Area canvassed for additional witnesses. Security footage has been requested from the shopping center management. BOLO alert issued for the stolen vehicle. Case assigned to Detective Williams for follow-up investigation.

Report Filed By: Officer Johnson, Badge #4567
Signature: ________________________
Date: December 1, 2024`,
    createdAt: new Date("2024-12-01T10:30:00"),
  },
  {
    id: "2",
    type: "bank-message",
    title: "Message to Bank",
    content: `Dear First National Bank Customer Service,

Subject: Dispute of Unauthorized Transaction

Account Holder: Sarah Williams
Account Number: ****-****-****-5678
Date: December 1, 2024

Dear Sir/Madam,

I am writing to formally dispute an unauthorized transaction that appeared on my account statement dated November 28, 2024.

On November 28, 2024, I noticed a charge of $299.99 to "UNKNOWN MERCHANT LLC" that I did not authorize. I have never conducted business with this merchant, and I was not in possession of my card at the time of this transaction as it was securely in my wallet at home. I immediately checked my card and confirmed it was still in my possession and had not been compromised.

I have attached the following supporting documents:
- Copy of account statement highlighting the disputed transaction
- Copy of my identification
- Timeline of my activities on November 28, 2024

I am requesting that this charge be reversed immediately and that you investigate this unauthorized transaction. I have already changed my online banking password as a precautionary measure and am requesting a new debit card.

I would appreciate your prompt attention to this matter and look forward to your response within 10 business days. Please contact me at (555) 234-5678 or sarah.williams@email.com if you need any additional information.

Thank you for your time and assistance.

Sincerely,

Sarah Williams
789 Pine Street, Apt 4B
Cityville, ST 12345
Phone: (555) 234-5678
Email: sarah.williams@email.com`,
    createdAt: new Date("2024-11-30T14:15:00"),
  },
];

export const noop = () => {};

export function downloadPDF(pdfLink: string | null, name: string) {
  if (pdfLink) {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = name;
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer"; // Security best practice
    link.click();
  }
}
