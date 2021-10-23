import { DurationUnit } from 'luxon';
import { DurationType } from '../generated/apollo';
import { toLuxon } from './date';

const goalDurationToLuxonDurationMap: Record<DurationType, DurationUnit> = {
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

  const startDate = recordedAtDateTime.startOf(duration).toISO();
  const endDate = recordedAtDateTime.endOf(duration).toISO();

  return { startDate, endDate, recordedAt };
};
