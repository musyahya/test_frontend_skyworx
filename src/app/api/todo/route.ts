import { Todo } from "@/src/types/todo";
import { NextResponse } from "next/server";

export const dummyTodos: Todo[] = [
  { id: 1, name: "Review pull request refactoring admin", status: "todo" },
  { id: 2, name: "Optimasi query Prisma ke database SQLite", status: "done" },
  { id: 3, name: "Integrasi fitur pencarian di dashboard", status: "inProgress" },
  { id: 4, name: "Setup React Query DevTools", status: "done" },
  { id: 5, name: "Bayar tagihan listrik dan internet", status: "todo" },
  { id: 6, name: "Perbaiki bug responsif di tampilan mobile", status: "inProgress" },
  { id: 7, name: "Beli kebutuhan dapur dan bahan makanan", status: "done" },
  { id: 8, name: "Konfigurasi Dockerfile untuk deployment", status: "todo" },
  { id: 9, name: "Servis rutin motor dan ganti oli", status: "todo" },
  { id: 10, name: "Cek error log aplikasi di dashboard", status: "done" },
  { id: 11, name: "Tulis dokumentasi endpoint API Route", status: "todo" },
  { id: 12, name: "Olahraga malam 30 menit", status: "inProgress" },
  { id: 13, name: "Update package library ke versi terbaru", status: "done" },
  { id: 14, name: "Persiapan slide materi demo proyek", status: "todo" },
  { id: 15, name: "Backup database lokal secara otomatis", status: "inProgress" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const limitParam = searchParams.get("limit");
  const offsetParam = searchParams.get("offset");
  const orderBy = searchParams.get("order_by");
  const order = searchParams.get("order") || "asc";

  const limit = Number(limitParam ?? 10);
  const offset = Number(offsetParam ?? 0);

  let filteredTodos = dummyTodos;

  const total = filteredTodos.length;
  const totalTodo = filteredTodos.filter((data) => data.status === "todo").length;
  const totalInProgress = filteredTodos.filter((data) => data.status === "inProgress").length;
  const totalDone = filteredTodos.filter((data) => data.status === "done").length;

  if (search) {
    filteredTodos = dummyTodos.filter((todo) =>
      todo.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status) {
    filteredTodos = dummyTodos.filter((todo) =>
      todo.status.toLowerCase().includes(status.toLowerCase())
    );
  }

 if (orderBy === "id" || orderBy === "name" || orderBy === "status") {
    filteredTodos.sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];

      if (typeof valA === "number" && typeof valB === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

      if (strA < strB) return order === "asc" ? -1 : 1;
      if (strA > strB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  let paginatedTodos = filteredTodos;

  paginatedTodos = filteredTodos.slice(offset, offset + limit);

  return NextResponse.json({
    total,
    total_todo: totalTodo,
    total_in_progress: totalInProgress,
    total_done: totalDone,
    data: paginatedTodos,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name must required" },
        { status: 422 }
      );
    }

    return NextResponse.json(
      1,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}