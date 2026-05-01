import type { BadgeId, Badge, UserProgress } from "@/types/curriculum";

export const BADGES: Record<BadgeId, Badge> = {
  first_step:        { id: "first_step",        name: "First Step",        description: "Complete your first week",         icon: "Star" },
  one_month:         { id: "one_month",          name: "One Month In",      description: "Complete 4 weeks",                 icon: "Calendar" },
  three_months:      { id: "three_months",       name: "Three Months",      description: "Complete 13 weeks",                icon: "TrendingUp" },
  six_months:        { id: "six_months",         name: "Half Year",         description: "Complete 26 weeks",                icon: "Star" },
  phase_1_done:      { id: "phase_1_done",       name: "Mathematician",     description: "Complete Math Foundations phase",  icon: "Brain" },
  phase_2_done:      { id: "phase_2_done",       name: "ML Practitioner",   description: "Complete Classical ML phase",      icon: "TrendingUp" },
  phase_3_done:      { id: "phase_3_done",       name: "Deep Thinker",      description: "Complete Deep Learning phase",     icon: "Zap" },
  phase_4_done:      { id: "phase_4_done",       name: "GenAI Native",      description: "Complete Generative AI phase",     icon: "Sparkles" },
  phase_5_done:      { id: "phase_5_done",       name: "Interview Ready",   description: "Complete all interview prep",      icon: "Trophy" },
  streak_7:          { id: "streak_7",           name: "Consistent",        description: "Maintain a 7-day streak",          icon: "Flame" },
  streak_30:         { id: "streak_30",          name: "Unstoppable",       description: "Maintain a 30-day streak",         icon: "Zap" },
  century:           { id: "century",            name: "Centurion",         description: "Earn 1,000 XP",                    icon: "Award" },
  scholar:           { id: "scholar",            name: "Scholar",           description: "Earn 5,000 XP",                    icon: "GraduationCap" },
  applied_scientist: { id: "applied_scientist",  name: "Applied Scientist", description: "Complete all 52 weeks",            icon: "Crown" },
};

export function computeNewBadges(progress: UserProgress): BadgeId[] {
  const earned = new Set(progress.badges);
  const completed = new Set(progress.completedWeeks);
  const newBadges: BadgeId[] = [];

  const check = (id: BadgeId, condition: boolean) => {
    if (condition && !earned.has(id)) newBadges.push(id);
  };

  check("first_step",        completed.size >= 1);
  check("one_month",         completed.size >= 4);
  check("three_months",      completed.size >= 13);
  check("six_months",        completed.size >= 26);
  check("phase_1_done",      [1,2,3,4,5,6,7,8,9,10].every(w => completed.has(w)));
  check("phase_2_done",      Array.from({length: 12}, (_, i) => i + 11).every(w => completed.has(w)));
  check("phase_3_done",      Array.from({length: 12}, (_, i) => i + 23).every(w => completed.has(w)));
  check("phase_4_done",      Array.from({length: 12}, (_, i) => i + 35).every(w => completed.has(w)));
  check("phase_5_done",      [47,48,49,50,51,52].every(w => completed.has(w)));
  check("streak_7",          progress.streak >= 7);
  check("streak_30",         progress.streak >= 30);
  check("century",           progress.totalXP >= 1000);
  check("scholar",           progress.totalXP >= 5000);
  check("applied_scientist", completed.size === 52);

  return newBadges;
}
