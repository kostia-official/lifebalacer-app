import React, { Fragment } from 'react';
import { config } from '../common/config';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const initTime = Date.now();

const Auth0Loader: React.FC = ({ children }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Fragment />;

  if (Date.now() - initTime > 150) {
    console.warn('Auth0 init time too long', initTime);
  }

  return <Fragment>{children}</Fragment>;
};

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <Auth0Provider {...config.auth}>
      <Auth0Loader>{children}</Auth0Loader>
    </Auth0Provider>
  );
};
