import { View, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { add, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStreakGoal } from '@/contexts/StreakGoalContext';
import { streakGoalDurationsMap } from '@/utils/utils';

interface StreakGoalProps {
  lastStreakStartDate: Date;
}

const StreakProgress = ({ lastStreakStartDate }: StreakGoalProps) => {
  const { streakGoal, setStreakGoal } = useStreakGoal();

  const streakGoalDate = add(lastStreakStartDate, streakGoal.value);

  const now = new Date();
  const totalSeconds = streakGoalDate.getTime() - lastStreakStartDate.getTime();
  const lapseSeconds = now.getTime() - lastStreakStartDate.getTime();

  const progress = lapseSeconds / totalSeconds;

  // Calculate remaining time
  // const remainingTimeDuration = intervalToDuration({ start: now, end: streakGoal });
  const remainingTime = streakGoalDate.getTime() - now.getTime();

  useEffect(() => {
    if (remainingTime < 0) {
      const nextStreakGoal = streakGoalDurationsMap[streakGoalDurationsMap.findIndex((goal) => goal.value === streakGoal.value) + 1];
      setStreakGoal(nextStreakGoal);
    }
  }, [remainingTime, streakGoal]);

  const remainingTimeDuration = {
    days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((remainingTime % (1000 * 60)) / 1000)
  };

  const [showRemainingTime, setShowRemainingTime] = useState(false);

  // // Switch the progress label between remaining time and percentage periodically
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowRemainingTime((prev) => !prev);
  //   }, 10000); // 10 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  const router = useRouter();
  
  return (
    <View className="subsection-container">
      <View className="flex-row justify-between">
        <Text className="subtitle">Progress</Text>
        <TouchableOpacity className="flex-row items-center mr-4 gap-2"
          onPress={() => router.push({
            pathname: "/setgoal",
            params: {
              lastStreakStartDate: lastStreakStartDate.toISOString(),
            }
          })}>
          <Text className="font-medium uppercase">Set Goal</Text>
          <FontAwesome name="arrow-right" />
        </TouchableOpacity>
      </View>

      <View className="subsection !gap-4">
        <View className="flex-row justify-between gap-3">
          <Text>Try to reach your goal!</Text>
          <TouchableOpacity onPress={() => setShowRemainingTime(!showRemainingTime)}>
            {showRemainingTime ? (
              <Text>
                {[
                  { value: remainingTimeDuration.days, unit: 'd' },
                  { value: remainingTimeDuration.hours, unit: 'h' },
                  { value: remainingTimeDuration.minutes, unit: 'm' },
                  { value: remainingTimeDuration.seconds, unit: 's' }
                ]
                  .filter(({ value }) => value && value > 0)
                  .map(({ value, unit }) => `${value}${unit}`)
                  .join(' ')} remaining
              </Text>
            ) : (
              <Text>{Math.round(progress*100)}%</Text>
            )}
          </TouchableOpacity>
        </View>
        <Progress.Bar
          progress={progress} 
          width={null} 
          height={10} 
          color="black" 
          borderRadius={10}
          borderWidth={0}
          unfilledColor="lightgrey"
        />
      </View>
    </View>
  )
}

export default StreakProgress;