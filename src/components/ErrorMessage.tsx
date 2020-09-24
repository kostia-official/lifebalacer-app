import React, { useState, useCallback, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export interface IErrorMessage {
  errorMessage?: string;
  errorTime?: number; // To show error with the same message again
}

export const ErrorMessage: React.FC<IErrorMessage> = ({ errorMessage, errorTime }) => {
  const [isShow, setIsShow] = useState(!!errorMessage);

  const onClose = useCallback(() => {
    setIsShow(false);
  }, [setIsShow]);

  useEffect(() => {
    setIsShow(!!errorMessage);
  }, [errorMessage, errorTime]);

  return (
    <Snackbar
      open={isShow}
      autoHideDuration={6000}
      onClose={onClose}
      transitionDuration={{ exit: 0 }}
    >
      <Alert severity="error" onClose={onClose}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
