import React from 'react';
import styled from 'styled-components';
import { MainColors } from '../common/colors';
import SyncLoader from 'react-spinners/SyncLoader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

export function Spinner() {
  return (
    <Container>
      <SyncLoader color={MainColors.Primary} />
    </Container>
  );
}
