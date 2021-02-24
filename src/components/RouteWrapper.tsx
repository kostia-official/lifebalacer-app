import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../containers/Auth/Auth';
import { RouteState } from '../containers/Router';
import { useMount } from 'react-use';
import Loadable from 'react-loadable';

export const RouteWrapper: React.FC<RouteState & RouteProps> = (props) => {
  const { isPublic, isNested, ...otherProps } = props;
  const { isAuthenticated } = useAuth();

  useMount(() => {
    Loadable.preloadAll().then();
  });

  if (!isPublic && !isAuthenticated) return <Auth />;

  return <Route {...otherProps} />;
};
