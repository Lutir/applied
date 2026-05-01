"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeId = "parchment" | "todoist";

export const THEMES = [
  { id: "parchment" as ThemeId, name: "Parchment", preview: "#C4714A", dark: false },
  { id: "todoist"   as ThemeId, name: "Todoist",   preview: "#DB4035", dark: true  },
] as const;

interface ThemeState {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "parchment",
      setTheme: (theme) => set({ theme }),
      toggle: () => set({ theme: get().theme === "parchment" ? "todoist" : "parchment" }),
    }),
    {
      name: "applied-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
