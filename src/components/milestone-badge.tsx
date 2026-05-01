import { cn } from "@/lib/utils";
import type { BadgeId } from "@/types/curriculum";
import { BADGES } from "@/lib/badges";
import {
  Flame,
  Zap,
  Award,
  GraduationCap,
  Crown,
  Trophy,
  Star,
  TrendingUp,
  Calendar,
  Brain,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame,
  Zap,
  Award,
  GraduationCap,
  Crown,
  Trophy,
  Star,
  TrendingUp,
  Calendar,
  Brain,
  Sparkles,
};

interface MilestoneBadgeProps {
  badgeId: BadgeId;
  earned?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { wrap: "p-2", icon: "size-4", name: "text-xs", desc: "text-xs" },
  md: { wrap: "p-3", icon: "size-5", name: "text-sm", desc: "text-xs" },
  lg: { wrap: "p-4", icon: "size-7", name: "text-base", desc: "text-sm" },
};

export function MilestoneBadge({ badgeId, earned = true, size = "md" }: MilestoneBadgeProps) {
  const badge = BADGES[badgeId];
  const Icon = ICON_MAP[badge.icon] ?? Award;
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl border text-center transition-opacity",
        s.wrap,
        earned
          ? "border-terracotta/30 bg-terracotta/5"
          : "border-border bg-muted/40 opacity-50 grayscale"
      )}
    >
      <div
        className={cn(
          "rounded-full p-2",
          earned ? "bg-terracotta/10 text-terracotta" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className={s.icon} />
      </div>
      <p className={cn("font-semibold text-warm-brown", s.name)}>{badge.name}</p>
      <p className={cn("text-muted-foreground leading-snug", s.desc)}>{badge.description}</p>
    </div>
  );
}
