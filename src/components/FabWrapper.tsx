import React from 'react';
import styled from 'styled-components';
import { useIsKeyboardOpen } from '../hooks/useIsKeyboardOpen';
import { Showable } from './Showable';
import { useDeviceMediaQuery } from '../hooks/useDeviceMediaQuery';

export interface FabWrapperProps {}

const Wrapper = styled.div<{ isMobile: boolean }>`
  position: fixed;
  z-index: 200;
  bottom: ${(p) => (p.isMobile ? 76 : 26)}px;
  right: 26px;

  display: flex;
  flex-direction: column;
`;

export const EmptySpaceUnderFab = styled.div`
  height: 96px;
`;

export const FabWrapper: React.FC<FabWrapperProps> = ({ children }) => {
  const isKeyboardOpen = useIsKeyboardOpen();
  const { isMobile } = useDeviceMediaQuery();

  return (
    <Showable isShow={!isKeyboardOpen}>
      <Wrapper isMobile={isMobile}>{children}</Wrapper>
    </Showable>
  );
};
