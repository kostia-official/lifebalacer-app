import { useCallback } from 'react';
import { useSetState } from 'react-use';
import { makeLocalStorageState } from './makeLocalStorageState';
import { isDeepEqual } from '../helpers/object';

export interface Options<T> {
  ignoreCountIncrementFields?: T[];
}

export const makePersistOptions = <T extends object>(
  key: string,
  initialData: T,
  { ignoreCountIncrementFields }: Options<keyof T> = {}
) => {
  const useOptionsPersistState = makeLocalStorageState<T>(key, initialData);

  return () => {
    const [persistOptions, setPersistOptions] = useOptionsPersistState();
    const [selectedOptions, setSelectedOptions] = useSetState<T>(persistOptions);

    const count = persistOptions
      ? Object.entries(persistOptions).reduce((acc, [field, value]) => {
          if (ignoreCountIncrementFields?.includes(field as keyof T)) return acc;

          if (Array.isArray(value) && value.length > 0) return acc + 1;
          if (!Array.isArray(value) && value) return acc + 1;

          return acc;
        }, 0)
      : 0;

    const applyOptions = useCallback(() => {
      selectedOptions && setPersistOptions(selectedOptions);
    }, [selectedOptions, setPersistOptions]);

    const clearOptions = useCallback(() => {
      setPersistOptions(initialData);
      setSelectedOptions(initialData);
    }, [setSelectedOptions, setPersistOptions]);

    const isInitialOptions = isDeepEqual(initialData, persistOptions);

    return {
      selectedOptions,
      setSelectedOptions,
      persistOptions,
      applyOptions,
      clearOptions,
      count,
      isInitialOptions
    };
  };
};
