import { Todo } from "@/src/types/todo";
import { NextResponse } from "next/server";

export const dummyTodos: Todo = { id: 1, name: "Review pull request refactoring admin", status: "todo" }

export async function GET(request: Request, {params} : {params: Promise<{id: number}>}) {
  try {
    const {id} = await params
    if(id > 15){
         return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }else{
        return NextResponse.json(
          dummyTodos,
        );
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, {params} : {params: Promise<{id: number}>}) {
  try {
    const {id} = await params
    const body = await request.json();
    const { name, status } = body;
     if(id > 15){
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

export async function DELETE(request: Request, {params} : {params: Promise<{id: number}>}) {
  try {
    const {id} = await params
     if(id > 15){
         return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }else{
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