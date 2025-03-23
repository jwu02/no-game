import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useQuery, useRealm } from '@realm/react';
import { DailyReport } from '@/db/models/DailyReport';
import { useRouter } from 'expo-router';
import { Streak } from '@/db/models/Streak';
import { getLastStreak } from '@/utils/utils';
import { useDailyReportStore } from '@/store';
import Toast from 'react-native-toast-message';
import SubsectionContainer from '@/components/SubsectionContainer';

const DailyReportModal = () => {
  const realm = useRealm();
  const streaks = useQuery(Streak);
  const { setDailyReport } = useDailyReportStore();

  const router = useRouter();
  
  const [text, onChangeText] = React.useState('');

  const pointsToConsider = [
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
        <SubsectionContainer title="Reflection Points">
          {pointsToConsider.map((point, index) => (
            <Text key={index}>{`\u2022 ${point}`}</Text>
          ))}
        </SubsectionContainer>
        
        <SubsectionContainer title="Daily Report">
          <View className="relative">
            <TextInput
              className="w-full min-h-96"
              editable
              multiline
              maxLength={MAX_REPORT_LENGTH}
              onChangeText={text => onChangeText(text)}
              value={text}
              scrollEnabled={false}
            />
            <Text className="text-right text-sm text-gray-500 absolute bottom-0 right-0">
              {MAX_REPORT_LENGTH - text.length}
            </Text>
          </View>
        </SubsectionContainer>
        
        <TouchableOpacity className="bg-green-600 mx-auto py-3 px-5 rounded-lg"
          onPress={handleSaveDailyReport}>
          <Text className="text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default DailyReportModal