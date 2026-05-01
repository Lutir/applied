"use client";

import { useState } from "react";
import { useThemeStore, THEMES, type ThemeId } from "@/store/theme";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);

  const current = THEMES.find((t) => t.id === theme);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5",
          "text-xs font-medium text-muted-foreground hover:text-foreground",
          "hover:bg-muted transition-colors",
          open && "bg-muted text-foreground"
        )}
      >
        <Palette className="size-3.5" />
        <span
          className="size-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: current?.preview }}
        />
        <span className="hidden sm:inline">{current?.name}</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-xl border border-border bg-popover shadow-xl overflow-hidden">
            <div className="p-2">
              <p className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Choose a theme
              </p>
              <div className="space-y-0.5">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id as ThemeId); setOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                      theme === t.id
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      className="size-3 rounded-full flex-shrink-0 ring-1 ring-inset ring-black/10"
                      style={{ backgroundColor: t.preview }}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium leading-none mb-0.5">
                        {t.name}
                      </span>
                      <span className="block text-xs text-muted-foreground truncate">
                        {t.description}
                      </span>
                    </span>
                    {t.dark && (
                      <span className="text-xs text-muted-foreground opacity-60">dark</span>
                    )}
                    {theme === t.id && (
                      <span className="size-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
