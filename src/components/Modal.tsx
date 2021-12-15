import React from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  IconButton
} from '@material-ui/core';
import { DialogTitleProps } from '@material-ui/core/DialogTitle/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

export const Modal = styled(Dialog).attrs({
  classes: {
    paper: 'paper'
  }
})`
  .paper {
    width: 100vw;
    max-width: 400px;
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
`;

const IconButtonStyled = styled(IconButton)`
  margin-right: -16px;
`;

export const ModalTitle: React.FC<DialogTitleProps & { onClose: () => void }> = ({
  children,
  onClose,
  ...other
}) => {
  return (
    <DialogTitleStyled disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButtonStyled aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButtonStyled>
      ) : null}
    </DialogTitleStyled>
  );
};

export const ModalContent = styled(DialogContent)`
  padding: 0 8px;
`;

export const ModalActions = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
`;

export const ModalSubListContainer = styled.div`
  margin: 0 10px;
`;
