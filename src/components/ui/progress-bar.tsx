import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const trackVariants = cva("w-full rounded-full overflow-hidden", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    },
    track: {
      sand: "bg-sand",
      muted: "bg-muted",
    },
  },
  defaultVariants: { size: "md", track: "sand" },
});

const fillVariants = cva("h-full rounded-full transition-all duration-700 ease-out", {
  variants: {
    color: {
      terracotta: "bg-terracotta",
      sage: "bg-sage",
    },
  },
  defaultVariants: { color: "terracotta" },
});

interface ProgressBarProps
  extends VariantProps<typeof trackVariants>,
    VariantProps<typeof fillVariants> {
  value: number;
  className?: string;
}

export function ProgressBar({ value, size, track, color, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(trackVariants({ size, track }), className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn(fillVariants({ color }))} style={{ width: `${clamped}%` }} />
    </div>
  );
}
