// app/api/dashboard-stats/route.ts

import { NextRequest, NextResponse } from "next/server";
import { count, eq } from "drizzle-orm";
import { db } from "../_lib/drizzle";
import { complaints } from "../_lib/drizzle/schema"; // Assuming users schema might be needed for auth or is defined
import { verifyToken } from "../_lib/auth";
// import { verifyTokenAndGetUserId } from "../_lib/auth"; // You'll need to implement or import this

// Placeholder for your actual auth token verification and userId extraction logic
// This function would typically:
// 1. Get the token from the request (e.g., cookies or Authorization header)
// 2. Verify the token
// 3. Return the userId from the token's payload
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
  console.log("Decoded JWT payload:", payload);
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
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromAuthToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. User ID could not be determined." },
        { status: 401 }
      );
    }

    // 1. Total Reports for the specific user
    const totalReportsResult = await db
      .select({ value: count() })
      .from(complaints)
      .where(eq(complaints.userId, userId)); // Filter by the authenticated user's ID

    const totalReports = totalReportsResult[0]?.value || 0;

    // The response will now only contain the total reports for this user.
    const formattedStats = {
      totalReports,
    };

    return NextResponse.json(formattedStats, { status: 200 });
  } catch (error) {
    console.error("Error fetching user-specific dashboard statistics:", error);
    // It's good practice to avoid sending detailed error messages to the client in production.
    // Log them on the server and send a generic error message.
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics." },
      { status: 500 }
    );
  }
}
