import React from 'react';
import { Button, Link } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';
import { ErrorMessage } from '../../components/ErrorMessage';
import styled from 'styled-components';
import { EmptyState } from '../../components/EmptyState';
import { ReactComponent as LoginLogo } from '../../assets/login.svg';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import { Spinner } from '../../components/Spinner';
import { DateTime } from 'luxon';

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

const Footer = styled.div`
  position: fixed;

  bottom: 10px;
`;

export const Auth = () => {
  const { params } = useRoute<RouteProp<NavigationParams, 'Auth'>>();
  const navigator = useNavigation();
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

      {isLoading || (
        <Footer>
          Life Balancer © {DateTime.local().get('year')} |{' '}
          <Link
            onClick={() => {
              navigator.navigate('AnonAboutStack');
            }}
          >
            About
          </Link>
        </Footer>
      )}
    </Wrapper>
  );
};
