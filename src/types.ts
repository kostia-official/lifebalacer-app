import { GetActivitiesQuery } from './generated/apollo';

export type ActivityResult = GetActivitiesQuery['activities'][0];
