import { dummyTodos } from "@/src/data/todo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const limitParam = searchParams.get("limit");
  const offsetParam = searchParams.get("offset");
  const orderBy = searchParams.get("order_by") || "id";
  const order = searchParams.get("order") || "desc";

  const limit = Number(limitParam ?? 10);
  const offset = Number(offsetParam ?? 0);

  let filteredTodos = [...dummyTodos];

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

    console.log(dummyTodos, dummyTodos.length, dummyTodos[dummyTodos.length - 1])

    const id = dummyTodos[dummyTodos.length - 1].id + 1

    dummyTodos.push({
      id,
      name,
      status: "todo"
    })

    return NextResponse.json(
      id,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}