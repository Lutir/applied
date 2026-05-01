"use client";

import { useProgressStore } from "@/store/progress";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface HomeworkChecklistProps {
  weekId: number;
  items: string[];
}

export function HomeworkChecklist({ weekId, items }: HomeworkChecklistProps) {
  const { homeworkChecked, toggleHomework } = useProgressStore();
  const checked = homeworkChecked[weekId] ?? Array(items.length).fill(false);

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i}>
          <button
            onClick={() => toggleHomework(weekId, i)}
            className={cn(
              "w-full flex items-start gap-3 rounded-lg p-3 text-left",
              "border transition-all duration-150",
              checked[i]
                ? "border-sage/40 bg-sage/5 text-muted-foreground"
                : "border-border bg-white hover:border-terracotta/30 hover:bg-terracotta/5 text-warm-brown"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                checked[i] ? "border-sage bg-sage text-white" : "border-border"
              )}
            >
              {checked[i] && <Check className="size-3" />}
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed",
                checked[i] && "line-through text-muted-foreground"
              )}
            >
              {item}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
