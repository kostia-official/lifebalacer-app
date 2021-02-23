import { useRef, useCallback, useState } from 'react';

export interface PreventBlurArgs {
  preventTime?: number;
}

export const usePreventBlur = ({ preventTime = 1000 }: PreventBlurArgs = {}) => {
  const [mountTime] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = useCallback(() => {
    if (Date.now() - mountTime < preventTime) {
      inputRef.current?.focus();
    }
  }, [mountTime, preventTime]);

  return { onBlur, inputRef };
};
