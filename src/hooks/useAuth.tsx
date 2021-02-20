import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { useEffect, useState, useCallback } from 'react';
import { config } from '../common/config';
import { sentryService } from '../services/sentry';
import { Auth0User } from '../services/auth0';

export interface IUseAuthResult extends Auth0ContextInterface {
  accessToken?: string | null;
  user?: Auth0User;
  login: Function;
}

export const useAuth = (): IUseAuthResult => {
  const [accessToken, setAccessToken] = useState('');
  const auth = useAuth0();
  const {
    getAccessTokenSilently,
    isAuthenticated,
    getIdTokenClaims,
    loginWithPopup,
    logout: logoutDefault
  } = auth;
  const savedToken = localStorage.getItem('token');
  const userJSON = localStorage.getItem('user');
  const savedUser: Auth0User = userJSON ? JSON.parse(userJSON) : null;
  const [isLoading, setIsLoading] = useState(!!savedToken);

  const login = useCallback(() => {
    loginWithPopup(config.auth).then();
  }, [loginWithPopup]);

  const logout = useCallback(() => {
    logoutDefault({ returnTo: window.location.origin });
    localStorage.clear();
  }, [logoutDefault]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const accessToken = await getAccessTokenSilently();

        const claims = await getIdTokenClaims();
        const userId = claims[`${config.auth.customClaimNamespace}/user_uuid`];
        const username = claims[`${config.auth.customClaimNamespace}/username`];
        const user = { ...claims, userId, username };

        if (accessToken) {
          sentryService.setUserId(userId);

          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
        }
        setAccessToken(accessToken);
      } catch (err) {
        // sentryService.captureException(err);
        setAccessToken('');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setAccessToken, getAccessTokenSilently, getIdTokenClaims, isAuthenticated]);

  return {
    ...auth,
    user: savedUser,
    accessToken: accessToken || savedToken,
    isAuthenticated: !!savedToken,
    isLoading,
    login,
    logout
  };
};
