import { Streak } from "@/db/models/Streak";
import { 
  differenceInSeconds, 
  differenceInMinutes, 
  differenceInHours, 
  differenceInDays
} from "date-fns";
import { Results } from "realm";

export function getDurationString(startDate: Date, endDate: Date) {
  const diffSeconds = differenceInSeconds(endDate, startDate);
  const diffMinutes = differenceInMinutes(endDate, startDate);
  const diffHours = differenceInHours(endDate, startDate);
  const diffDays = differenceInDays(endDate, startDate);

  let unit;
  let value;

  if (diffSeconds < 60) {
    unit = 'second';
    value = diffSeconds;
  } else if (diffMinutes < 60) {
    unit = 'minute';
    value = diffMinutes;
  } else if (diffHours < 24) {
    unit = 'hour';
    value = diffHours;
  } else {
    unit = 'day';
    value = diffDays;
  }

  if (value !== 1) {
    unit += 's';
  }

  return `${value} ${unit}`;
}

// Streak goal durations in minutes, hours, days
const streakGoalMinuteDurations = [1, 5, 10, 30]
const streakGoalHourDurations = [1, 2, 4, 8, 12, 16]
const streakGoalDayDurations = [
  ...Array.from({length: 21}, (_, i) => i + 1), // 1 day to 21 days, interval of 1 day
  ...Array.from({length: 16}, (_, i) => 25 + (i * 5)), // 25 days to 100 days, interval of 5 days
  ...Array.from({length: 8}, (_, i) => 110 + (i * 10)), // 110 days to 180 days, interval of 10 days
  ...Array.from({length: 5}, (_, i) => 210 + (i * 30)), // 210 days to 330 days, interval of 30 days
  365,
  ...Array.from({length: 7}, (_, i) => 400 + (i * 100)), // 400 days to 1000 days, interval of 1000 days
]

// Map durations to readable strings
export const streakGoalDurationsMap = [
  ...streakGoalMinuteDurations.map(duration => {
    return { label: `${duration} minutes`, value: { minutes: duration }};
  }),
  ...streakGoalHourDurations.map(duration => {
    return { label: `${duration} hours`, value: { hours: duration }};
  }),
  ...streakGoalDayDurations.map(duration => {
    return { label: `${duration} days`, value: { days: duration }};
})];

export const getLastStreak = (streaks: Results<Streak>) => streaks.sorted('startDate', true)[0];