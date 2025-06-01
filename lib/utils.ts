import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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