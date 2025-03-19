import StreakTimer from '@/components/StreakTimer';
import { Streak } from '@/db/models/Streak';
import { streaksData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { BSON } from 'realm';
import * as Progress from 'react-native-progress';
import { differenceInSeconds } from 'date-fns';
import { useStopwatch } from 'react-timer-hook';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);

  const getLastStreak = () => streaks.sorted('startDate', true)[0]
  
  const [lastStreak, setLastStreak] = useState(getLastStreak())
  const [streakGoal, setStreakGoal] = useState(new Date('2025-03-19 18:30:00'))

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

    setLastStreak(getLastStreak())
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
    reset()
  }, [lastStreak]);

  return (
    <SafeAreaView>
      <ScrollView className="p-5" contentContainerClassName="gap-3">
        <StreakTimer 
          days={days} 
          hours={hours} 
          minutes={minutes} 
          seconds={seconds} 
        />
        <StreakProgress 
          lastStreakStartDate={lastStreak.startDate} 
          streakGoal={streakGoal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

interface StreakGoalProps {
  lastStreakStartDate: Date;
  streakGoal: Date;
}

const StreakProgress = ({ lastStreakStartDate, streakGoal }: StreakGoalProps) => {
  const totalSeconds = differenceInSeconds(streakGoal, lastStreakStartDate)
  const lapseSeconds = differenceInSeconds(new Date(), lastStreakStartDate)
  const progress = lapseSeconds / totalSeconds
  
  return (
    <View className="subsection-container">
      <Text className="subtitle">Progress</Text>
      <View className="subsection !gap-4">
        <View className="flex-row justify-between gap-3">
          <Text>Try to reach your goal!</Text>
          <Text>{Math.round(progress*10000)/100}%</Text>
        </View>
        <Progress.Bar progress={progress} width={null} height={10} color="black" />
      </View>
    </View>
  )
}
