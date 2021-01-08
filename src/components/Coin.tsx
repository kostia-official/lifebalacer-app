import React from 'react';
import { ReactComponent as CoinIcon } from '../assets/coin.svg';
import styled from 'styled-components';

export interface CoinProps {
  size?: number;
}

const Wrapper = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  position: relative;
`;

const CoinStyled = styled(CoinIcon)<{ $size: number }>`
  position: absolute;
  bottom: 0.5px; // Not sure why, but it needs this small offset to be vertically centered
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

export const Coin: React.FC<CoinProps> = ({ size = 20 }) => {
  return (
    <Wrapper $size={size}>
      <CoinStyled $size={size} />
    </Wrapper>
  );
};
