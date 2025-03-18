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
