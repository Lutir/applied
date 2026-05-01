import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";
import { WeekCard } from "@/components/week-card";
import type { CurriculumWeek, PhaseId } from "@/types/curriculum";

interface PhaseSectionProps {
  phaseId: PhaseId;
  phaseName: string;
  weeks: CurriculumWeek[];
  completedWeeks: number[];
  currentWeek: number;
}

const phaseColors: Record<PhaseId, string> = {
  1: "text-terracotta",
  2: "text-warm-brown",
  3: "text-sage",
  4: "text-terracotta",
  5: "text-warm-brown",
};

export function PhaseSection({
  phaseId,
  phaseName,
  weeks,
  completedWeeks,
  currentWeek,
}: PhaseSectionProps) {
  const completedSet = new Set(completedWeeks);
  const completed = weeks.filter((w) => completedSet.has(w.id)).length;
  const pct = (completed / weeks.length) * 100;
  const fillColor = phaseId % 2 === 0 ? "sage" : "terracotta";

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className={cn("font-heading text-xl font-semibold", phaseColors[phaseId])}>
            Phase {phaseId} — {phaseName}
          </h2>
          <span className="text-sm text-muted-foreground tabular-nums">
            {completed}/{weeks.length} weeks
          </span>
        </div>
        <ProgressBar value={pct} size="sm" color={fillColor} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {weeks.map((week) => {
          const isCompleted = completedSet.has(week.id);
          const isActive =
            !isCompleted && (week.id === 1 || completedSet.has(week.id - 1));
          const status = isCompleted ? "completed" : isActive ? "active" : "locked";
          return (
            <WeekCard
              key={week.id}
              week={week}
              status={status}
              xpEarned={isCompleted ? week.xpReward : undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
