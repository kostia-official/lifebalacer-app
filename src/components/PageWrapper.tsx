import React, { Fragment } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Showable } from './Showable';
import { Spinner } from './Spinner';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../containers/Auth';
import { useMount } from 'react-use';
import Loadable from 'react-loadable';

export interface PageWrapperProps {
  isLoading?: boolean;
  errorMessage?: string;
  errorTime?: number;
  id?: string;
}

const Scroll = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

const ContentWrapper = styled.div`
  margin: 8px;
`;

export const PageWrapper: React.FC<PageWrapperProps> = ({
  errorMessage,
  errorTime = Date.now(),
  isLoading = false,
  children,
  id
}) => {
  useMount(() => {
    Loadable.preloadAll().then();
  });

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Auth />;

  return (
    <Fragment>
      {/*<AppBar />*/}

      <Scroll {...{ id }}>
        <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

        <Showable isShow={isLoading}>
          <Spinner />
        </Showable>

        <Showable isShow={!isLoading}>
          <ContentWrapper>{children}</ContentWrapper>
        </Showable>
      </Scroll>
    </Fragment>
  );
};
