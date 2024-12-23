import { DateTime, DurationObject, DateTimeFormatOptions } from 'luxon';

export type DateAny = string | Date | DateTime;

export const toLuxon = (date: DateAny) => {
  if (date instanceof DateTime) return date;
  return DateTime.fromJSDate(new Date(date));
};

export const toZeroTimeISO = (date: DateAny) => {
  return toLuxon(date).toISODate() + 'T00:00:00.000Z';
};

export const getIsToday = (date: DateAny) => {
  return toLuxon(date).toISODate() === DateTime.local().toISODate();
};

export const getDateTitle = (date: DateAny) => {
  const headerDate = toLuxon(date).toLocaleString(DateTime.DATE_HUGE);
  return getIsToday(date) ? `Today, ${headerDate}` : headerDate;
};

export const getDayStartFromToday = (duration: DurationObject): DateTime => {
  return DateTime.local().minus(duration).startOf('day');
};

export const makeDateFormatter = (options?: DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, options);

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
