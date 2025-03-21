import { DailyReport } from '@/db/models/DailyReport';
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
}

export const useStreakGoalStore = create<StreakGoalStore>((set) => ({
    streakGoal: streakGoalDurationsMap[0],
    setStreakGoal: (streakGoal) => set({ streakGoal }),
}))