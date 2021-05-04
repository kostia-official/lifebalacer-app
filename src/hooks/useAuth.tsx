import { useAuth0, Auth0ContextInterface } from '@auth0/auth0-react';
import { useCallback } from 'react';
import { config } from '../common/config';
import { Auth0User } from '../common/auth0';

export interface IUseAuthResult extends Auth0ContextInterface {
  accessToken?: string | null;
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
    user: claims
  } = auth;

  const userId = claims && claims[`${config.auth.customClaimNamespace}/user_uuid`];
  const username = claims && claims[`${config.auth.customClaimNamespace}/username`];
  const user = { ...claims, userId, username };

  const login = useCallback(() => {
    loginWithRedirect(config.auth).then();
  }, [loginWithRedirect]);

  const logout = useCallback(() => {
    logoutDefault({ returnTo: window.location.origin });
    localStorage.clear();
  }, [logoutDefault]);

  return {
    ...auth,
    user,
    userId,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};
