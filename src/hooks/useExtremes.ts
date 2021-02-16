import { Extremes } from '../common/types';
import { useMemo } from 'react';

export const useExtremes = <T>(data: T[], field: keyof T): Extremes => {
  return useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const value = Number(item[field]);
        const min = value < acc.min ? value : acc.min;
        const max = value > acc.max ? value : acc.max;

        return { min, max };
      },
      { min: Infinity, max: -Infinity }
    );
  }, [data, field]);
};
