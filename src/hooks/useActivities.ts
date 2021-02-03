import { OnErrorParams } from './useApolloError';
import { useGetActivitiesQuery, ActivityType } from '../generated/apollo';
import { useCallback, useMemo } from 'react';
import { ActivityResult } from '../common/types';
import * as R from 'remeda';
import _ from 'lodash';
import { useOnActivityUpdate } from './useOnActivityUpdate';

export const useActivities = ({ onError }: OnErrorParams = {}) => {
  const { data, ...other } = useGetActivitiesQuery({ onError });

  useOnActivityUpdate([other.refetch]);

  const activitiesNormalized = useMemo(() => {
    if (!data?.activities) return {};

    return R.groupBy(data?.activities, ({ _id }) => _id);
  }, [data]);

  const getActivityById = useCallback(
    (activityId: string): ActivityResult | undefined => {
      const group = activitiesNormalized[activityId];

      return _.first(group);
    },
    [activitiesNormalized]
  );

  const todoistActivity = useMemo(
    () => data?.activities?.find((activity) => activity.valueType === ActivityType.Todoist),
    [data]
  );

  const activities = useMemo(() => data?.activities.filter((activity) => !activity.isArchived), [
    data
  ]);
  const archivedActivities = useMemo(
    () => data?.activities.filter((activity) => activity.isArchived),
    [data]
  );
  const allActivities: typeof activities = useMemo(
    () => _.orderBy(data?.activities, ['isArchived'], ['asc']),
    [data]
  );

  return {
    getActivityById,
    activities,
    archivedActivities,
    allActivities,
    todoistActivity,
    ...other
  };
};
