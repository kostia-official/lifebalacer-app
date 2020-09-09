import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

interface IUseAuthResult extends Auth0ContextInterface {
  accessToken?: string | null;
}

export const useAuth = (): IUseAuthResult => {
  const [accessToken, setAccessToken] = useState('');
  const auth = useAuth0();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const savedToken = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) return;

      try {
        const accessToken = await getAccessTokenSilently();

        if (accessToken) {
          localStorage.setItem('token', accessToken);
        }
        setAccessToken(accessToken);
      } catch (err) {
        localStorage.removeItem('token');
        setAccessToken('');
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);

  return {
    ...auth,
    accessToken: accessToken || savedToken,
    isAuthenticated: !!savedToken
  };
};
