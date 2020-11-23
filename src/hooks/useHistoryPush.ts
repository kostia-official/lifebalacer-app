import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export const useHistoryPush = () => {
  const history = useHistory();

  const historyPush = useCallback(
    (path) => () => {
      history.push(path);
    },
    [history]
  );

  return { historyPush };
};
