import { useOnUpdate, PromiseFn } from './useOnUpdate';

export const useOnEntryUpdate = (toCall: PromiseFn[] = []) => {
  useOnUpdate('ENTRY_UPDATED', toCall);
};
