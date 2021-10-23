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
