import { makeVar, useReactiveVar } from '@apollo/client';

export type SetterCb<T> = (prev: T) => T;

export const makeGlobalState = <T>(defaultValue: T) => {
  const reactiveVar = makeVar<T>(defaultValue);

  return (): [T, (newValue: T | SetterCb<T>) => void] => {
    const value = useReactiveVar(reactiveVar);

    const setter = (arg: T | SetterCb<T>) => {
      if (typeof arg === 'function') {
        // @ts-ignore
        return reactiveVar(arg(value));
      }

      return reactiveVar(arg);
    };

    return [value, setter];
  };
};
