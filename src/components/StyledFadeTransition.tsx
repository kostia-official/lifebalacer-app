import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

export interface TransitionStylesProps {
  opacity: number;
  delay: number;
}

export interface StyledFadeTransitionProps {
  isShow: boolean;
  delay?: number;
  unmountOnExit?: boolean;
}

const TransitionStyles = styled.div<TransitionStylesProps>`
  opacity: ${(props) => props.opacity};
  transition: opacity ${(props) => props.delay}ms;

  position: relative;
  z-index: 300;
`;

export const StyledFadeTransition: React.FC<StyledFadeTransitionProps> = ({
  isShow,
  children,
  delay = 300,
  unmountOnExit = true
}) => {
  return (
    <Transition in={isShow} timeout={delay} unmountOnExit={unmountOnExit}>
      {(transitionState: keyof typeof transitionStyles) => {
        const { opacity } = transitionStyles[transitionState];

        return (
          <TransitionStyles delay={delay} opacity={opacity}>
            {children}
          </TransitionStyles>
        );
      }}
    </Transition>
  );
};
