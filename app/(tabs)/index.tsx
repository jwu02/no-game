import { Streak } from '@/db/models/Streak';
import { useQuery, useRealm } from '@realm/react';
import { useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);

  return (
    <View className='justify-center items-center'>
      

    </View>
  );
}
