import StreakTimer from '@/components/StreakTimer';
import { Streak } from '@/db/models/Streak';
import { streaksData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { BSON } from 'realm';
import { useStopwatch } from 'react-timer-hook';
import StreakProgress from '@/components/StreakProgress';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);

  const getLastStreak = () => streaks.sorted('startDate', true)[0];
  
  const [lastStreak, setLastStreak] = useState(getLastStreak());

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

    setLastStreak(getLastStreak());
  }, []);
  
  // Define the react timer/stopwatch hook
  const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true, interval: 1000, offsetTimestamp: lastStreak.startDate });

  // Reset the timer when the last streak changes (when user relapsed)
  useEffect(() => {
    reset();
  }, [lastStreak]);

  return (
    <SafeAreaView>
      <ScrollView className="p-5" contentContainerClassName="gap-5">
        <StreakTimer 
          days={days} 
          hours={hours} 
          minutes={minutes} 
          seconds={seconds} 
        />
        <StreakProgress lastStreakStartDate={lastStreak.startDate} />
      </ScrollView>
    </SafeAreaView>
  );
}
