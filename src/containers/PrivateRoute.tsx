import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RouteProps } from 'react-router';

export const PrivateRoute = (props: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { goBackTo: props.path }
        }}
      />
    );
  }

  return <Route {...props} />;
};
