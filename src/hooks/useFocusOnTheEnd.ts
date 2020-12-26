import { useCallback } from 'react';
import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';

export const useFocusOnTheEnd = () => {
  const onFocus: StandardInputProps['onFocus'] = useCallback(
    (e) =>
      e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length),
    []
  );

  return { onFocus };
};
