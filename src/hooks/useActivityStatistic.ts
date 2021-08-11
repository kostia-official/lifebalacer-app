import * as Apollo from '@apollo/client';
import { NetworkStatus } from '@apollo/client';
import {
  useGetActivityStatisticQuery,
  GetActivityStatisticQuery,
  GetActivityStatisticQueryVariables
} from '../generated/apollo';
import { useRef } from 'react';

export const useActivityStatistic = (
  queryHookOptions: Apollo.QueryHookOptions<
    GetActivityStatisticQuery,
    GetActivityStatisticQueryVariables
  > = {}
) => {
  const { data, networkStatus, loading } = useGetActivityStatisticQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    ...queryHookOptions
  });

  // When new data loading still show saved in ref old data
  const dataRef = useRef(data);
  dataRef.current = data ? data : dataRef.current;

  return {
    baseStatistic: dataRef.current?.activityBaseStatistic,
    advancedStatistic: dataRef.current?.activityAdvancedStatistic,
    isUpdating: networkStatus === NetworkStatus.setVariables,
    isLoading: loading
  };
};
