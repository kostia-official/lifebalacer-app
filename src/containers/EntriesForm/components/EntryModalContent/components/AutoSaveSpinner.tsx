import React from 'react';
import styled from 'styled-components';
import { Fade, CircularProgress } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.7;
`;

export interface AutoSaveSpinnerProps {
  isLoading?: boolean;
  className?: string;
}

export const AutoSaveSpinner: React.FC<AutoSaveSpinnerProps> = ({ isLoading, className }) => {
  return (
    <Wrapper className={className}>
      <Fade in={isLoading} timeout={200}>
        <CircularProgress size={10} disableShrink />
      </Fade>
    </Wrapper>
  );
};
