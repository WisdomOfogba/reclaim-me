// import { NextRequest, NextResponse } from "next/server";
import * as z from "zod"; // Make sure to import the full zod, not v4-mini for .email(), .datetime(), etc. or adjust features.
// import { verifyToken } from "./auth";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  isNotifEnabled: z.boolean(),
});

export const emailResetSchema = z.object({
  email: z.string().email(),
});

// Add this new schema:
export const complaintSchema = z.object({
  name: z.string().max(200).optional(),
  phone: z.string().max(20),
  email: z.string().email().max(100),
  address: z.string().max(255),
  scamType: z.string().max(100).optional(), // Changed 'type' to 'scamType' to match frontend form and likely intent
  dateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date and time string",
  }), // Expecting an ISO string or similar parseable by new Date()
  description: z.string(),
  amount: z.number().optional(),
  currency: z.string().max(5).optional(),
  paymentMethod: z.string().max(100).optional(),
  scammerInfo: z
    .object({
      name: z.string().optional(), // Assuming these can be optional if the scammer info is partially known
      bank: z.string().optional(),
      account: z.string().optional(),
    })
    .optional(),
  // userId is handled by the backend, not typically part of the incoming payload validation from client
});

export const createComplaintSchema = z.object({
  name: z.string().min(1, "Full name is required").max(200),
  phone: z.string().min(1, "Phone number is required").max(20),
  email: z.string().email("Invalid email address").max(100),
  address: z.string().min(1, "Address is required").max(255),
  scamType: z.string().min(1, "Scam type is required").max(100),
  incidentDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid date format for incident date. Expected ISO-like string.",
  }),
  description: z.string().min(1, "Description is required"),
  amountLost: z
    .number()
    .nonnegative("Amount lost must be non-negative")
    .optional()
    .nullable(),
  currency: z.string().max(5).optional().nullable(),
  paymentMethod: z.string().max(100).optional().nullable(),
  scammerInfo: z
    .object({
      name: z.string().max(200).optional().nullable(),
      bank: z.string().max(100).optional().nullable(),
      account: z.string().max(50).optional().nullable(),
    })
    .optional()
    .nullable(),
  aiConsolingMessage: z.string().optional().nullable(),
  aiPoliceReportDraft: z.string().optional().nullable(),
  aiBankComplaintEmail: z.string().optional().nullable(),
  aiNextStepsChecklist: z.string().optional().nullable(),
  status: z
    .enum([
      "Under Review",
      "Investigating",
      "Resolved",
      "Closed",
      "Pending AI Generation",
      "AI Processing Failed",
    ])
    .default("Under Review")
    .optional(),
  userId: z
    .number()
    .int()
    .positive("User ID must be a positive integer")
    .optional()
    .nullable(),
});
