export type TodoType = "todo" | "inProgress" | "done";

export interface Todo {
  id: number;
  name: string;
  status: TodoType
}

export interface TodoList {
    total: number;
    total_todo: number
    total_in_progress: number
    total_done: number
    data: Todo[];
}