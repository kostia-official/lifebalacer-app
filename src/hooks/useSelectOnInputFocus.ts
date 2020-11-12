import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';
import { useCallback } from 'react';

export const useSelectOnInputFocus = () => {
  const selectAllOnFocus: StandardInputProps['onFocus'] = useCallback((event) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.setSelectionRange(0, target.value.length ?? 0);
  }, []);

  const preventMobileSelectionMenu: StandardInputProps['onSelect'] = useCallback((event) => {
    event.preventDefault();
  }, []);

  return { selectAllOnFocus, preventMobileSelectionMenu };
};
