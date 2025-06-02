import { NextRequest, NextResponse } from "next/server";
import { complaintSchema } from "../_lib/validation-schemas"; // Ensure this path is correct
import { db } from "../_lib/drizzle"; // Ensure this path is correct
import { complaints, users } from "../_lib/drizzle/schema"; // Ensure this path is correct
import { verifyToken } from "../_lib/auth"; // To get authenticated user
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  let userId: number | undefined = undefined;

  // Attempt to identify user via token
  const token = request.cookies.get("token")?.value;
  if (token) {
    try {
      const payload = await verifyToken(token); //
      if (payload && payload.email) {
        const foundUser = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, payload.email))
          .limit(1);
        if (foundUser.length > 0) {
          userId = foundUser[0].id;
        }
      }
    } catch (e) {
      // Token verification failed or token is invalid, proceed anonymously
      console.warn(
        "Token verification failed during complaint submission (user might be anonymous):",
        e
      );
    }
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Invalid JSON payload. Please ensure the request body is valid JSON.",
      },
      { status: 400 }
    );
  }

  const validationResult = complaintSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: "Invalid complaint data provided.",
        errors: validationResult.error.flatten().fieldErrors,
      },
      {
        status: 400,
      }
    );
  }

  const complaintData = validationResult.data;

  try {
    // Prepare data for insertion, converting dateTime string to a Date object
    const newComplaintData = {
      ...complaintData,
      dateTime: new Date(complaintData.dateTime), //
      userId: userId, // Will be undefined if user is not logged in, which is fine as userId is nullable
      // Ensure scammerInfo is correctly handled (null if not provided)
      scammerInfo: complaintData.scammerInfo || null, //
    };

    // Drizzle's insert().values() expects an object or an array of objects.
    // It returns an array of inserted rows by default for PostgreSQL.
    const insertedComplaint = await db
      .insert(complaints)
      .values(newComplaintData)
      .returning();

    return NextResponse.json(
      {
        message: "Complaint submitted successfully!",
        // Return the first inserted complaint data (Drizzle returns an array)
        data: insertedComplaint[0],
      },
      { status: 201 } // 201 Created status
    );
  } catch (error) {
    console.error("Error submitting complaint to database:", error);
    return NextResponse.json(
      {
        message:
          "A server error occurred while submitting your complaint. Please try again later.",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}
