import React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../containers/Auth';
import { RouteState } from '../containers/Router';

export const RouteWrapper: React.FC<RouteState & RouteProps> = (props) => {
  const { isPublic, isNested, ...otherProps } = props;
  const { isAuthenticated } = useAuth();

  if (!isPublic && !isAuthenticated) return <Auth />;

  return <Route {...otherProps} />;
};
