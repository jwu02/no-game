import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { streakGoalDurationsMap } from '@/utils/utils'
import FlatListDivider from '@/components/FlatListDivider'
import { AntDesign } from '@expo/vector-icons'
import { add } from 'date-fns'
import { fractionalDaysToHours } from '@/utils/utils'
import { useStreakGoal } from '@/contexts/StreakGoalContext'

type Item = { item: StreakGoalDuration }

const SetGoal = () => {
  const { lastStreakStartDate } = useLocalSearchParams();
  const { setStreakGoal } = useStreakGoal();

  return (
    <>
      <Stack.Screen options={{
        title: 'Set Goal',
        headerBackTitle: 'Back',
      }} />

      <ScrollView>
        <View className="subsection-container m-5 mb-20">
          <Text className="subtitle">Goals</Text>
          <FlatList
            className="subsection"
            data={streakGoalDurationsMap}
            keyExtractor={(item) => item.label}
            renderItem={({ item }: Item) => {
              // These dates are used to disable goals that are in the past
              const now = new Date();
              const goalEndDate = add(new Date(lastStreakStartDate as string).getTime(), 
                item.value);
              const disableGoal = now.getTime() > goalEndDate.getTime();
              
              return (
                <TouchableOpacity className="flex-row justify-between" 
                  disabled={disableGoal}
                  onPress={() => {
                    console.log('goalEndDate', goalEndDate)
                    setStreakGoal(item)
                  }}
                >
                  <Text className={disableGoal ? 'text-gray-500 line-through' : ''}>{item.label}</Text>
                  {disableGoal ? 
                    <AntDesign name="checkcircle" size={16} color="black" /> : 
                    <AntDesign name="checkcircleo" size={16} color="black" />
                  }
                </TouchableOpacity>
            )}}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <FlatListDivider />}
          />
        </View>
      </ScrollView>
    </>
  )
}

export default SetGoal