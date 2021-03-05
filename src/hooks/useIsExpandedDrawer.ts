import { ReactiveVar, makeVar, useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';

const KEY = 'isExpandedDrawer';

const storedValue = localStorage.getItem(KEY);

export const isExpandedDrawerVar: ReactiveVar<boolean> = makeVar<boolean>(
  storedValue ? storedValue === 'true' : true
);

export const useIsExpandedDrawer = () => {
  const isExpandedDrawer = useReactiveVar(isExpandedDrawerVar);

  const setIsExpandedDrawer = useCallback((value: boolean) => {
    isExpandedDrawerVar(value);
    localStorage.setItem(KEY, String(value));
  }, []);

  return { isExpandedDrawer, setIsExpandedDrawer };
};
