import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useQuery, useRealm } from '@realm/react';
import { DailyReport } from '@/db/models/DailyReport';
import { useRouter } from 'expo-router';
import { Streak } from '@/db/models/Streak';
import { getLastStreak } from '@/utils/utils';
import { useDailyReportStore } from '@/store';
import Toast from 'react-native-toast-message';
const DailyReportModal = () => {
  const realm = useRealm();
  const streaks = useQuery(Streak);
  const { setDailyReport } = useDailyReportStore();

  const router = useRouter();
  
  const [text, onChangeText] = React.useState('');

  const pointsToConsider = [
    // "What happened?",
    // "What did you learn?",
    // "What can you do better next time?",
    "Did you encounter any temptations?",
    "Where and how did you encounter them?",
    "How did you handle them?",
    "What can you do better next time to avoid them?",
    "Did you notice any mood changes?"
  ]

  const MAX_REPORT_LENGTH = 600;

  const handleSaveDailyReport = () => {
    realm.write(() => {
      const newDailyReportEntry = realm.create(DailyReport, DailyReport.generate(text));
      // console.log(newDailyReportEntry);

      const streak = getLastStreak(streaks);
      streak?.dailyReports?.push(newDailyReportEntry);

      setDailyReport(newDailyReportEntry);
    });

    Toast.show({
      text1: 'Daily report entry created',
      type: 'success',
    });

    router.back();
  }

  return (
    <ScrollView className="rounded-lg">
      <View className="p-5 gap-5">
        <View className="subsection-container">
          <Text className="subtitle">Points to Consider</Text>
          <View className="subsection">
            {pointsToConsider.map((point, index) => (
              <Text key={index}>{`\u2022 ${point}`}</Text>
            ))}
          </View>
        </View>
        
        <View className="subsection-container">
          <Text className="subtitle">Daily Report</Text>
          <View className="relative">
            <TextInput
              className="subsection w-full h-96"
              editable
              multiline
              maxLength={MAX_REPORT_LENGTH}
              onChangeText={text => onChangeText(text)}
              value={text}
              scrollEnabled={false}
            />
            <Text className="text-right text-sm text-gray-500 absolute bottom-3 right-4">
              {MAX_REPORT_LENGTH - text.length}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity className="bg-green-600 mx-auto py-3 px-5 rounded-lg"
          onPress={handleSaveDailyReport}>
          <Text className="text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default DailyReportModal