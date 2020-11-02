import { DateTime } from "luxon";

export const isToday = (date: DateTime) => {
  return date.toISODate() === DateTime.local().toISODate()
}