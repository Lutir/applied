export type PhaseId = 1 | 2 | 3 | 4 | 5;

export const PHASE_NAMES: Record<PhaseId, string> = {
  1: "Mathematical Foundations",
  2: "Classical ML",
  3: "Deep Learning",
  4: "Generative AI",
  5: "Interview Prep",
};

export const PHASE_WEEK_RANGES: Record<PhaseId, [number, number]> = {
  1: [1, 10],
  2: [11, 22],
  3: [23, 34],
  4: [35, 46],
  5: [47, 52],
};

export interface CurriculumWeek {
  id: number;
  phase: PhaseId;
  phaseName: string;
  title: string;
  concept: string;
  paperTitle?: string;
  paperNote?: string;
  homework: string[];
  reflectionPrompt: string;
  xpReward: number;
}

export type BadgeId =
  | "first_step"
  | "one_month"
  | "three_months"
  | "six_months"
  | "phase_1_done"
  | "phase_2_done"
  | "phase_3_done"
  | "phase_4_done"
  | "phase_5_done"
  | "streak_7"
  | "streak_30"
  | "century"
  | "scholar"
  | "applied_scientist";

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
}

export interface UserProgress {
  currentWeek: number;
  streak: number;
  longestStreak: number;
  totalXP: number;
  completedWeeks: number[];
  badges: BadgeId[];
  lastStudyDate: string | null;
  homeworkChecked: Record<number, boolean[]>;
}
