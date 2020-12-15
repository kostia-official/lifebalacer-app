import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { StyledFadeTransition } from './StyledFadeTransition';
import styled from 'styled-components';

export interface CardModalProps {
  isShow: boolean;
  onClose: () => void;
  showDelay?: number;
}

const CardStyled = styled(Card)`
  position: fixed;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 400;
`;

const Overlay = styled.div`
  background-color: black;
  opacity: 0.5;

  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 300;
`;

const Container = styled.div`
  position: relative;
  z-index: 300;
`;

export const CardModal: React.FC<CardModalProps> = ({ isShow, onClose, children, showDelay }) => (
  <StyledFadeTransition isShow={isShow} delay={showDelay}>
    <Container>
      <Overlay onClick={onClose} />
      <CardStyled>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
        {children}
      </CardStyled>
    </Container>
  </StyledFadeTransition>
);
