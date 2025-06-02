// app/api/dashboard-stats/route.ts

import { NextResponse } from "next/server";
import { count, countDistinct, eq } from "drizzle-orm";
import { db } from "../_lib/drizzle";
import { complaints } from "../_lib/drizzle/schema";

export async function GET() {
  try {
    // 1. Total Reports
    const totalReportsResult = await db
      .select({ value: count() })
      .from(complaints);
    const totalReports = totalReportsResult[0]?.value || 0;

    // 2. Under Investigation Reports
    // This assumes you have a 'status' field in your 'complaints' table
    // Possible values: 'Under Review', 'Investigating', 'Resolved', etc.
    const underInvestigationResult = await db
      .select({ value: count() })
      .from(complaints)
      .where(eq(complaints.status, "Investigating")); // Adjust 'Investigating' if your status value is different
    const underInvestigation = underInvestigationResult[0]?.value || 0;

    // 3. Resolved Cases
    const resolvedCasesResult = await db
      .select({ value: count() })
      .from(complaints)
      .where(eq(complaints.status, "Resolved")); // Adjust 'Resolved' if your status value is different
    const resolvedCases = resolvedCasesResult[0]?.value || 0;

    // 4. Active Users (interpreted as unique users who have filed complaints)
    // This requires complaints to have a userId linking to the users table.
    let activeUsers = 0;
    if (complaints.userId) {
      // Check if userId field exists on complaints schema before querying
      const activeUsersResult = await db
        .select({ value: countDistinct(complaints.userId) })
        .from(complaints)
        .where(eq(complaints.status, "Resolved")); // where userId is not null
      activeUsers = activeUsersResult[0]?.value || 0;
    }

    const formattedStats = {
      totalReports,
      underInvestigation,
      resolvedCases,
      activeUsers,
      // The 'change' percentages (e.g., "+12%") are not calculated here
      // as they require historical data or more complex logic.
    };

    return NextResponse.json(formattedStats, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    if (error instanceof Error) {
      // More specific error logging if needed
      console.error(error.message);
    }
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics." },
      { status: 500 }
    );
  }
}
