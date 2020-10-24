import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export interface Auth0User {
  name: string;
  given_name: string;
  email: string;
  picture: string;
}

export interface IUseAuthResult extends Auth0ContextInterface {
  accessToken?: string | null;
  user?: Auth0User;
}

export const useAuth = (): IUseAuthResult => {
  const [accessToken, setAccessToken] = useState('');
  const auth = useAuth0();
  const { getAccessTokenSilently, isAuthenticated, user, getIdTokenClaims } = auth;
  const savedToken = localStorage.getItem('token');
  const userJSON = localStorage.getItem('user');
  const savedUser: Auth0User = userJSON ? JSON.parse(userJSON) : null;
  const [isLoading, setIsLoading] = useState(!!savedToken);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const accessToken = await getAccessTokenSilently();
        const claims = await getIdTokenClaims();

        if (accessToken) {
          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(claims));
        }
        setAccessToken(accessToken);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAccessToken('');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setAccessToken, getAccessTokenSilently, getIdTokenClaims, isAuthenticated]);

  return {
    ...auth,
    user: user || savedUser,
    accessToken: accessToken || savedToken,
    isAuthenticated: !!savedToken,
    isLoading
  };
};
