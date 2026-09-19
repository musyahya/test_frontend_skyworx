"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "../types/theme";

const themeInitialValue: Theme = "dark";

type useThemeStoreType = {
  theme: Theme;
  toggleTheme: () => Promise<void>;
};

const useThemeStore = create<useThemeStoreType>()(
  persist(
    (set) => ({
      theme: themeInitialValue,
      toggleTheme: async () =>
        await new Promise((resolve) => {
          (set((state) => {
            return {
              theme: state.theme === "dark" ? "light" : "dark",
            };
          }),
            resolve());
        })
    }),
    { name: 'theme' },
  )
);

export default useThemeStore;
