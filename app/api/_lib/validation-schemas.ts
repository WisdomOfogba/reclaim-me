import * as z from "zod"; // Make sure to import the full zod, not v4-mini for .email(), .datetime(), etc. or adjust features.

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
