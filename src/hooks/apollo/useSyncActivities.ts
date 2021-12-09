import { OnErrorParams } from './useApolloError';
import { useGetActivitiesQuery } from '../../generated/apollo';
import { useSyncedCachePolicy } from './useSyncedCachePolicy';

export const useSyncActivities = ({ onError }: OnErrorParams) => {
  const syncedCachePolicy = useSyncedCachePolicy();

  useGetActivitiesQuery({ onError, ...syncedCachePolicy });
};
