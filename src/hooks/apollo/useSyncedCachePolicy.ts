import { useCallback } from 'react';
import { WatchQueryFetchPolicy } from '@apollo/client/core';
import { createGlobalState } from 'react-use';

export interface HookResult {
  fetchPolicy: WatchQueryFetchPolicy;
  onCompleted: () => void;
}

const useIsCalled = createGlobalState(false);

export const useSyncedCachePolicy = (): HookResult => {
  const [isCalled, setIsCalled] = useIsCalled();

  const onCompleted = useCallback(() => {
    setIsCalled(true);
  }, [setIsCalled]);

  return { fetchPolicy: isCalled ? 'cache-first' : 'cache-and-network', onCompleted };
};

export const useGetSyncedCachePolicy = () => {
  const [isCalled, setIsCalled] = useIsCalled();

  const getSyncedCachePolicy = useCallback(
    ({ onCompleted }: { onCompleted?: () => void } = {}): HookResult => {
      return {
        fetchPolicy: isCalled ? 'cache-first' : 'cache-and-network',
        onCompleted: () => {
          setIsCalled(true);
          onCompleted?.();
        }
      };
    },
    [isCalled, setIsCalled]
  );

  return { getSyncedCachePolicy };
};
