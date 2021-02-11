import React from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import { Spinner } from '../Spinner';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingComponent = (props: LoadingComponentProps) => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export const DateChartLoadable = Loadable({
  loader: () => import('./DateChart'),
  loading: LoadingComponent,
  delay: 300
});
