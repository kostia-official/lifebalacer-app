import { useHistory, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import _ from 'lodash';

export const useHistoryNavigation = () => {
  const history = useHistory();
  const location = useLocation<{ depth: number | undefined }>();

  const depth = location.state?.depth ?? 0;

  const goForwardTo = useCallback(
    (path: string) => {
      history.push(path, { depth: depth + 1 });
    },
    [history, depth]
  );

  const goForwardToCb = useCallback((path: string) => () => goForwardTo(path), [goForwardTo]);

  const switchTo = useCallback(
    (path: string) => {
      history.replace(path, { depth: 0 });
    },
    [history]
  );

  const switchToCb = useCallback((path: string) => () => switchTo(path), [switchTo]);

  const goBack = useCallback(
    (fallbackPath: string = '/') => {
      depth > 0 ? history.goBack() : history.replace(fallbackPath);
    },
    [history, depth]
  );

  const goBackCb = useCallback((fallbackPath?: string) => () => goBack(fallbackPath), [goBack]);

  // Use pathname as fallback to quickly calculate is routing nested
  const isNested = depth > 0 || _.countBy(location.pathname)['/'] > 1;

  return { goForwardTo, goForwardToCb, switchTo, switchToCb, goBack, goBackCb, depth, isNested };
};
