import "./global.css";
import { Stack } from 'expo-router/stack';
import { RealmProvider } from '@realm/react';
import { schemas } from "@/db/models";
import { StreakGoalProvider } from "@/contexts/StreakGoalContext";
import { DailyReportProvider } from "@/contexts/DailyReportContext";

export default function Layout() {
  return (
    <RealmProvider schema={schemas}>
      <StreakGoalProvider>
        <DailyReportProvider>
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
        </DailyReportProvider>
      </StreakGoalProvider>
    </RealmProvider>
  );
}
