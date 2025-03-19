import { Streak } from '@/db/models/Streak';
import { streaksData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { useStopwatch } from 'react-timer-hook';
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
  } = useStopwatch({ autoStart: true, interval: 1000, offsetTimestamp: offsetTimeStamp });

  useEffect(() => {
    reset()
  }, [offsetTimeStamp])

  // Create an array of time values with labels
  const timerValues = [
    { label: 'hours', value: hours },
    { label: 'minutes', value: minutes },
    { label: 'seconds', value: seconds },
  ];

  return (
    <SafeAreaView>
      <ScrollView className="p-5" contentContainerClassName="gap-3">
        <View className="subsection justify-center items-center !gap-0 w-full">
          <Text className="text-2xl font-semibold">{days}</Text>
          <Text className="text-gray-500">day</Text>
        </View>

        <View className="flex-row gap-3">
          {timerValues.map((value) => (
            <View className="subsection justify-center items-center !gap-0 flex-1" key={value.label}>
              <Text className="text-2xl font-semibold">{value.value}</Text>
              <Text className="text-gray-500">{value.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
