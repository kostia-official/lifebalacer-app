import { GetActivitiesQuery, GetEntriesByDayQuery } from '../generated/apollo';

export type ActivityResult = GetActivitiesQuery['activities'][0];
export type DayResult = GetEntriesByDayQuery['entriesByDay'][0];
export type EntriesResult = DayResult['entries'];
export type EntryResult = EntriesResult[0];

export interface RenderDayResult {
  isMark: boolean;
  color?: string;
}

export type SelectedEntry = EntryResult;

export interface ChartData {
  xValue: number | string;
  yValue: number;
}

export interface Extremes {
  min: number;
  max: number;
}
