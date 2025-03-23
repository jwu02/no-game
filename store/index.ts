import { DailyReport } from '@/db/models/DailyReport';
import { Streak } from '@/db/models/Streak';
import { StreakGoalDuration } from '@/interfaces/interfaces';
import { streakGoalDurationsMap } from '@/utils/utils';
import { create } from 'zustand'

interface DailyReportStore {
    dailyReport: DailyReport | null;
    setDailyReport: (dailyReport: DailyReport) => void;
}

export const useDailyReportStore = create<DailyReportStore>((set) => ({
    dailyReport: null,
    setDailyReport: (dailyReport) => set({ dailyReport }),
}))

interface StreakGoalStore {
    streakGoal: StreakGoalDuration;
    setStreakGoal: (streakGoal: StreakGoalDuration) => void;
    resetStreakGoal: () => void;
}

export const useStreakGoalStore = create<StreakGoalStore>((set) => ({
    streakGoal: streakGoalDurationsMap[0],
    setStreakGoal: (streakGoal) => set({ streakGoal }),
    resetStreakGoal: () => set({ streakGoal: streakGoalDurationsMap[0] }),
}))

interface LastStreakStore {
    lastStreak: Streak | null;
    setLastStreak: (lastStreak: Streak | null) => void;
}

export const useLastStreakStore = create<LastStreakStore>((set) => ({
    lastStreak: null,
    setLastStreak: (lastStreak) => set({ lastStreak }),
}))