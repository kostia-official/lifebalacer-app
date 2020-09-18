import { ChangeEvent, useCallback } from 'react';

export const useUpdateInput = <T extends object>(setter: Function) => useCallback(
  (key: keyof T) => (el: ChangeEvent<any>) => {
    const value = el.target?.value;

    setter((prevData: any) => {
      return ({
        ...prevData,
        [key]: value
      });
    });
  },
  [setter]
);
