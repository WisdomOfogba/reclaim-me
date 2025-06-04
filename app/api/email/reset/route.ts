import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4-mini";
import { emailResetSchema } from "../../_lib/validation-schemas";
import { randomBytes } from "crypto";
import { db } from "../../_lib/drizzle";
import { tokenTable, users } from "../../_lib/drizzle/schema";
import { eq } from "drizzle-orm";

// TODO: Implement Rate-Limiting later
export async function POST(request: NextRequest) {
  const body: z.infer<typeof emailResetSchema> = await request.json();
  if (!emailResetSchema.safeParse(body).success) {
    return NextResponse.json(
      {
        message: "Invalid Schema provided",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const rand = randomBytes(32).toString("base64");
    const currUser = (
      await db
        .select({ email: users.email, id: users.id })
        .from(users)
        .where(eq(users.email, body.email))
    )[0];
    if (!currUser) {
      return NextResponse.json(
        {
          message: "Invalid Request - This user does not exists",
        },
        { status: 400 }
      );
    }

    db.insert(tokenTable).values({
      token: rand,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      userId: currUser.id,
    });
  } catch {
    return NextResponse.json({
      message:
        "Something went wrong while sending you the reset link...\nPlease try again",
    });
  }
}
