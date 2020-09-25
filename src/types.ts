import { GetActivitiesQuery } from './generated/apollo';

export type ActivityResult = GetActivitiesQuery['activities'][0];

export interface RenderDayResult {
  isMark: boolean;
  color?: string;
}
