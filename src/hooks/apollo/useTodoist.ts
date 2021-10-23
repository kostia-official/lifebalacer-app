import { useCallback } from 'react';
import * as uuid from 'uuid';
import queryString from 'querystring';
import { config } from '../../common/config';

export const useTodoist = () => {
  const authorizeInTodoist = useCallback(() => {
    const query = queryString.stringify({
      client_id: config.todoist.clientId,
      scope: config.todoist.scope,
      state: uuid.v4()
    });

    window.location.replace(`https://todoist.com/oauth/authorize?${query}`);
  }, []);

  return { authorizeInTodoist };
};
