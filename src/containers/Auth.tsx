import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import styled from 'styled-components';
import { EmptyState } from '../components/EmptyState';
import { ReactComponent as LoginLogo } from '../assets/login.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const Auth = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const { login, isLoading, isAuthenticated, error } = useAuth();

  const errorMessage = query?.error_description || error?.message || '';

  return (
    <Wrapper>
      {isLoading || isAuthenticated ? (
        <Spinner />
      ) : (
        <>
          <EmptyState logo={LoginLogo} text="" />
          <Button variant="contained" color="primary" onClick={() => login()}>
            Login
          </Button>
        </>
      )}
      <ErrorMessage errorMessage={String(errorMessage)} />
    </Wrapper>
  );
};
