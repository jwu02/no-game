import { BSON } from "realm";
import { DailyReport } from "./models/DailyReport";
import { Streak } from "./models/Streak";

export const streaksData = [
  {
    startDate: new Date('2025-03-08'),
    endDate: new Date(),
    relapseNotes: 'Join a self improvement community, surround yourself with others who are also striving to improve themselves',
    dailyReports: [
      {
        createdAt: new Date('2025-03-08'),
        notes: 'Starting off good and strong today, I will keep pushing forward'
      },
      {
        createdAt: new Date('2025-03-09'),
        notes: 'My friends were urging to get online, but refused'
      },
    ]
  },
  {
    startDate: new Date('2025-03-02'),
    endDate: new Date('2025-03-08'),
    relapseNotes: 'Go outside, take a walk, breathe in the fresh air, and appreciate the beauty of nature',
    dailyReports: [
      {
        createdAt: new Date('2025-03-05'),
        notes: 'I need to lock in'
      },
    ]
  },
  {
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-03-02'),
    relapseNotes: 'Persistence is key, keep trying, keep pushing, keep moving forward no matter how many times you fall',
    dailyReports: []
  }
]

export const seedData = (realm: Realm) => {
  // Hard coding data seeding
  realm.write(() => {
    // Clear database on startup for testing purposes
    realm.deleteAll();

    streaksData.forEach((streak) => {
      const dailyReportEntries = streak.dailyReports.map((report) => {
        return realm.create(DailyReport, {
          _id: new BSON.ObjectId(),
          notes: report.notes,
          createdAt: report.createdAt,
        });
      });
      
      realm.create("Streak", {
        _id: new BSON.ObjectId(),
        startDate: streak.startDate,
        endDate: streak.endDate,
        relapseNotes: streak.relapseNotes,
        dailyReports: dailyReportEntries,
      });
    });

    realm.create("Streak", Streak.generate());
  });
}