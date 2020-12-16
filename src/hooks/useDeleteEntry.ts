import {
  useDeleteEntryMutation,
  refetchGetEntriesByOneDayQuery,
  GetEntriesByOneDayQueryResult,
  GetEntriesByOneDayDocument,
  DeleteEntryMutation,
  DeleteEntryMutationVariables,
  GetEntriesByOneDayQueryVariables
} from '../generated/apollo';
import _ from 'lodash';
import * as Apollo from '@apollo/client';

export const useDeleteEntry = (
  options?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>,
  variables?: GetEntriesByOneDayQueryVariables
) => {
  return useDeleteEntryMutation({
    ...options,
    update(cache, { data }) {
      const queryResult = cache.readQuery(
        refetchGetEntriesByOneDayQuery(variables)
      ) as GetEntriesByOneDayQueryResult['data'];

      if (!queryResult?.entriesByOneDay) return;

      cache.writeQuery({
        query: GetEntriesByOneDayDocument,
        data: {
          entriesByOneDay: {
            ...queryResult.entriesByOneDay,
            entries: _.filter(
              queryResult.entriesByOneDay?.entries,
              ({ _id }) => _id !== data?.deleteEntry
            )
          }
        }
      });
    }
  });
};
