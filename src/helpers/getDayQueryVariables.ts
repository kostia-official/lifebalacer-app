import { toLuxon } from './date';

export const getDayQueryVariables = (lastDate?: string | null) => {
  if (!lastDate) return null;

  const dateAfter = toLuxon(lastDate).minus({ day: 1 }).endOf('day').toISO();

  return { dateAfter };
};
