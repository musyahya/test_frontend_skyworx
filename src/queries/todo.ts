import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";
import { TodoList } from "../types/todo";
import useFilter from "../stores/useFilter";
import { CreateTodoFormData, EditTodoFormData } from "../schemas/todoSchema";
import { useDebounce } from "@/src/hooks/useDebounce";

export const useTodoList = () => {
  const { filter } = useFilter();
  const debounce = useDebounce(filter)

  const params: Record<string, any> = {
    offset: debounce.offset,
    limit: debounce.limit,
  };

  if (debounce.search) {
    params.name = debounce.search;
  }

  if (debounce.status) {
    if(debounce.status !== "all"){
      params.status = debounce.status;
    }
  }

  if(debounce.order_by && debounce.order) {
    params.order_by = debounce.order_by;
    params.order = debounce.order;
  }

  return useQuery({
    queryKey: ["todolist", params],
    queryFn: async () =>
      await axios.get<TodoList>("/api/todo", {
        params,
      }),
  });
};

export const useCreateTodo = () =>
  useMutation({
    mutationFn: async (data: CreateTodoFormData) => {
      return await axios.post<number>("/api/todo", data);
    },
  });

export const useEditodo = () =>
  useMutation({
    mutationFn: async (data: EditTodoFormData) => {
      const { id, ...props } = data;
      return await axios.put<true>(`/api/todo/${id}`, props);
    },
  });

export const useDeleteTodo = () =>
  useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete<true>(`/api/todo/${id}`);
    },
  });
