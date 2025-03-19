import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook';

const StreakTimer = ({ offsetTimeStamp }: { offsetTimeStamp: Date }) => {
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
    <View className="gap-3">
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
    </View>
  )}

export default StreakTimer