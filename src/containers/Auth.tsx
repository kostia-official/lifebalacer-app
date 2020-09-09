import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { config } from '../config';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  snackbarContent: {
    backgroundColor: theme.palette.error.dark
  }
}));

export const Auth = () => {
  const classes = useStyles();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const error = query?.error_description || '';
  const { loginWithRedirect, isLoading } = useAuth();

  return (
    <div>
      <div className={classes.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => loginWithRedirect(config.auth)}
          >
            Login
          </Button>
        )}
      </div>
      <ErrorMessage errorMessage={String(error)} />
    </div>
  );
};
