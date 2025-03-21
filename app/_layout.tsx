import "./global.css";
import { Stack } from 'expo-router/stack';
import { RealmProvider } from '@realm/react';
import { schemas } from "@/db/models";
import { StreakGoalProvider } from "@/contexts/StreakGoalContext";

export default function Layout() {
  return (
    <RealmProvider schema={schemas}>
      <StreakGoalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="daily-report-modal" 
            options={{
              presentation: 'modal',
              headerShown: false,
            }} 
          />
        </Stack>
      </StreakGoalProvider>
    </RealmProvider>
  );
}
