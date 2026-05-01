"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BadgeId } from "@/types/curriculum";
import { computeNewBadges } from "@/lib/badges";
import { curriculum } from "@/data/curriculum";

export const XP_MILESTONES = [0, 200, 500, 1000, 2000, 3500, 5200, 7000, 10000];

export function getLevel(xp: number): {
  level: number;
  nextThreshold: number;
  prevThreshold: number;
} {
  let level = 0;
  for (let i = 0; i < XP_MILESTONES.length; i++) {
    if (xp >= XP_MILESTONES[i]) level = i + 1;
    else break;
  }
  const idx = level - 1;
  return {
    level,
    prevThreshold: XP_MILESTONES[idx] ?? 0,
    nextThreshold: XP_MILESTONES[idx + 1] ?? XP_MILESTONES[XP_MILESTONES.length - 1],
  };
}

interface ProgressState {
  currentWeek: number;
  streak: number;
  longestStreak: number;
  totalXP: number;
  completedWeeks: number[];
  badges: BadgeId[];
  lastStudyDate: string | null;
  homeworkChecked: Record<number, boolean[]>;

  isWeekCompleted: (weekId: number) => boolean;
  isWeekUnlocked: (weekId: number) => boolean;

  completeWeek: (weekId: number) => void;
  toggleHomework: (weekId: number, index: number) => void;
  updateStreak: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      currentWeek: 1,
      streak: 0,
      longestStreak: 0,
      totalXP: 0,
      completedWeeks: [],
      badges: [],
      lastStudyDate: null,
      homeworkChecked: {},

      isWeekCompleted: (weekId) => get().completedWeeks.includes(weekId),

      isWeekUnlocked: (weekId) => {
        if (weekId === 1) return true;
        return get().completedWeeks.includes(weekId - 1);
      },

      completeWeek: (weekId) => {
        const state = get();
        if (state.completedWeeks.includes(weekId)) return;

        const week = curriculum.find((w) => w.id === weekId);
        if (!week) return;

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

        let newStreak = state.streak;
        if (state.lastStudyDate === yesterday) {
          newStreak = state.streak + 1;
        } else if (state.lastStudyDate !== today) {
          newStreak = 1;
        }

        const streakBonus = newStreak >= 7 ? 50 : newStreak >= 3 ? 25 : 0;
        const xpGained = week.xpReward + streakBonus;
        const newXP = state.totalXP + xpGained;
        const newCompleted = [...state.completedWeeks, weekId];
        const newCurrentWeek = Math.max(state.currentWeek, weekId + 1);

        const draft = {
          ...state,
          completedWeeks: newCompleted,
          totalXP: newXP,
          streak: newStreak,
        };
        const newBadges = computeNewBadges(draft);

        set({
          completedWeeks: newCompleted,
          currentWeek: newCurrentWeek,
          totalXP: newXP,
          streak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastStudyDate: today,
          badges: [...state.badges, ...newBadges],
        });
      },

      toggleHomework: (weekId, index) => {
        const state = get();
        const weekHomework = state.homeworkChecked[weekId] ?? [];
        const week = curriculum.find((w) => w.id === weekId);
        const length = week?.homework.length ?? 4;
        const current = Array.from({ length }, (_, i) => weekHomework[i] ?? false);
        current[index] = !current[index];
        set({ homeworkChecked: { ...state.homeworkChecked, [weekId]: current } });
      },

      updateStreak: () => {
        const state = get();
        if (!state.lastStudyDate) return;
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        if (state.lastStudyDate !== today && state.lastStudyDate !== yesterday) {
          set({ streak: 0 });
        }
      },
    }),
    {
      name: "applied-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
