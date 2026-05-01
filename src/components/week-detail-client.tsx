"use client";

import { useRouter } from "next/navigation";
import { useProgressStore } from "@/store/progress";
import { HomeworkChecklist } from "@/components/homework-checklist";
import { Button } from "@/components/ui/button";
import type { CurriculumWeek } from "@/types/curriculum";
import { Check, BookOpen, ChevronLeft, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function WeekDetailClient({ week }: { week: CurriculumWeek }) {
  const router = useRouter();
  const { isWeekCompleted, isWeekUnlocked, completeWeek, homeworkChecked } = useProgressStore();

  const completed = isWeekCompleted(week.id);
  const unlocked = isWeekUnlocked(week.id);
  const checked = homeworkChecked[week.id] ?? Array(week.homework.length).fill(false);
  const allChecked = checked.length >= week.homework.length && checked.every(Boolean);

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <p className="text-muted-foreground">
          Complete Week {week.id - 1} first to unlock this one.
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-warm-brown transition-colors"
      >
        <ChevronLeft className="size-4" />
        Curriculum
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
          <span>Phase {week.phase}</span>
          <span>·</span>
          <span>{week.phaseName}</span>
          <span>·</span>
          <span>Week {week.id}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-warm-brown leading-tight">
          {week.title}
        </h1>
        {completed && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sage bg-sage/10 px-2.5 py-1 rounded-full">
            <Check className="size-3" />
            Completed · +{week.xpReward} XP earned
          </span>
        )}
      </div>

      {/* Concept */}
      <div className="rounded-xl bg-white border border-border p-5 space-y-2">
        <h2 className="font-heading text-base font-semibold text-warm-brown flex items-center gap-2">
          <BookOpen className="size-4 text-terracotta" />
          Concept
        </h2>
        <p className="text-sm leading-relaxed text-foreground">{week.concept}</p>
      </div>

      {/* Paper */}
      {week.paperTitle && (
        <div className="rounded-xl bg-sand/60 border border-sand p-5 space-y-2">
          <h2 className="font-heading text-base font-semibold text-warm-brown flex items-center gap-2">
            <FileText className="size-4 text-terracotta" />
            Paper to Read
          </h2>
          <p className="text-sm font-medium text-warm-brown">{week.paperTitle}</p>
          {week.paperNote && (
            <p className="text-sm text-muted-foreground italic">{week.paperNote}</p>
          )}
        </div>
      )}

      {/* Homework */}
      <div className="space-y-3">
        <h2 className="font-heading text-base font-semibold text-warm-brown">
          Homework
          <span className="ml-2 text-xs font-sans font-normal text-muted-foreground">
            ({checked.filter(Boolean).length}/{week.homework.length} done)
          </span>
        </h2>
        <HomeworkChecklist weekId={week.id} items={week.homework} />
      </div>

      {/* Reflection */}
      <div className="rounded-xl bg-terracotta/5 border border-terracotta/20 p-5 space-y-2">
        <h2 className="font-heading text-base font-semibold text-terracotta">
          Reflection Prompt
        </h2>
        <p className="text-sm italic text-warm-brown leading-relaxed">
          {week.reflectionPrompt}
        </p>
      </div>

      {/* Action button */}
      {!completed ? (
        <button
          onClick={() => {
            if (allChecked) completeWeek(week.id);
          }}
          disabled={!allChecked}
          className={cn(
            "w-full h-12 text-base font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors",
            allChecked
              ? "bg-terracotta hover:bg-terracotta/90 text-white cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Check className="size-5" />
          {allChecked
            ? `Mark Complete (+${week.xpReward} XP)`
            : `Complete all ${week.homework.length} tasks to unlock`}
        </button>
      ) : (
        week.id < 52 && (
          <button
            onClick={() => router.push(`/week/${week.id + 1}`)}
            className="w-full h-12 text-base font-semibold rounded-xl bg-sage hover:bg-sage/90 text-white cursor-pointer flex items-center justify-center gap-2 transition-colors"
          >
            Next Week →
          </button>
        )
      )}
    </div>
  );
}
