import {
  useGetActiveSubscription,
  GetActiveSubscriptionQuery,
  GetActiveSubscriptionQueryVariables
} from '../../generated/apollo';
import * as Apollo from '@apollo/client';
import { useSyncedCachePolicy } from './useSyncedCachePolicy';

export interface HookArgs
  extends Apollo.QueryHookOptions<GetActiveSubscriptionQuery, GetActiveSubscriptionQueryVariables> {
  withSyncedCachePolicy?: boolean;
}

export const useActiveSubscription = (options: HookArgs = {}) => {
  const syncedCachePolicy = useSyncedCachePolicy();
  const syncedCachePolicyOptional = options.withSyncedCachePolicy ? syncedCachePolicy : {};

  const { data: subscriptionData, ...other } = useGetActiveSubscription({
    notifyOnNetworkStatusChange: true,
    ...syncedCachePolicyOptional,
    ...options
  });
  const subscription = subscriptionData?.activeSubscription;

  return {
    isPremium: !!subscription,
    subscription,
    ...other,
    loading: !subscriptionData
  };
};
