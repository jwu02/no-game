interface Streak {
  _id: string
  startDate: Date;
  endDate?: Date;
  relapseNotes?: string;
  dailyReports?: DailyReport[];
}

interface DailyReport {
  _id: string;
  notes: string;
  createdAt: Date;
}
