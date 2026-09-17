import { dummyTodos } from "@/src/data/todo";
import { NextResponse } from "next/server";

const getTodoById = (id: number) => dummyTodos.filter((data) => data.id === id)
const getIndexTodoById = (id: number) => dummyTodos.findIndex((data) => data.id === id)

export async function GET(request: Request, {params} : {params: Promise<{id: string}>}) {
  try {
    const {id} = await params

    const filterTodo = getTodoById(Number(id)) 

    if(filterTodo.length === 0){
         return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }else{
        return NextResponse.json(
          filterTodo,
        );
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, {params} : {params: Promise<{id: string}>}) {
  try {
    const {id} = await params
    const body = await request.json();
    const { name, status } = body;

    const filterTodo = getTodoById(Number(id)) 

     if(filterTodo.length === 0){
         return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }else{
        if (!name || !status) {
          return NextResponse.json(
            { message: "Name and status must required" },
            { status: 422 }
          );
        }

        const indexTodo =  getIndexTodoById(Number(id))

        dummyTodos[indexTodo].name = name
        dummyTodos[indexTodo].status = status
    
        return NextResponse.json(
          true,
          { status: 201 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, {params} : {params: Promise<{id: string}>}) {
  try {
    const {id} = await params
    const filterTodo = getTodoById(Number(id)) 

     if(filterTodo.length === 0){
         return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }else{
        const indexTodo =  getIndexTodoById(Number(id))
        dummyTodos.splice(indexTodo, 1);

        return NextResponse.json(
          true,
          { status: 201 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}