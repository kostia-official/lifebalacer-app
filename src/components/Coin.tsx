import React from 'react';
import { ReactComponent as CoinIcon } from '../assets/coin.svg';
import styled from 'styled-components';

export interface CoinProps {
  size?: number;
  coinStyle?: string;
}

const Wrapper = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  position: relative;
`;

const CoinStyled = styled(CoinIcon)<{ $size: number; $coinStyle?: string }>`
  position: absolute;
  bottom: 0.5px; // Not sure why, but it needs this small offset to be vertically centered
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;

  ${(props) => props.$coinStyle}
`;

export const Coin: React.FC<CoinProps> = ({ size = 20, coinStyle }) => {
  return (
    <Wrapper $size={size}>
      <CoinStyled $size={size} $coinStyle={coinStyle} />
    </Wrapper>
  );
};
