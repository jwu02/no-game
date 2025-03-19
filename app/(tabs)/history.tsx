import FlatListDivider from '@/components/FlatListDivider';
import { Streak } from '@/db/models/Streak';
import { getDurationString } from '@/utils/utils';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useQuery, useRealm } from '@realm/react';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';

export default function Tab() {
  const realm = useRealm();
  const streaks = useQuery(Streak);

  const [currentDate, setCurrentDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      setCurrentDate(new Date());

      // return () => {
      //   // Cleanup if necessary
      //   console.log('Screen is unfocused');
      // };
    }, [])
  );

  const router = useRouter();

  return (
    <ScrollView className="p-5">
      <View className="subsection-container">
        <Text className="subtitle">Streaks</Text>
        <FlatList
          className="subsection"
          data={streaks.sorted("startDate", true)}
          keyExtractor={(item) => item._id.toHexString()}
          renderItem={({ index, item }) => {
            const streakNumber = streaks.length - index;
            const durationString = getDurationString(item.startDate, item.endDate || currentDate);

            return (
              <TouchableOpacity
                onPress={() => router.push({
                  pathname: "/streaks/[id]",
                  params: {
                    id: item._id.toHexString(),
                    streakNumber: streakNumber,
                    durationString: durationString,
                  }
                })}
              >
                <View className="flex-row gap-5 items-center">
                  <View className="gap-2 flex-1">
                    <Text>Streak #{streakNumber}</Text>
                    <View className="flex-row gap-2 items-center">
                      <Text className="text-gray-500">
                        {item.startDate.toLocaleDateString()}
                      </Text>
                      <FontAwesome6 name="arrow-right-long" color="grey" />
                      <Text className="text-gray-500">
                        {item.endDate?.toLocaleDateString() || "ongoing"}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-500">{durationString}</Text>

                  <FontAwesome name="angle-right" size={18} color="grey" />
                </View>
              </TouchableOpacity>
            );
          }}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <FlatListDivider />}
        />
      </View>
    </ScrollView>
  );
}
