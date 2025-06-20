import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../_lib/validation-schemas";
import { db } from "../_lib/drizzle";
import { users } from "../_lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../_lib/auth.argon";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationResult = signupSchema.safeParse(body);
  //   const token = request.cookies.get("token");
  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: "Invalid Schema provided",
      },
      {
        status: 400,
      }
    );
  }

  const foundUser = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email))
    .limit(1);

  if (foundUser[0]) {
    return NextResponse.json(
      {
        message: "A user with this email already exists",
      },
      { status: 400 }
    );
  }

  try {
    const password = await hashPassword(body.password);

    await db.insert(users).values({
      ...body,
      password: password,
    });

    const response = NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "Something went wrong... \nPlease try again later",
      },
      {
        status: 500,
      }
    );
  }
}
