import { DurationUnit } from 'luxon';
import { DurationType } from '../generated/apollo';
import { toLuxon } from './date';

export const goalDurationToLuxonDurationMap: Record<DurationType, DurationUnit> = {
  [DurationType.Week]: 'week',
  [DurationType.Month]: 'month'
};

export const getGoalDurationDates = ({
  durationType,
  timezone,
  recordedAt
}: {
  durationType: DurationType;
  timezone: string;
  recordedAt: string;
}) => {
  const duration = goalDurationToLuxonDurationMap[durationType];
  const recordedAtDateTime = toLuxon(recordedAt).setZone(timezone);

  const startDateTime = recordedAtDateTime.startOf(duration);
  const endDateTime = recordedAtDateTime.endOf(duration);

  return { startDateTime, endDateTime, recordedAtDateTime };
};
