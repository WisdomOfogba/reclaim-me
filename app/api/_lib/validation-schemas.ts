// import { NextRequest, NextResponse } from "next/server";
//  // Make sure to import the full d, not v4-mini for .email(), .datetime(), etc. or adjust features.
import {
  boolean,
  email,
  enum as enum_,
  _default,
  maxLength,
  minLength,
  nonnegative,
  nullable,
  number,
  object,
  optional,
  refine,
  string,
  int,
  positive,
} from "zod/v4-mini";
// import { verifyToken } from "./auth";

export const loginSchema = object({
  email: string().check(email()),
  password: string(),
});

export const signupSchema = object({
  firstName: string().check(minLength(1)),
  lastName: string().check(minLength(1)),
  email: string().check(email()),
  password: string(),
  isNotifEnabled: boolean(),
});

export const emailResetSchema = object({
  email: string().check(email()),
});

// Add this new schema:
export const complaintSchema = object({
  name: string().check(maxLength(200)),
  phone: string().check(maxLength(20)),
  email: string().check(email()).check(maxLength(100)),
  address: string().check(maxLength(255)),
  scamType: optional(string().check(maxLength(100))), // Changed 'type' to 'scamType' to match frontend form and likely intent
  dateTime: string().check(
    refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date and time string",
    })
  ), // Expecting an ISO string or similar parseable by new Date()
  description: string(),
  amount: optional(number()),
  currency: optional(string().check(maxLength(5))),
  paymentMethod: optional(string().check(maxLength(100))),
  scammerInfo: optional(
    object({
      name: optional(string().check(maxLength(200))),
      bank: optional(string().check(maxLength(100))),
      account: optional(string().check(maxLength(50))),
    })
  ),
  // userId is handled by the backend, not typically part of the incoming payload validation from client
});

export const createComplaintSchema = object({
  name: string().check(minLength(1, "Full name is required")),
  phone: string()
    .check(minLength(1, "Phone number is required"))
    .check(maxLength(20)),
  email: string().check(email("Invalid email address")).check(maxLength(100)),
  address: string()
    .check(minLength(1, "Address is required"))
    .check(maxLength(255)),
  scamType: string()
    .check(minLength(1, "Scam type is required"))
    .check(maxLength(100)),
  incidentDate: string().check(
    refine((date) => !isNaN(new Date(date).getTime()), {
      message:
        "Invalid date format for incident date. Expected ISO-like string.",
    })
  ),
  description: string().check(minLength(1, "Description is required")),
  amountLost: nullable(
    optional(number().check(nonnegative("Amount lost must be non-negative")))
  ),
  currency: nullable(optional(string().check(maxLength(5)))),
  paymentMethod: nullable(optional(string().check(maxLength(100)))),
  scammerInfo: nullable(
    optional(
      object({
        name: optional(string().check(maxLength(200))),
        bank: optional(string().check(maxLength(100))),
        account: optional(string().check(maxLength(50))),
      })
    )
  ),
  aiConsolingMessage: nullable(optional(string())),
  aiPoliceReportDraft: nullable(optional(string())),
  aiBankComplaintEmail: nullable(optional(string())),
  aiNextStepsChecklist: nullable(optional(string())),
  status: _default(
    optional(
      enum_([
        "Under Review",
        "Investigating",
        "Resolved",
        "Closed",
        "Pending AI Generation",
        "AI Processing Failed",
      ])
    ),
    "Under Review"
  ),
  userId: nullable(
    optional(
      number().check(int(), positive("User ID must be a positive integer"))
    )
  ),
});
