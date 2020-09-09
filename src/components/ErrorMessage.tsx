import React, { useState, useCallback, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export interface IErrorMessage {
  errorMessage?: string;
}

export const ErrorMessage: React.FC<IErrorMessage> = ({ errorMessage }) => {
  const [isShow, setIsShow] = useState(!!errorMessage);

  const onClose = useCallback(() => {
    setIsShow(false);
  }, [setIsShow]);

  useEffect(() => {
    setIsShow(!!errorMessage);
  }, [setIsShow, errorMessage]);

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
