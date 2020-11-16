import React, { useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';
import { DialogActions, Button, DialogContent, DialogTitle, Dialog } from '@material-ui/core';
import { isShowAppUpdateDialogVar } from '../reactiveState';
import styled, { css } from 'styled-components';
import { LogoContent } from '../components/LogoContent';
import { ReactComponent as UpdateLogo } from '../assets/update.svg';
import { persistCache } from '../apollo/cache';

const DialogContentStyled = styled(DialogContent)`
  max-width: 500px;
  width: 80vw;
`;

const logoStyles = css`
  max-width: 400px;
  width: 70vw;
`;

export const AppUpdateDialog = () => {
  const isShow = useReactiveVar(isShowAppUpdateDialogVar);

  const onClose = useCallback(async () => {
    await persistCache.persistor.purge();

    window.location.reload();
    isShowAppUpdateDialogVar(false);
  }, []);

  return (
    <div>
      <Dialog
        open={isShow}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New version is available!</DialogTitle>
        <DialogContentStyled>
          <LogoContent
            text={'Click OK to refresh and use latest features'}
            textVariant="subtitle1"
            logo={UpdateLogo}
            logoStyles={logoStyles}
          />
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
