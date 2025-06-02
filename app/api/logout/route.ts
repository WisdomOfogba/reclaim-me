import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  if (!request.cookies.delete("token")) {
    return NextResponse.json(
      {
        message:
          "Error occurred while logging you out...\nPlease try again later",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
    },
    {
      headers: {
        "Set-Cookie": request.cookies.toString(),
      },
      status: 200,
    }
  );
}
