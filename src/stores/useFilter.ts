"use client";

import { create } from "zustand";
import { TodoType } from "../types/todo";

export type FilterType = {
  offset: number;
  limit: number;

  order: "asc" | "desc" | null;
  order_by: string | null;

  search: string;
  status?: TodoType
};

const filterInitialValue: FilterType = {
  offset: 0,
  limit: 5,

  order: null,
  order_by: null,

  search: "",
  status: undefined
};

type useFilterType = {
  filter: FilterType;
  setFilter: (filter: Partial<FilterType>) => Promise<void>;
  resetFilter: () => Promise<void>;
};

const useFilter = create<useFilterType>((set) => ({
  filter: filterInitialValue,
  setFilter: async (filter: Partial<FilterType>) =>
    await new Promise((resolve) => {
      (set((state) => {
        return {
          filter: { ...state.filter, ...filter, page: filter.offset ?? 0 },
        };
      }),
        resolve());
    }),
  resetFilter: async () =>
    await new Promise((resolve) => {
      set((state) => ({ filter: filterInitialValue }));
      resolve();
    }),
}));

export default useFilter;
