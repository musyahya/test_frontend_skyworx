import { NextResponse } from "next/server";

// Data mock lokal untuk simulasi database
const mockUsers = [
  { id: 1, name: "Budi Santoso", email: "budi@example.com", role: "admin" },
  { id: 2, name: "Siti Rahma", email: "siti@example.com", role: "user" },
  { id: 3, name: "Andi Wijaya", email: "andi@example.com", role: "user" },
];

// GET: Filter data berdasarkan Query Parameter (?search=...)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  let filteredUsers = mockUsers;

  if (search) {
    filteredUsers = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json({
    status: 200,
    total: filteredUsers.length,
    data: filteredUsers,
  });
}

// POST: Tambah data user baru dengan validasi
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    // Validasi input sederhana
    if (!name || !email) {
      return NextResponse.json(
        { status: 400, message: "Nama dan email wajib diisi!" },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role: role || "user",
    };

    return NextResponse.json(
      {
        status: 201,
        message: "User berhasil dibuat",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Format JSON tidak valid atau terjadi kesalahan server" },
      { status: 500 }
    );
  }
}