import { View, Text } from 'react-native'
import React from 'react'

interface StreakTimerProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const StreakTimer = ({ days, hours, minutes, seconds }: StreakTimerProps) => {
  const timerValues = [
    { label: 'hours', value: hours },
    { label: 'minutes', value: minutes },
    { label: 'seconds', value: seconds },
  ];

  return (
    <View className="gap-3">
      <View className="subsection items-end !gap-0">
        <Text className="text-2xl font-semibold">{days}</Text>
        <Text className="text-gray-500">days</Text>
      </View>

      <View className="flex-row gap-3">
        {timerValues.map((value) => (
          <View className="subsection justify-center items-center !gap-0 flex-1" key={value.label}>
            <Text className="text-2xl font-semibold">{value.value}</Text>
            <Text className="text-gray-500">{value.label}</Text>
          </View>
        ))}
      </View>
    </View>
  )}

export default StreakTimer