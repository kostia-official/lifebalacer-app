import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';

export const useDeleteFieldFromCache = () => {
  const { cache } = useApolloClient();

  return useCallback(
    (fieldName: string) => {
      cache.evict({ id: 'ROOT_QUERY', fieldName });
      cache.gc();
    },
    [cache]
  );
};
