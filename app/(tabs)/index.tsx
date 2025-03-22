import StreakTimer from '@/components/StreakTimer';
import { Streak } from '@/db/models/Streak';
import { seedData } from '@/db/seedData';
import { useQuery, useRealm } from '@realm/react';
import { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import StreakProgress from '@/components/StreakProgress';
import Shortcuts from '@/components/Shorcuts';
import { useCustomStopwatch } from '@/hooks/useCustomStopwatch';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery({
    type: Streak,
    query: (collection) => collection.sorted('startDate', true)
  }, []);
  
  const [lastStreak, setLastStreak] = useState<Streak | null>(null);

  useEffect(() => {
    // Seed data
    seedData(realm);
    
    // realm.write(() => {
    //   realm.create("Streak", Streak.generate());
    // });

    // Update lastStreak after seeding is complete
    setLastStreak(streaks.length > 0 ? streaks[0] : null);
  }, []);

  const {
    days,
    hours,
    minutes,
    seconds,
    reset
  } = useCustomStopwatch({ 
    offsetTimestamp: lastStreak?.startDate ?? new Date(),
    autoStart: !!lastStreak
  });

  return (
    <SafeAreaView>
      <ScrollView className="p-5" contentContainerClassName="gap-5">
        <StreakTimer 
          days={days} 
          hours={hours} 
          minutes={minutes} 
          seconds={seconds} 
        />
        {lastStreak && <StreakProgress lastStreakStartDate={lastStreak.startDate} />}
        <Shortcuts />
      </ScrollView>
    </SafeAreaView>
  );
}
