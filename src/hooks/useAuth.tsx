import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { useCallback, useState, useEffect } from 'react';
import { config } from '../common/config';
import { Auth0User, auth0Client } from '../common/auth0';
import { isNative } from '../common/platform';

export interface IUseAuthResult extends Auth0ContextInterface {
  token?: string;
  userId?: string | null;
  user?: Auth0User;
  login: Function;
}

export const useAuth = (): IUseAuthResult => {
  const auth = useAuth0();
  const {
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
    user: claims,
    buildAuthorizeUrl,
    logout: logoutDefault
  } = auth;

  const getUserFromClaims = useCallback((claims: any): Auth0User => {
    const userId = claims && claims[`${config.auth.customClaimNamespace}/user_uuid`];
    const username = claims && claims[`${config.auth.customClaimNamespace}/username`];
    return { ...claims, userId, username };
  }, []);

  const [user, setUser] = useState<Auth0User>(getUserFromClaims(claims));
  const [token, setToken] = useState<string>();

  const updateClaims = useCallback(async () => {
    const claims = await getIdTokenClaims();

    setUser(getUserFromClaims(claims));
  }, [getIdTokenClaims, getUserFromClaims]);

  useEffect(() => {
    (async () => {
      if (token || !isAuthenticated) return;

      const newToken = await auth0Client.getTokenSilently();
      setToken(newToken);
    })();
  }, [isAuthenticated, token]);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) await auth0Client.checkSession();

      await updateClaims();
    })();
  }, [isAuthenticated, updateClaims]);

  const login = useCallback(async () => {
    const url = await buildAuthorizeUrl(config.auth);

    window.open(url, '_self');
  }, [buildAuthorizeUrl]);

  const logout = useCallback(() => {
    // Problem with cookies on ios, use localOnly for native
    logoutDefault({ returnTo: config.auth.redirectUri, localOnly: isNative() });

    localStorage.clear();
  }, [logoutDefault]);

  return {
    ...auth,
    user,
    userId: user?.userId,
    isAuthenticated,
    isLoading,
    login,
    logout,
    token
  };
};
