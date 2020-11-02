import { OnErrorParams } from './useApolloError';
import { useGetActivitiesQuery, ActivityType } from '../generated/apollo';
import { useCallback, useMemo } from 'react';
import { ActivityResult } from '../common/types';
import * as R from 'remeda';

export const useActivities = ({ onError }: OnErrorParams = {}) => {
  const { data, ...other } = useGetActivitiesQuery({ onError });
  const activitiesNormalized = useMemo(() => {
    if (!data?.activities) return {};

    return R.groupBy(data?.activities, ({ _id }) => _id);
  }, [data]);

  const getActivityById = useCallback(
    (activityId: string): ActivityResult => {
      return activitiesNormalized[activityId][0];
    },
    [activitiesNormalized]
  );

  const todoistActivity = useMemo(
    () => data?.activities?.find((activity) => activity.valueType === ActivityType.Todoist),
    [data]
  );

  return { getActivityById, activities: data?.activities, todoistActivity, ...other };
};
