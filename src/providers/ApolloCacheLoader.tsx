import React, { Fragment } from 'react';
import { useLoadCache } from '../hooks/apollo/useLoadCache';

export const ApolloCacheLoader: React.FC = ({ children }) => {
  const { isCacheLoaded } = useLoadCache();

  if (!isCacheLoaded) return <Fragment />;

  return <Fragment>{children}</Fragment>;
};
