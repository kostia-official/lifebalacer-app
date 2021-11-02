import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog/Dialog';
import styled from 'styled-components';

export interface CardModalProps extends DialogProps {
  onClose: () => void;
}

const StyledCard = styled(Card)`
  overflow-y: auto;
`;

export const CardModal: React.FC<CardModalProps> = ({ onClose, children, ...dialogProps }) => {
  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <StyledCard>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>

        {children}
      </StyledCard>
    </Dialog>
  );
};
