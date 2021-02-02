import { useCallback, useState } from 'react';
import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';
import _ from 'lodash';

export interface HookArgs {
  isAutoFocus?: boolean;
}

export const useFocusOnTheEnd = ({ isAutoFocus = false }: HookArgs = {}) => {
  const [isScrolledOnce, setIsScrolledOnce] = useState(false);

  const onFocus: StandardInputProps['onFocus'] = useCallback(
    (e) => {
      const target = e.currentTarget;

      const canScroll = !_.isNil(target.scrollTop);

      if (!isScrolledOnce && canScroll && isAutoFocus) {
        target.scrollTop = target.scrollHeight;
        setIsScrolledOnce(true);
      }

      target.setSelectionRange(target.value.length, target.value.length);
    },
    [isAutoFocus, isScrolledOnce]
  );

  return { onFocus };
};
