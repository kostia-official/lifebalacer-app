import { useCallback } from 'react';
import { useSetState } from 'react-use';
import { makeLocalStorageState } from './makeLocalStorageState';

export interface Options<T> {
  ignoreCountIncrementFields?: T[];
}

export const makePersistFilters = <T extends object>(
  key: string,
  initialData: T,
  { ignoreCountIncrementFields }: Options<keyof T> = {}
) => {
  const useFiltersPersistState = makeLocalStorageState<T>(key, initialData);

  return () => {
    const [persistFilters, setPersistFilters] = useFiltersPersistState();
    const [filtersSelection, setFiltersSelection] = useSetState<T>(persistFilters);

    const count = persistFilters
      ? Object.entries(persistFilters).reduce((acc, [field, value]) => {
          if (ignoreCountIncrementFields?.includes(field as keyof T)) return acc;

          if (Array.isArray(value) && value.length > 0) return acc + 1;
          if (!Array.isArray(value) && value) return acc + 1;

          return acc;
        }, 0)
      : 0;

    const applyFilters = useCallback(() => {
      filtersSelection && setPersistFilters(filtersSelection);
    }, [filtersSelection, setPersistFilters]);

    const clearFilters = useCallback(() => {
      setPersistFilters(initialData);
      setFiltersSelection(initialData);
    }, [setFiltersSelection, setPersistFilters]);

    return {
      filtersSelection,
      setFiltersSelection,
      persistFilters,
      applyFilters,
      clearFilters,
      count
    };
  };
};
