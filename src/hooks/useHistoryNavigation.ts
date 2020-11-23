import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export const useHistoryNavigation = () => {
  const history = useHistory();

  const goTo = useCallback(
    (path) => () => {
      history.push(path);
    },
    [history]
  );

  const goBack = useCallback(
    (fallbackPath) => () => {
      history.length > 2 ? history.goBack() : history.replace(fallbackPath);
    },
    [history]
  );

  return { goTo, goBack };
};
