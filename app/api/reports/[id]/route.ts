// app/api/reports/[id]/route.ts

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { complaints } from "../../_lib/drizzle/schema"; // Adjust path if needed
import { db } from "../../_lib/drizzle"; // Adjust path if needed

// Zod schema for validating update data (all fields optional)
const updateComplaintSchema = z.object({
  name: z.string().min(1, "Full name is required").max(200).optional(),
  phone: z.string().min(1, "Phone number is required").max(20).optional(),
  email: z.string().email("Invalid email address").max(100).optional(),
  address: z.string().min(1, "Address is required").max(255).optional(),
  scamType: z.string().min(1, "Scam type is required").max(100).optional(),
  incidentDate: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message:
        "Invalid date format for incident date. Expected ISO-like string.",
    })
    .optional(),
  description: z.string().min(1, "Description is required").optional(),
  amountLost: z // Stays as number in Zod schema for input validation
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
    .optional(),
});

interface RouteParams {
  id: string;
}

// ... (GET, DELETE, PATCH handlers from your provided code, they are generally fine)
// Only showing the updated PUT handler here for brevity.
// Ensure the GET, PATCH, and DELETE functions are also present in your actual file.

export async function GET(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const complaintId = parseInt(params.id);
    if (isNaN(complaintId) || complaintId <= 0) {
      return NextResponse.json(
        { error: "Invalid report ID format. Must be a positive integer." },
        { status: 400 }
      );
    }

    const report = await db
      .select()
      .from(complaints)
      .where(eq(complaints.id, complaintId))
      .limit(1);

    if (report.length === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report[0], { status: 200 });
  } catch (error) {
    console.error(`Error fetching report ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch report", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const complaintId = parseInt(params.id);
    if (isNaN(complaintId) || complaintId <= 0) {
      return NextResponse.json(
        { error: "Invalid report ID format. Must be a positive integer." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validation = updateComplaintSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input for update",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Check if there's any actual data to update besides what might be automatically handled (like updatedAt)
    if (Object.keys(validation.data).length === 0) {
      return NextResponse.json(
        { error: "No update data provided" },
        { status: 400 }
      );
    }

    const { incidentDate, amountLost, ...restOfUpdateData } = validation.data;

    const updateData: Partial<typeof complaints.$inferInsert> = {
      ...restOfUpdateData,
    };

    if (incidentDate !== undefined) {
      // Check if incidentDate was actually provided in the payload
      updateData.incidentDate = incidentDate; // Drizzle's timestamp(mode: 'string') handles this
    }

    // **FIX APPLIED HERE for amountLost:**
    if (typeof amountLost === "number") {
      updateData.amountLost = amountLost.toString();
    } else if (amountLost === null) {
      // If payload explicitly sends null for amountLost
      updateData.amountLost = null;
    }

    // If amountLost is undefined (not in payload), it won't be in updateData, so it won't be updated.

    updateData.updatedAt = new Date(); // This will always make the record "dirty"

    const updatedReport = await db
      .update(complaints)
      .set(updateData)
      .where(eq(complaints.id, complaintId))
      .returning();

    if (updatedReport.length === 0) {
      // This path means the WHERE clause (eq(complaints.id, complaintId)) did not find a matching row.
      // The .returning() clause only returns data if rows were affected by the update.
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(updatedReport[0], { status: 200 });
  } catch (error) {
    console.error(`Error updating report ${params.id}:`, error);
    if (error instanceof z.ZodError) {
      // Should be caught by safeParse, but as a fallback
      return NextResponse.json(
        { error: "Invalid input data (Zod catch)", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update report", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: RouteParams }
) {
  // Reusing PUT logic as Drizzle's .set() method performs partial updates
  // by only including fields present in the `updateData` object.
  return PUT(request, { params });
}

export async function DELETE(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const complaintId = parseInt(params.id);
    if (isNaN(complaintId) || complaintId <= 0) {
      return NextResponse.json(
        { error: "Invalid report ID format. Must be a positive integer." },
        { status: 400 }
      );
    }

    const deletedReport = await db
      .delete(complaints)
      .where(eq(complaints.id, complaintId))
      .returning({ id: complaints.id });

    if (deletedReport.length === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Report with ID ${complaintId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting report ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete report", details: (error as Error).message },
      { status: 500 }
    );
  }
}
