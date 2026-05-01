"use client";

import { useState, useEffect } from "react";
import { useProgressStore } from "@/store/progress";
import { PhaseSection } from "@/components/phase-section";
import type { CurriculumWeek, PhaseId } from "@/types/curriculum";
import { PHASE_NAMES } from "@/types/curriculum";

export function CurriculumClient({ curriculum }: { curriculum: CurriculumWeek[] }) {
  const [mounted, setMounted] = useState(false);
  const { completedWeeks, currentWeek } = useProgressStore();

  useEffect(() => setMounted(true), []);

  const phases = [1, 2, 3, 4, 5] as PhaseId[];

  if (!mounted) {
    return (
      <div className="space-y-12 animate-pulse">
        {phases.map((p) => (
          <div key={p} className="space-y-4">
            <div className="h-6 bg-muted rounded w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {phases.map((phase) => (
        <PhaseSection
          key={phase}
          phaseId={phase}
          phaseName={PHASE_NAMES[phase]}
          weeks={curriculum.filter((w) => w.phase === phase)}
          completedWeeks={completedWeeks}
          currentWeek={currentWeek}
        />
      ))}
    </div>
  );
}
