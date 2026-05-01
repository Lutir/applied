"use client";

import { useThemeStore } from "@/store/theme";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, toggle } = useThemeStore();
  const isDark = theme === "todoist";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to Parchment" : "Switch to Todoist"}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5",
        "text-xs font-medium text-muted-foreground hover:text-foreground",
        "hover:bg-muted transition-colors"
      )}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
