import React from 'react';
import { Button } from '@material-ui/core';
import { config } from '../common/config';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { AbsoluteCentered } from '../components/AbsoluteCentered';

export const Auth = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const error = query?.error_description || '';
  const { loginWithRedirect, isLoading } = useAuth();

  return (
    <AbsoluteCentered>
      {isLoading ? (
        <Spinner />
      ) : (
        <Button variant="contained" color="primary" onClick={() => loginWithRedirect(config.auth)}>
          Login
        </Button>
      )}
      <ErrorMessage errorMessage={String(error)} />
    </AbsoluteCentered>
  );
};
