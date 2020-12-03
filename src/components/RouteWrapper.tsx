import React, { Fragment } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../containers/Auth';
import { Showable } from './Showable';

export interface RouteWrapperProps extends RouteProps {
  isPublic?: boolean;
  isMain?: boolean;
}

export type RouteState = 'show' | 'hide' | 'unmount';

const statuses: { [key: string]: RouteState } = {};

export const RouteWrapper: React.FC<RouteWrapperProps> = ({
  isPublic,
  isMain,
  exact,
  ...props
}) => {
  const { isAuthenticated } = useAuth();

  const match = useRouteMatch({
    path: props.path,
    strict: true,
    sensitive: true
  });

  if (!isPublic && !isAuthenticated) return <Auth />;

  let routeState: RouteState = 'show';

  if (isMain) {
    if (!match) routeState = 'hide';
    if (match?.isExact === false) routeState = 'hide';
  } else {
    if (!match) routeState = 'unmount';
    if (match?.isExact === false) routeState = 'hide';
  }

  if (props.path === '/calendar') {
    console.log(props.path, match, routeState);
  }

  statuses[String(props.path)] = routeState;

  if (routeState === 'unmount') return <Fragment />;

  return (
    <Showable isShow={routeState === 'show'}>
      <Route {...props} />
    </Showable>
  );
};
