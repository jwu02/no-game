import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { startOfToday, isWithinInterval, startOfTomorrow } from 'date-fns';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useDailyReportStore } from '@/store';

const Shortcuts = () => {
  const router = useRouter();
  const { dailyReport, setDailyReport } = useDailyReportStore();
  const [dailyReportCompleted, setDailyReportCompleted] = useState(false);

  const isDateInRange = (date: Date) => {
    const startOfTomorrowDate = startOfTomorrow();
    const startOfTodayDate = startOfToday();

    return isWithinInterval(date, {
      start: startOfTomorrowDate,
      end: startOfTodayDate,
    });
  }

  useEffect(() => {
    if (dailyReport && isDateInRange(dailyReport.createdAt)) {
      setDailyReportCompleted(true);
    }
    else {
      setDailyReportCompleted(false);
    }
  }, [dailyReport]);
  
  const commonShortcutLabelStyles = "font-semibold text-lg";

  return (
    <View className="subsection-container">
      <Text className="subtitle">Shortcuts</Text>
      <View className="flex-row gap-3 h-28">
        <TouchableOpacity className="subsection flex-1" 
          onPress={() => router.push('/relapse-modal')}>
          <View className="flex-row items-center gap-2">
            <AntDesign name="back" size={18} />
            <Text className={commonShortcutLabelStyles}>Relapse</Text>
          </View>
          <Text className="text-gray-500">
            I've relapsed.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="subsection flex-1" disabled={dailyReportCompleted} 
          onPress={() => router.push('/daily-report-modal')}>
          <View className="flex-row items-center gap-2">
            <Feather name="edit" size={18} />
            <Text className={commonShortcutLabelStyles}>Daily Report</Text>
          </View>
          {dailyReportCompleted && (
            <View className="flex-row items-center gap-2">
              <Text className="text-gray-500">Completed</Text>
              <AntDesign name="checkcircle" size={18} color="green" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shortcuts;