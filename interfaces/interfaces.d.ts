import { List } from 'realm';

interface Streak {
  _id: string;
  startDate: Date;
  endDate?: Date;
  relapseNotes?: string;
  dailyReports?: List<DailyReport>;
}

interface DailyReport {
  _id: string;
  notes: string;
  createdAt: Date;
}

interface StreakGoalDuration {
  value: { minutes?: number, hours?: number, days?: number };
  label: string;
}
