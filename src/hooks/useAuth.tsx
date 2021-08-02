import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { useCallback, useState, useEffect } from 'react';
import { config } from '../common/config';
import { Auth0User, auth0Client } from '../common/auth0';

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
    loginWithRedirect,
    logout: logoutDefault,
    isLoading,
    getIdTokenClaims,
    user: claims
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

  const login = useCallback(() => {
    loginWithRedirect(config.auth).then();
  }, [loginWithRedirect]);

  const logout = useCallback(() => {
    logoutDefault({ returnTo: config.auth.redirectUri });
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
