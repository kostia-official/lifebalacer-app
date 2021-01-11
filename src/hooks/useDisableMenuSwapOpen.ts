import { useEffect } from 'react';
import { isSwipeHandlersEnabledVar } from '../reactiveState';

export const useDisableMenuSwapOpen = () => {
  useEffect(() => {
    isSwipeHandlersEnabledVar(false);

    return () => {
      isSwipeHandlersEnabledVar(true);
    };
  }, []);
};
