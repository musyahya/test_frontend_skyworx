import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, password, email } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Name, email dan password must required" },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        id: 2,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}