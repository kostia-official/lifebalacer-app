import { OnErrorParams } from './useApolloError';
import { useGetActivitiesQuery } from '../generated/apollo';
import { useCallback, useMemo } from 'react';
import { ActivityResult } from '../common/types';
import * as R from 'remeda';

export const useActivities = ({ onError }: OnErrorParams = {}) => {
  const { data } = useGetActivitiesQuery({ onError });
  const activitiesNormalized = useMemo(() => {
    if (!data?.activities) return {};

    return R.groupBy(data?.activities, ({ _id }) => _id);
  }, [data]);

  const getByActivityId = useCallback(
    (activityId: string): ActivityResult => {
      return activitiesNormalized[activityId][0];
    },
    [activitiesNormalized]
  );

  return { getByActivityId };
};
