"use client";

import { useThemeStore, THEMES, type ThemeId } from "@/store/theme";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id as ThemeId)}
          title={`${t.name} — ${t.description}`}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all",
            theme === t.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span
            className="size-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: t.preview }}
          />
          <span className="hidden sm:inline">{t.name}</span>
        </button>
      ))}
    </div>
  );
}
