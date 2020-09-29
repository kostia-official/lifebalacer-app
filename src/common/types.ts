import { GetActivitiesQuery, GetEntriesByDayQuery } from '../generated/apollo';

export type ActivityResult = GetActivitiesQuery['activities'][0];
export type EntryResult = GetEntriesByDayQuery['entriesByDay'][0]['entries'][0];

export interface RenderDayResult {
  isMark: boolean;
  color?: string;
}
