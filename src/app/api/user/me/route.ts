import { NextResponse } from "next/server";

const mockUsers =  { id: 1, name: "Budi Santoso", email: "budi@example.com"}

export async function GET(request: Request) {
  return NextResponse.json(mockUsers);
}