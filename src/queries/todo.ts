import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";
import { TodoList } from "../types/todo";
import useFilter from "../stores/useFilter";
import { CreateTodoFormData, EditTodoFormData } from "../schemas/todoSchema";

export const useTodoList = () => {
  const { filter } = useFilter();

  const params: Record<string, any> = {
    offset: filter.offset,
    limit: filter.limit,
  };

  if (filter.search) {
    params.name = filter.search;
  }

  if (filter.status) {
    params.status = filter.status;
  }

  if(filter.order_by && filter.order) {
    params.order_by = filter.order_by;
    params.order = filter.order;
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
