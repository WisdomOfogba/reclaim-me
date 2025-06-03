import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../_lib/validation-schemas";
import { db } from "../_lib/drizzle";
import { users } from "../_lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { createToken } from "../_lib/auth";
import { verifyPassword } from "../_lib/auth.argon";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body against the schema
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid schema provided.",
          errors: validationResult.error.flatten().fieldErrors, // Provide detailed errors
        },
        {
          status: 400, // Bad Request
        }
      );
    }

    const { email, password } = validationResult.data;

    // Find the user by email
    const foundUser = (
      await db.select().from(users).where(eq(users.email, email)).limit(1)
    )[0];

    if (!foundUser) {
      return NextResponse.json(
        {
          message: "No user found with this email.",
        },
        {
          status: 404, // Not Found (more appropriate than 400 if user doesn't exist)
        }
      );
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(foundUser.password, password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Wrong email or password.",
        },
        {
          status: 401, // Unauthorized (more appropriate for failed login attempt)
        }
      );
    }

    // Create a token for the authenticated user
    const token = await createToken({
      email: foundUser.email,
      // Ensure you have firstName in your users schema and it's populated
      // If firstName can be null/undefined, handle it appropriately or make it required for token
      firstname: foundUser.firstName || "",
      id: foundUser.id,
    });

    // Create the redirect response
    // IMPORTANT: Use status 303 to ensure the browser uses GET for the /dashboard request
    const response = NextResponse.json(
      { message: "Login successful", success: true }, // Or whatever data you want to send back
      { status: 200 } // Send a 200 OK status
    );

    // Set the token as an HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      httpOnly: true,
      path: "/", // Make cookie available on all paths
      sameSite: "lax", // Good for security
      // Use secure cookies in production
    });

    return response;
  } catch (error) {
    console.error("Login error:", error); // Log the actual error for debugging

    // Handle cases where request.json() might fail (e.g., invalid JSON)
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          message: "Invalid JSON payload provided.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong on the server. Please try again later.",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}
