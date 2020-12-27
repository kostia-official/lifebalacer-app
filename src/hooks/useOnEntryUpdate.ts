import { useOnUpdate, PromiseFn } from './useOnUpdate';

export const useOnEntryUpdate = (toCall: PromiseFn[] = []) => {
  return useOnUpdate('ENTRY_UPDATED', toCall);
};
