import React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../containers/Auth';

export interface RouteWrapperProps extends RouteProps {
  isPublic?: boolean;
}

export const RouteWrapper: React.FC<RouteWrapperProps> = ({ isPublic, ...props }) => {
  const { isAuthenticated } = useAuth();

  if (!isPublic && !isAuthenticated) return <Auth />;

  return <Route {...props} />;
};
