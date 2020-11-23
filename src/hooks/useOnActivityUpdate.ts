import { useOnUpdate, PromiseFn } from './useOnUpdate';

export const useOnActivityUpdate = (toCall: PromiseFn[] = []) => {
  useOnUpdate('ACTIVITY_UPDATED', toCall);
};
