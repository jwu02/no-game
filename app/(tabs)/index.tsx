import StreakTimer from '@/components/StreakTimer';
import { Streak } from '@/db/models/Streak';
import { streaksData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { BSON } from 'realm';
import { useStopwatch } from 'react-timer-hook';
import StreakProgress from '@/components/StreakProgress';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DailyReport } from '@/db/models/DailyReport';
import { getLastStreak } from '@/utils/utils';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);
  
  const [lastStreak, setLastStreak] = useState(getLastStreak(streaks));

  useEffect(() => {
    // Clear database on startup for testing purposes
    realm.write(() => {
      realm.deleteAll(); 
    });

    // Initialise the database with a single streak if it's empty
    if (streaks.isEmpty()) {
      realm.write(() => {
        realm.create(Streak, Streak.generate());
      });
    }
    
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

    setLastStreak(getLastStreak(streaks));
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
        <Shortcuts />

      </ScrollView>
    </SafeAreaView>
  );
}

const Shortcuts = () => {
  const router = useRouter();
  const [reportCompleted, setReportCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="subsection-container">
      <Text className="subtitle">Shortcuts</Text>
      <View className="flex-row gap-3">
        <TouchableOpacity className="subsection flex-1">
          <View>
            <Text>Relapse</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="subsection flex-1" disabled={reportCompleted} 
          onPress={() => router.push('/daily-report-modal')}>
          <View className="flex-row items-center gap-2">
            <Feather name="edit" size={18} />
            <Text className="font-semibold">Daily Report</Text>
          </View>
          {reportCompleted && (
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-gray-500">Completed</Text>
              <AntDesign name="checkcircle" size={18} color="green" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
