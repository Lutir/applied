"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeId = "parchment" | "midnight" | "grove";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  description: string;
  preview: string; // hex color for the swatch dot
}

export const THEMES: ThemeMeta[] = [
  {
    id: "parchment",
    name: "Parchment",
    description: "Notion · editorial warmth",
    preview: "#C4714A",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Linear · sleek dark",
    preview: "#6366F1",
  },
  {
    id: "grove",
    name: "Grove",
    description: "Duolingo · fresh energy",
    preview: "#16A34A",
  },
];

interface ThemeState {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "parchment",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "applied-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
