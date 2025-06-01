import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../_lib/validation-schemas";
import z from "zod/v4-mini";
import { db } from "../_lib/drizzle";
import { users } from "../_lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { createToken, verifyPassword } from "../_lib/auth";

export async function POST(request: NextRequest) {
  const body: z.infer<typeof loginSchema> = await request.json();
  //   const token = request.cookies.get("token");
  if (!loginSchema.safeParse(body).success) {
    return NextResponse.json(
      {
        message: "Invalid Schema provided",
      },
      {
        status: 400,
      }
    );
  }

  const { email, password } = body;

  const foundUser = (
    await db.select().from(users).where(eq(users.email, email)).limit(1)
  )[0];

  if (!foundUser) {
    return NextResponse.json(
      {
        message: "No user found with this email",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const isPasswordValid = await verifyPassword(foundUser.password, password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Wrong email or password",
        },
        {
          status: 404,
        }
      );
    }

    const token = await createToken({
      email: foundUser.email,
      firstname: foundUser.firstName,
    });

    const response = NextResponse.next({ status: 200 });
    response.cookies.set({
      name: "token",
      value: token,
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "SSomething went wrong... \nPlease try again later",
      },
      {
        status: 500,
      }
    );
  }
}
