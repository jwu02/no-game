import { 
  differenceInSeconds, 
  differenceInMinutes, 
  differenceInHours, 
  differenceInDays
} from "date-fns";

export function getDurationString(startDate: Date, endDate: Date) {
  const diffSeconds = differenceInSeconds(endDate, startDate);
  const diffMinutes = differenceInMinutes(endDate, startDate);
  const diffHours = differenceInHours(endDate, startDate);
  const diffDays = differenceInDays(endDate, startDate);

  if (diffSeconds < 60) {
    return `${diffSeconds} seconds`;
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes`;
  }

  if (diffHours < 24) {
    return `${diffHours} hours`;
  }

  return `${diffDays} days`;
}