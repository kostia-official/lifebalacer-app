import React, { Fragment } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Showable } from './Showable';
import { Spinner } from './Spinner';

export interface PageWrapperProps {
  isLoading?: boolean;
  errorMessage: string;
  errorTime?: number;
}

export const Loadable: React.FC<PageWrapperProps> = ({
  errorMessage,
  errorTime = Date.now(),
  isLoading = false,
  children
}) => {
  return (
    <Fragment>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

      <Showable isShow={isLoading}>
        <Spinner />
      </Showable>

      <Showable isShow={!isLoading}>
        {children}
      </Showable>
    </Fragment>
  );
};
