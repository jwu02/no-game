import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SubsectionContainer from '@/components/SubsectionContainer'
import { useQuery, useRealm } from '@realm/react';
import { Streak } from '@/db/models/Streak';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useLastStreakStore, useStreakGoalStore } from '@/store';

const relapseReflectionPoints = [
  'What was the trigger for the relapse?',
  'What did you learn from this?',
  'What will you do differently next time?',
]

const MAX_REPORT_LENGTH = 1000;

const RelapseModal = () => {
  const realm = useRealm();
  const streaks = useQuery({
    type: Streak,
    query: (collection) => collection.sorted('startDate', true)
  }, []);

  const router = useRouter();

  const [relapseNotes, setRelapseNotes] = useState('');

  const { setLastStreak } = useLastStreakStore();

  const handleSaveRelapseNotes = () => {
    realm.write(() => {
      const lastStreak = streaks[0];
      lastStreak.relapseNotes = relapseNotes;
      lastStreak.endDate = new Date();

      const newStreak = realm.create(Streak, Streak.generate());
      setLastStreak(newStreak);
    });

    Toast.show({
      text1: 'Relapse notes saved',
      type: 'success'
    });

    router.back();
  }

  return (
    <ScrollView className="rounded-lg">
      <View className="p-5 gap-5">
        <SubsectionContainer title="Reflection Points">
          <>
            {relapseReflectionPoints.map((point, index) => (
              <Text key={index}>{`\u2022 ${point}`}</Text>
            ))}
          </>
        </SubsectionContainer>

        <SubsectionContainer title="Relapse Notes">
          <TextInput
            className="w-full min-h-96"
            editable
            multiline
            maxLength={MAX_REPORT_LENGTH}
            onChangeText={text => setRelapseNotes(text)}
          />
        </SubsectionContainer>

        <TouchableOpacity className="bg-green-600 mx-auto py-3 px-5 rounded-lg"
          onPress={handleSaveRelapseNotes}>
          <Text className="text-white text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default RelapseModal