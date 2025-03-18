import "./global.css";
import { Stack } from 'expo-router/stack';
import { RealmProvider } from '@realm/react';
import { Streak } from "@/db/models/Streak";
import { DailyReport } from "@/db/models/DailyReport";
import { schemas } from "@/db/models";

export default function Layout() {
  return (
    <RealmProvider schema={schemas}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RealmProvider>
  );
}
