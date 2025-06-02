// app/api/reports/route.ts

import { NextResponse } from "next/server";
import { eq, desc, sql } from "drizzle-orm";
import { z } from "zod";
import { complaints, users } from "../_lib/drizzle/schema";
import { db } from "../_lib/drizzle";

// Zod schema for validating incoming new complaint data
const createComplaintSchema = z.object({
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

// THIS IS THE HANDLER THAT WAS LIKELY MISSING OR INCORRECT, CAUSING THE 405 ERROR
export async function POST(request: Request) {
  console.log("POST /api/reports hit!"); // Add this for debugging
  try {
    const body = await request.json();
    console.log("Request body received:", body); // Debugging

    const validation = createComplaintSchema.safeParse(body);

    if (!validation.success) {
      console.error("Zod validation failed:", validation.error.flatten()); // Debugging
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const {
      incidentDate,
      aiConsolingMessage,
      aiPoliceReportDraft,
      aiBankComplaintEmail,
      aiNextStepsChecklist,
      ...restOfData
    } = validation.data;

    if (restOfData.userId) {
      const userExists = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, restOfData.userId))
        .limit(1);
      if (userExists.length === 0) {
        console.warn(`User not found for userId: ${restOfData.userId}`); // Debugging
        return NextResponse.json(
          { error: `User with ID ${restOfData.userId} not found` },
          { status: 404 }
        );
      }
    }

    const newComplaintData = {
      ...restOfData,
      incidentDate: incidentDate, // Storing as string, as schema is timestamp(mode: 'string')
      aiConsolingMessage: aiConsolingMessage,
      aiPoliceReportDraft: aiPoliceReportDraft,
      aiBankComplaintEmail: aiBankComplaintEmail,
      aiNextStepsChecklist: aiNextStepsChecklist,
      // createdAt and updatedAt will use database defaults or Drizzle's defaultNow()
      // status will use Zod default if not provided
    };

    console.log("Inserting new complaint data:", newComplaintData); // Debugging
    const result = await db
      .insert(complaints)
      .values(newComplaintData)
      .returning();

    if (result.length === 0) {
      console.error("DB insert returned empty result."); // Debugging
      return NextResponse.json(
        { error: "Failed to create complaint record in database" },
        { status: 500 }
      );
    }

    console.log("Complaint created successfully:", result[0]); // Debugging
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/reports:", error); // Log the full error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input data provided (Zod catch)",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "Failed to create complaint",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  console.log("GET /api/reports hit!"); // Debugging
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limitPerPage = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limitPerPage;

    const allComplaints = await db
      .select()
      .from(complaints)
      .orderBy(desc(complaints.createdAt))
      .limit(limitPerPage)
      .offset(offset);

    const totalComplaintsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(complaints);
    const totalCount = totalComplaintsResult[0]?.count || 0;

    return NextResponse.json(
      {
        data: allComplaints,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limitPerPage),
          totalItems: totalCount,
          itemsPerPage: limitPerPage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching complaints in GET /api/reports:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch complaints",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
