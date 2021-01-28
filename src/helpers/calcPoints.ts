import { ActivityResult } from '../common/types';
import { PointsType } from '../generated/apollo';

export const calcPoints = (activity: ActivityResult, value: number | null | undefined) => {
  if (activity.pointsType === PointsType.Linear) return activity.points * (value ?? 1);

  return activity.points;
};
