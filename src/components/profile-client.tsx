"use client";

import { useState, useEffect } from "react";
import { useProgressStore, getLevel } from "@/store/progress";
import { StreakBadge } from "@/components/streak-badge";
import { XPBar } from "@/components/xp-bar";
import { MilestoneBadge } from "@/components/milestone-badge";
import { BADGES } from "@/lib/badges";
import type { BadgeId } from "@/types/curriculum";

const ALL_BADGE_IDS = Object.keys(BADGES) as BadgeId[];

export function ProfileClient() {
  const [mounted, setMounted] = useState(false);
  const { streak, longestStreak, totalXP, completedWeeks, badges } = useProgressStore();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  const { level } = getLevel(totalXP);
  const earnedSet = new Set(badges);

  const stats = [
    { label: "Level", value: String(level) },
    { label: "Total XP", value: totalXP.toLocaleString() },
    { label: "Current Streak", value: `${streak}d` },
    { label: "Longest Streak", value: `${longestStreak}d` },
    { label: "Weeks Completed", value: `${completedWeeks.length}/52` },
    { label: "Badges Earned", value: `${badges.length}/${ALL_BADGE_IDS.length}` },
  ];

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-white p-4 space-y-1 shadow-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {label}
            </p>
            <p className="text-2xl font-heading font-bold text-warm-brown">{value}</p>
          </div>
        ))}
      </div>

      {/* XP progress */}
      <div className="rounded-xl border border-border bg-white p-5">
        <XPBar totalXP={totalXP} />
      </div>

      {/* Streak */}
      <div className="rounded-xl border border-border bg-white p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
            Current Streak
          </p>
          <StreakBadge streak={streak} />
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
            Longest Streak
          </p>
          <StreakBadge streak={longestStreak} />
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-warm-brown">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ALL_BADGE_IDS.map((id) => (
            <MilestoneBadge key={id} badgeId={id} earned={earnedSet.has(id)} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
