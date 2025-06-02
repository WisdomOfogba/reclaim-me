// app/api/reports/[id]/route.ts

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { complaints } from "../../_lib/drizzle/schema";
import { db } from "../../_lib/drizzle";

// Zod schema for validating update data (all fields optional)
const updateComplaintSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  phone: z.string().min(1).max(20).optional(),
  email: z.string().email().max(100).optional(),
  address: z.string().min(1).max(255).optional(),
  scamType: z.string().min(1).max(100).optional(),
  incidentDate: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid date format for incident date",
    })
    .optional(),
  description: z.string().min(1).optional(),
  amountLost: z.number().nonnegative().optional().nullable(),
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
  status: z
    .enum(["Under Review", "Investigating", "Resolved", "Closed"])
    .optional(),
  // userId should generally not be updatable for an existing complaint,
  // but can be included if your use case requires it.
});

interface RouteParams {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const complaintId = parseInt(params.id);
    if (isNaN(complaintId)) {
      return NextResponse.json(
        { error: "Invalid report ID format" },
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
    if (isNaN(complaintId)) {
      return NextResponse.json(
        { error: "Invalid report ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validation = updateComplaintSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { incidentDate, ...restOfUpdateData } = validation.data;

    const updateData: Partial<typeof complaints.$inferInsert> = {
      ...restOfUpdateData,
    };
    if (incidentDate) {
      updateData.incidentDate = new Date(incidentDate);
    }
    updateData.updatedAt = new Date(); // Explicitly set updatedAt

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No update data provided" },
        { status: 400 }
      );
    }

    const updatedReport = await db
      .update(complaints)
      .set(updateData)
      .where(eq(complaints.id, complaintId))
      .returning();

    if (updatedReport.length === 0) {
      return NextResponse.json(
        { error: "Report not found or no changes made" },
        { status: 404 }
      );
    }

    // If status changes, you might want to update specific dashboard counters
    // (e.g., decrement 'Under Investigation', increment 'Resolved') if using the reportStatistics table.
    // This logic would be more complex and depends on how you manage those specific stats.

    return NextResponse.json(updatedReport[0], { status: 200 });
  } catch (error) {
    console.error(`Error updating report ${params.id}:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update report", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// PATCH can be similar to PUT if you allow partial updates with PUT.
// If you want PATCH to strictly only update provided fields and PUT to replace,
// the logic would differ slightly, but Drizzle's .set() effectively does a patch.
export async function PATCH(
  request: Request,
  { params }: { params: RouteParams }
) {
  return PUT(request, { params }); // Reusing PUT logic for PATCH as .set() handles partial updates
}

export async function DELETE(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const complaintId = parseInt(params.id);
    if (isNaN(complaintId)) {
      return NextResponse.json(
        { error: "Invalid report ID format" },
        { status: 400 }
      );
    }

    const deletedReport = await db
      .delete(complaints)
      .where(eq(complaints.id, complaintId))
      .returning({ id: complaints.id }); // Return the ID of the deleted item

    if (deletedReport.length === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // After deleting, dashboard stats (like total reports) will update on next fetch.
    // If you had specific counters for statuses, you might adjust them here.

    return NextResponse.json(
      { message: `Report ${complaintId} deleted successfully` },
      { status: 200 }
    );
    // Alternatively, return 204 No Content:
    // return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting report ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete report", details: (error as Error).message },
      { status: 500 }
    );
  }
}
