import "./global.css";
import { Stack } from 'expo-router/stack';
import { RealmProvider } from '@realm/react';
import { schemas } from "@/db/models";
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <RealmProvider schema={schemas}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="relapse-modal"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="daily-report-modal" 
          options={{
            presentation: 'modal',
            headerShown: false,
          }} 
        />
      </Stack>
      <Toast />
    </RealmProvider>
  );
}
