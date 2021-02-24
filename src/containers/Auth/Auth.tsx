import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';
import { ErrorMessage } from '../../components/ErrorMessage';
import styled from 'styled-components';
import { EmptyState } from '../../components/EmptyState';
import { ReactComponent as LoginLogo } from '../../assets/login.svg';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import { Spinner } from '../../components/Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const ButtonStyled = styled(Button)`
  margin-bottom: 80px;
`;

export const Auth = () => {
  const { params } = useRoute<RouteProp<NavigationParams, 'Auth'>>();
  const { login, error, isLoading } = useAuth();

  const errorMessage = params?.error_description || error?.message || '';

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <EmptyState logo={LoginLogo} text="" />

          <ButtonStyled variant="contained" color="primary" onClick={() => login()}>
            Login
          </ButtonStyled>
        </>
      )}

      <ErrorMessage errorMessage={String(errorMessage)} />
    </Wrapper>
  );
};
