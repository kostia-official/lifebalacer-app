import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';

export const useDeleteFieldFromCache = () => {
  const client = useApolloClient();

  return useCallback(
    (field: string) => {
      client.cache.modify({
        fields: {
          [field]: (_, { DELETE }) => DELETE
        }
      });
    },
    [client.cache]
  );
};
