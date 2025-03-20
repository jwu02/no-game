import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
// import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function TabLayout() {
  // const { width } = useWindowDimensions();
  // const buttonWidth = width * 0.35; // Button takes 80% of screen width
  
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'black',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
          // headerTitle: () => (
          //   <View className="flex-row items-center w-full">
          //     <Text className="text-lg font-semibold text-center">History</Text>
          //     <TouchableOpacity
          //       className="absolute"
          //       style={{ right: -buttonWidth }}
          //     >
          //       <FontAwesome name="trash" size={20}  color="red" />
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />
    </Tabs>
  )
}
