import {
  useGetSubscriptionQuery,
  SubscriptionStatus,
  GetSubscriptionQuery,
  GetSubscriptionQueryVariables
} from '../generated/apollo';
import * as Apollo from '@apollo/client';

export const useSubscriptionStatus = (
  queryHookOptions: Apollo.QueryHookOptions<
    GetSubscriptionQuery,
    GetSubscriptionQueryVariables
  > = {}
) => {
  const { data: subscriptionData, ...other } = useGetSubscriptionQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    ...queryHookOptions
  });
  const subscription = subscriptionData?.subscription;
  const isPremium = subscription?.status === SubscriptionStatus.Subscribed;

  return {
    isPremium,
    subscription,
    ...other,
    loading: !subscriptionData
  };
};
