"use client";

import Link from "next/link";
import { Lock, Check, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CurriculumWeek } from "@/types/curriculum";

type WeekStatus = "locked" | "active" | "completed";

interface WeekCardProps {
  week: CurriculumWeek;
  status: WeekStatus;
  xpEarned?: number;
}

export function WeekCard({ week, status, xpEarned }: WeekCardProps) {
  const isLocked = status === "locked";

  const card = (
    <div
      className={cn(
        "group relative rounded-xl border p-4 transition-all duration-200 flex flex-col gap-2",
        isLocked && "border-border bg-muted/40 opacity-60 cursor-not-allowed select-none",
        status === "active" &&
          "border-terracotta/40 bg-white shadow-sm hover:shadow-md hover:border-terracotta cursor-pointer",
        status === "completed" && "border-sage/40 bg-white cursor-pointer hover:shadow-sm"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Week {week.id}
        </span>
        <span
          className={cn(
            "flex items-center justify-center size-6 rounded-full",
            isLocked && "bg-muted text-muted-foreground",
            status === "active" && "bg-terracotta/10 text-terracotta",
            status === "completed" && "bg-sage/20 text-sage"
          )}
        >
          {isLocked && <Lock className="size-3" />}
          {status === "active" && <BookOpen className="size-3" />}
          {status === "completed" && <Check className="size-3" />}
        </span>
      </div>

      <h3
        className={cn(
          "font-heading text-base font-semibold leading-snug",
          isLocked ? "text-muted-foreground" : "text-warm-brown"
        )}
      >
        {week.title}
      </h3>

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs text-muted-foreground">{week.xpReward} XP</span>
        {status === "completed" && xpEarned !== undefined && (
          <span className="text-xs font-medium text-sage">+{xpEarned} earned</span>
        )}
        {status === "active" && (
          <ChevronRight className="size-4 text-terracotta group-hover:translate-x-0.5 transition-transform" />
        )}
      </div>
    </div>
  );

  if (isLocked) return card;
  return <Link href={`/week/${week.id}`}>{card}</Link>;
}
