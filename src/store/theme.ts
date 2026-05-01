"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeId =
  | "parchment"
  | "midnight"
  | "grove"
  | "arc"
  | "obsidian"
  | "github"
  | "bear"
  | "stripe"
  | "raycast"
  | "craft"
  | "supabase"
  | "figma"
  | "todoist";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  description: string;
  preview: string;
  dark: boolean;
}

export const THEMES: ThemeMeta[] = [
  { id: "parchment", name: "Parchment", description: "Notion · warm editorial",  preview: "#C4714A", dark: false },
  { id: "midnight",  name: "Midnight",  description: "Linear · sleek dark",      preview: "#6366F1", dark: true  },
  { id: "grove",     name: "Grove",     description: "Duolingo · fresh energy",  preview: "#16A34A", dark: false },
  { id: "arc",       name: "Arc",       description: "Arc Browser · lavender",   preview: "#A78BFA", dark: true  },
  { id: "obsidian",  name: "Obsidian",  description: "Obsidian · Catppuccin",    preview: "#CBA6F7", dark: true  },
  { id: "github",    name: "GitHub",    description: "GitHub · blue-gray dark",  preview: "#58A6FF", dark: true  },
  { id: "bear",      name: "Bear",      description: "Bear · warm amber dark",   preview: "#F59E0B", dark: true  },
  { id: "stripe",    name: "Stripe",    description: "Stripe · deep violet",     preview: "#635BFF", dark: true  },
  { id: "raycast",   name: "Raycast",   description: "Raycast · warm + coral",   preview: "#FF6363", dark: true  },
  { id: "craft",     name: "Craft",     description: "Craft Docs · sky blue",    preview: "#2563EB", dark: false },
  { id: "supabase",  name: "Supabase",  description: "Supabase · emerald dev",   preview: "#3ECF8E", dark: true  },
  { id: "figma",     name: "Figma",     description: "Figma · warm-gray dark",   preview: "#F24E1E", dark: true  },
  { id: "todoist",   name: "Todoist",   description: "Todoist · neutral + red",  preview: "#DB4035", dark: true  },
];

interface ThemeState {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "midnight",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "applied-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
