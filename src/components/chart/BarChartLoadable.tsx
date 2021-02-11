import React from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import { Spinner } from '../Spinner';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  height: 136px;
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

export const BarChartLoadable = Loadable({
  loader: () => import('./BarChart'),
  loading: LoadingComponent,
  delay: 300
});
