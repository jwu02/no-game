import StreakTimer from '@/components/StreakTimer';
import { Streak } from '@/db/models/Streak';
import { streaksData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { BSON } from 'realm';
import StreakProgress from '@/components/StreakProgress';
import { DailyReport } from '@/db/models/DailyReport';
import Shortcuts from '@/components/Shorcuts';
import { useCustomStopwatch } from '@/hooks/useCustomStopwatch';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);
  
  const [lastStreak, setLastStreak] = useState<Streak | null>(null);

  useEffect(() => {
    // Clear database on startup for testing purposes
    realm.write(() => {
      realm.deleteAll(); 
    });
    
    // Hard coding data seeding
    realm.write(() => {
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
    });

    // Update lastStreak after seeding is complete
    setLastStreak(streaks.length > 0 ? streaks[0] : null);
  }, []);

  const {
    days,
    hours,
    minutes,
    seconds,
    reset
  } = useCustomStopwatch({ 
    offsetTimestamp: lastStreak?.startDate ?? new Date(),
    autoStart: !!lastStreak
  });

  return (
    <SafeAreaView>
      <ScrollView className="p-5" contentContainerClassName="gap-5">
        <StreakTimer 
          days={days} 
          hours={hours} 
          minutes={minutes} 
          seconds={seconds} 
        />
        {lastStreak && <StreakProgress lastStreakStartDate={lastStreak.startDate} />}
        <Shortcuts />
      </ScrollView>
    </SafeAreaView>
  );
}
