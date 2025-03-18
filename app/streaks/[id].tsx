import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { useQuery, useRealm } from '@realm/react';
import { ObjectId } from 'bson';
import { Realm } from '@realm/react'
import { Streak } from '@/db/models/Streak';
import FlatListDivider from '@/components/FlatListDivider';

export default function StreakDetails() {
  const { id: streakId, streakNumber, durationString } = useLocalSearchParams();

  const realm = useRealm();
  // const streak = realm.objectForPrimaryKey('Streak', new Realm.BSON.ObjectId(streakId));

  const streaks = useQuery(Streak);
  const streak = streaks.find((streak) => streak._id.toHexString() === streakId);

  const summaryData = [
    { label: 'Duration', value: durationString },
    { label: 'Start Date', value: streak?.startDate.toLocaleString() },
    { label: 'End Date', value: streak?.endDate?.toLocaleString() || "-" },
  ];

  return (
    <>
      {/* Dynamically set the page title */}
      <Stack.Screen options={{ title: `Streak #${streakNumber}` }} />
      
      <ScrollView
        className="p-5"
        contentContainerClassName="gap-5"
      >
        {/* Summary section */}
        <View className="subsection-container">
          <Text className="subtitle">Summary</Text>
          <View className="subsection">
            {summaryData.map((data, index) => (
              <View key={index} className="flex-row justify-between">
                <Text>{data.label}</Text>
                <Text>{data.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Relapse notes section */}
        <View className="subsection-container">
          <Text className="subtitle">Relapse Notes</Text>
          <View className="subsection">
            {streak?.relapseNotes ?
              <Text>{streak?.relapseNotes}</Text> :
              <Text className="m-auto font-semibold text-gray-500">Nothing recorded.</Text>
            }
          </View>
        </View>

        {/* Daily reports section */}
        <View className="subsection-container">
          <Text className="subtitle">Daily Reports</Text>
          <View className="subsection">
            {streak && streak.dailyReports?.length ?
              <FlatList
                data={streak?.dailyReports.sorted("createdAt", true)}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View className="flex-column justify-between gap-1">
                    <Text>{item.createdAt?.toLocaleDateString()}</Text>
                    <Text>{item.notes}</Text>
                  </View>
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <FlatListDivider />}
              />
              : 
              <Text className="m-auto font-semibold text-gray-500">Nothing recorded.</Text>
            }
            
          </View>
        </View>
      </ScrollView>
    </>
  )
}
