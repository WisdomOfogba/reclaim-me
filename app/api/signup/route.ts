import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../_lib/validation-schemas";
import * as z from "zod/v4-mini";
import { db } from "../_lib/drizzle";
import { users } from "../_lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { createToken } from "../_lib/auth";
import { hashPassword } from "../_lib/auth.argon";

export async function POST(request: NextRequest) {
  const body: z.infer<typeof signupSchema> = await request.json();
  //   const token = request.cookies.get("token");
  if (!signupSchema.safeParse(body).success) {
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

    const response = NextResponse.redirect(new URL("/dashboard", request.url), {
      status: 200,
    });

    response.cookies.set({
      name: "token",
      value: await createToken({
        email: body.email,
        firstname: body.firstName,
      }),
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

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
