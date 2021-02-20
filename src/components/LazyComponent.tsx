import styled from 'styled-components';
import { Spinner } from './Spinner';
import Loadable from 'react-loadable';
import React from 'react';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingComponent = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export const LazyComponent = (loader: any) =>
  Loadable({
    loader,
    loading: LoadingComponent
  });
