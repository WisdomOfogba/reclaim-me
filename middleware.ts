import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/api/_lib/auth";

export default async function middleware(request: NextRequest) {
  const isAuthValid = await isAuthenticated(request);
  const { pathname } = request.nextUrl;
  if (!isAuthValid) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } else if (
    !pathname.startsWith("/signup") &&
    !pathname.startsWith("/signin") &&
    !pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
