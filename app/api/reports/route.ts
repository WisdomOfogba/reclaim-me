// app/api/reports/route.ts

import { NextRequest, NextResponse } from "next/server";
import { eq, desc, sql, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { complaints, users } from "../_lib/drizzle/schema";
import { db } from "../_lib/drizzle";
import { verifyToken } from "../_lib/auth";
import { createComplaintSchema } from "../_lib/validation-schemas";
import { prettifyError } from "zod/v4-mini";
// import { ApiReport } from "@/lib/types";

// Zod schema for validating incoming new complaint data

async function getUserIdFromAuthToken(
  request: NextRequest
): Promise<number | null> {
  // Example: If you are using a JWT stored in a cookie named 'token'
  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) {
    return null;
  }
  const tokenValue = tokenCookie.value;
  const payload = await verifyToken(tokenValue);
  // console.log("Decoded JWT payload:", payload);
  try {
    // Assuming verifyTokenAndGetUserId returns the user ID (e.g., an integer if your user IDs are integers)
    // You'll need to replace this with your actual token verification logic
    // This function should throw an error or return null if token is invalid

    // Ensure payload is not null and has userId. Adjust 'userId' key if different in your token payload.
    if (payload && typeof payload.id === "number") {
      return payload.id;
    }
    if (payload && typeof payload.id === "string") {
      // If your userId in token is string but in DB is number
      const parsedUserId = parseInt(payload.id, 10);
      if (!isNaN(parsedUserId)) return parsedUserId;
    }
    return null;
  } catch {
    // console.error("Token verification failed:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  // console.log("POST /api/reports hit!");
  const userId = await getUserIdFromAuthToken(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. User ID could not be determined." },
      { status: 401 }
    );
  }
  try {
    const body = await request.json();

    const validation = createComplaintSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: prettifyError(validation.error) },
        { status: 400 }
      );
    }

    const {
      incidentDate,
      aiConsolingMessage,
      aiPoliceReportDraft,
      aiBankComplaintEmail,

      aiNextStepsChecklist,
      amountLost, // Destructure amountLost separately
      ...restOfData
    } = validation.data;

    // User existence check (if userId is provided) can remain here
    if (userId) {
      const userExists = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      if (userExists.length === 0) {
        // console.warn(`User not found for userId: ${userId}`);
        return NextResponse.json(
          { error: `User with ID ${userId} not found` },
          { status: 404 }
        );
      }
    }
    // console.log(restOfData);

    const newComplaintData: typeof complaints._.inferInsert = {
      ...restOfData,
      userId,
      incidentDate: incidentDate, // Storing as string, as schema is timestamp(mode: 'string')
      aiConsolingMessage: aiConsolingMessage,
      aiPoliceReportDraft: aiPoliceReportDraft,
      aiBankComplaintEmail: aiBankComplaintEmail,
      aiNextStepsChecklist: aiNextStepsChecklist,
      // **FIX APPLIED HERE:**
      // Convert amountLost to string if it's a number, otherwise pass null/undefined
      amountLost:
        typeof amountLost === "number" ? amountLost.toString() : amountLost,
    };

    // console.log(
    //   "Inserting new complaint data (with amountLost as string if applicable):",
    //   newComplaintData
    // );
    const result = await db
      .insert(complaints)
      .values(newComplaintData)
      .returning();

    if (result.length === 0) {
      // console.error("DB insert returned empty result.");
      return NextResponse.json(
        { error: "Failed to create complaint record in database" },
        { status: 500 }
      );
    }

    // console.log("Complaint created successfully:", result[0]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    // console.error("Error in POST /api/reports:", error);
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

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromAuthToken(request);
  // console.log("GET /api/reports hit!"); // Debugging
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limitPerPage = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limitPerPage;

    // let s: ApiReport = {};
    const { id, scamType, status, incidentDate, createdAt, pdfLink } =
      getTableColumns(complaints);

    const allComplaints = await db
      .select({
        id,
        scamType,
        status,
        incidentDate,
        createdAt,
        pdfLink,
      })
      .from(complaints)
      .where(
        userId ? eq(complaints.userId, userId) : undefined // Filter by userId if available
      )
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
