import { ChangeEvent, useCallback } from 'react';

export interface UseUpdateInputOptions {
  isNumber?: boolean;
}

export const useUpdateInput = <O extends object>(setter: Function) =>
  useCallback(
    (key: keyof O, options: UseUpdateInputOptions = {}) => (el: ChangeEvent<any>) => {
      const value = el.target?.value;

      setter((prevData: any) => {
        return {
          ...prevData,
          [key]: options.isNumber ? Number(value) : value
        };
      });
    },
    [setter]
  );
