import * as Apollo from '@apollo/client';
import {
  GetActivityAdvancedStatisticQuery,
  GetActivityAdvancedStatisticQueryVariables,
  useGetActivityAdvancedStatisticQuery
} from '../generated/apollo';
import { useRef, useState } from 'react';
import { WatchQueryFetchPolicy, NetworkStatus } from '@apollo/client/core';

export const useActivityAdvancedStatistic = (
  queryHookOptions: Apollo.QueryHookOptions<
    GetActivityAdvancedStatisticQuery,
    GetActivityAdvancedStatisticQueryVariables
  > = {}
) => {
  const [fetchPolicy, setFetchPolicy] = useState<WatchQueryFetchPolicy>('cache-and-network');

  const { data, networkStatus } = useGetActivityAdvancedStatisticQuery({
    ...queryHookOptions,
    fetchPolicy,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setFetchPolicy('cache-first');
    }
  });

  const statisticRef = useRef(data?.activityAdvancedStatistic);

  statisticRef.current = data?.activityAdvancedStatistic
    ? data?.activityAdvancedStatistic
    : statisticRef.current;

  return {
    statistic: statisticRef.current,
    isUpdating: networkStatus === NetworkStatus.setVariables
  };
};
