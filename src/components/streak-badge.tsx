"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  streak: number;
  className?: string;
}

export function StreakBadge({ streak, className }: StreakBadgeProps) {
  const isActive = streak > 0;
  return (
    <div className={cn("flex items-center gap-1.5 font-semibold", className)}>
      <Flame
        className={cn(
          "size-5 transition-colors",
          isActive ? "text-terracotta fill-terracotta/20" : "text-muted-foreground"
        )}
      />
      <span className={cn("text-sm", isActive ? "text-warm-brown" : "text-muted-foreground")}>
        {streak} {streak === 1 ? "day" : "days"}
      </span>
    </div>
  );
}
