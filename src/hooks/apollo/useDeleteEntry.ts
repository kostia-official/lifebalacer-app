import {
  useDeleteEntryMutation,
  DeleteEntryMutation,
  DeleteEntryMutationVariables
} from '../../generated/apollo';
import * as Apollo from '@apollo/client';

export const useDeleteEntry = (
  options?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>
) => {
  return useDeleteEntryMutation({
    ...options,
    update(cache, { data }) {
      cache.modify({
        id: `Entry:${data?.deleteEntry}`,
        fields(fieldValue, document) {
          return document.DELETE;
        }
      });
    }
  });
};
