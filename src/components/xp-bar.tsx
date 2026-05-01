"use client";

import { Zap } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getLevel } from "@/store/progress";
import { cn } from "@/lib/utils";

interface XPBarProps {
  totalXP: number;
  className?: string;
}

export function XPBar({ totalXP, className }: XPBarProps) {
  const { level, prevThreshold, nextThreshold } = getLevel(totalXP);
  const rangeXP = nextThreshold - prevThreshold;
  const earnedInLevel = totalXP - prevThreshold;
  const pct = rangeXP > 0 ? (earnedInLevel / rangeXP) * 100 : 100;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 font-semibold text-warm-brown">
          <Zap className="size-4 text-terracotta" />
          Level {level}
        </span>
        <span className="text-muted-foreground tabular-nums">
          {totalXP.toLocaleString()} / {nextThreshold.toLocaleString()} XP
        </span>
      </div>
      <ProgressBar value={pct} size="md" color="terracotta" />
    </div>
  );
}
