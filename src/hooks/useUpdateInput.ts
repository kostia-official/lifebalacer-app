import { ChangeEvent, useCallback } from 'react';

export interface UseUpdateInputOptions {
  isNumber?: boolean;
}

export const useUpdateInput = <O extends object>(setter: Function) =>
  useCallback(
    (key: keyof O) => (el: ChangeEvent<any>) => {
      let value = el.target?.value;

      setter((prevData: any) => {
        return {
          ...prevData,
          [key]: value
        };
      });
    },
    [setter]
  );
