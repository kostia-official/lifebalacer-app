import { EntryResult } from '../types';

export const getEntryLabel = (entry: EntryResult) => {
  const { activity, value } = entry;
  return `${activity.emoji} ${entry.description || activity.name}${value ? ` (${value})` : ''}`;
};
