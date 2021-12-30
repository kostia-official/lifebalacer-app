import { makeVar, useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { LocalStorageHelper } from '../helpers/localStorageHelper';

export type SetterCb<T> = (prev: T) => T;

export const makeLocalStorageState = <T extends object>(key: string, defaultValue: T) => {
  const localStorageHelper = new LocalStorageHelper<T>(key, defaultValue);

  const initialValue = { ...defaultValue, ...localStorageHelper.get() };

  localStorageHelper.set(initialValue);
  const reactiveVar = makeVar<T>(initialValue);

  return (): [T, (newValue: T | SetterCb<T>) => void, () => void] => {
    const value = useReactiveVar(reactiveVar);

    const setter = useCallback(
      (arg: T | SetterCb<T>) => {
        if (typeof arg === 'function') {
          // @ts-ignore
          const newValue = arg(value);

          localStorageHelper.set(value);
          return reactiveVar(newValue);
        }

        localStorageHelper.set(arg);
        return reactiveVar(arg);
      },
      [value]
    );

    const clear = useCallback(() => {
      reactiveVar(undefined);
      localStorageHelper.clear();
    }, []);

    return [value, setter, clear];
  };
};
