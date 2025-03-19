import StreakTimer from '@/components/StreakTimer';
import { Streak } from '@/db/models/Streak';
import { streaksData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { BSON } from 'realm';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);

  useEffect(() => {
    // Clear database on startup for testing purposes
    realm.write(() => {
      realm.deleteAll(); 
    });

    // Initialise the database with a single streak if it's empty
    if (streaks.isEmpty()) {
      realm.write(() => {
        realm.create("Streak", Streak.generate());
      });
    }
    
    // Hard coding data seeding
    realm.write(() => {
      streaksData.forEach((streak) => {
        const dailyReportEntries = streak.dailyReports.map((report) => {
          return realm.create("DailyReport", {
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
    });

  }, []);

  const [offsetTimeStamp, setOffsetTimeStamp] = useState(streaks.sorted('startDate', true)[0].startDate)

  return (
    <SafeAreaView>
      <ScrollView className="p-5">
        <StreakTimer offsetTimeStamp={offsetTimeStamp} />
      </ScrollView>
    </SafeAreaView>
  );
}
