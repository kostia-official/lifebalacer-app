import React from 'react';
import { Route, useLocation, matchPath } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { Showable } from './Showable';

export const RouteWrapper: React.FC<RouteProps> = (props) => {
  const location = useLocation();
  const isMatch = !!matchPath(location.pathname, {
    path: props.path,
    exact: true,
    strict: false
  });

  return (
    <Showable isShow={isMatch}>
      <Route {...props} />
    </Showable>
  );
};
