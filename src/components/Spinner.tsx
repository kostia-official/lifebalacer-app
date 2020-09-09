import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Spinner() {
  return (
    <Container>
      <CircularProgress color="secondary" disableShrink />
    </Container>
  );
}
