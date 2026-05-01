"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/store/progress";
import { StreakBadge } from "@/components/streak-badge";
import { XPBar } from "@/components/xp-bar";
import { StudyButton } from "@/components/study-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { CurriculumWeek, PhaseId } from "@/types/curriculum";
import { PHASE_NAMES } from "@/types/curriculum";

interface DashboardClientProps {
  curriculum: CurriculumWeek[];
}

export function DashboardClient({ curriculum }: DashboardClientProps) {
  const [mounted, setMounted] = useState(false);
  const { streak, totalXP, completedWeeks, currentWeek, updateStreak } = useProgressStore();

  useEffect(() => {
    setMounted(true);
    updateStreak();
  }, [updateStreak]);

  if (!mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-4 h-20" />
          ))}
        </div>
        <div className="rounded-xl border border-terracotta/20 bg-terracotta/5 p-5 h-24" />
      </div>
    );
  }

  const completedSet = new Set(completedWeeks);
  const overallPct = (completedWeeks.length / 52) * 100;
  const currentWeekData = curriculum.find((w) => w.id === currentWeek);

  const phaseProgress = ([1, 2, 3, 4, 5] as PhaseId[]).map((phase) => {
    const phaseWeeks = curriculum.filter((w) => w.phase === phase);
    const done = phaseWeeks.filter((w) => completedSet.has(w.id)).length;
    return { phase, name: PHASE_NAMES[phase], done, total: phaseWeeks.length };
  });

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-white p-4 space-y-1 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Streak
          </p>
          <StreakBadge streak={streak} />
        </div>
        <div className="rounded-xl border border-border bg-white p-4 space-y-2 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">XP</p>
          <XPBar totalXP={totalXP} />
        </div>
        <div className="rounded-xl border border-border bg-white p-4 space-y-2 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Overall Progress
          </p>
          <p className="text-2xl font-heading font-bold text-warm-brown">
            {completedWeeks.length}
            <span className="text-sm font-sans font-normal text-muted-foreground">/52 weeks</span>
          </p>
          <ProgressBar value={overallPct} size="sm" />
        </div>
      </div>

      {/* CTA banner */}
      <div className="flex items-center justify-between rounded-xl border border-terracotta/20 bg-terracotta/5 p-5 gap-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1">Up Next</p>
          <p className="font-heading font-semibold text-warm-brown text-lg leading-snug">
            {currentWeekData ? currentWeekData.title : "You completed the full curriculum!"}
          </p>
          {currentWeekData && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Phase {currentWeekData.phase} — {currentWeekData.phaseName}
            </p>
          )}
        </div>
        {currentWeek <= 52 && <StudyButton size="lg" />}
      </div>

      {/* Phase progress */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold text-warm-brown">Phase Progress</h2>
        <div className="grid gap-3">
          {phaseProgress.map(({ phase, name, done, total }) => (
            <div key={phase} className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground w-4">{phase}</span>
              <span className="text-sm text-warm-brown w-44 shrink-0 truncate">{name}</span>
              <ProgressBar
                value={(done / total) * 100}
                size="sm"
                className="flex-1"
                color={phase % 2 === 0 ? "sage" : "terracotta"}
              />
              <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                {done}/{total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
