"use client";

import { useRouter } from "next/navigation";
import { useProgressStore } from "@/store/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyButtonProps {
  className?: string;
  size?: "default" | "lg";
}

export function StudyButton({ className, size = "default" }: StudyButtonProps) {
  const router = useRouter();
  const currentWeek = useProgressStore((s) => s.currentWeek);

  return (
    <Button
      onClick={() => router.push(`/week/${currentWeek}`)}
      className={cn(
        "bg-terracotta hover:bg-terracotta/90 text-white gap-2 font-semibold cursor-pointer",
        size === "lg" && "h-12 px-6 text-base rounded-xl",
        className
      )}
    >
      <BookOpen className="size-4" />
      Continue Week {currentWeek}
      <ArrowRight className="size-4" />
    </Button>
  );
}
