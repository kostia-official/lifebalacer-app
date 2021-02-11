import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export interface EmptyStateWrapperProps {
  stub?: React.ReactElement;
  isEmpty: boolean;
}

const Wrapper = styled.div`
  position: relative;
`;

const EmptyData = styled.div`
  font-size: 20px;

  position: absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const EmptyStateWrapper: React.FC<EmptyStateWrapperProps> = ({
  isEmpty,
  children,
  stub
}) => {
  return (
    <Wrapper>
      {isEmpty && <EmptyData>{stub || <Typography>Not enough data</Typography>}</EmptyData>}
      {children}
    </Wrapper>
  );
};
