import React from 'react';
import { Coin } from './Coin';
import styled from 'styled-components';
import _ from 'lodash';
import { Fade } from '@material-ui/core';

export interface PointsProps {
  label?: string;
  points?: string | number;
  coinSize?: number;
  pointsSize?: number;
  size?: number;
  transitionTimeout?: number;
  transition?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PointsWrapper = styled.span<{ $pointsSize: number }>`
  margin-right: 4px;
  font-size: ${(props) => props.$pointsSize}px;
  display: inline-block;
  vertical-align: -2px;
`;

export const Points: React.FC<PointsProps> = ({
  points,
  label,
  size = 18,
  coinSize = size,
  pointsSize = size - 2,
  transition = false,
  transitionTimeout = transition ? 300 : 0
}) => {
  const text = label ? `${label} ${points}` : points;

  return (
    <Fade in={!_.isNil(points)} timeout={transitionTimeout}>
      <Wrapper>
        <PointsWrapper $pointsSize={pointsSize}>{text}</PointsWrapper> <Coin size={coinSize} />
      </Wrapper>
    </Fade>
  );
};
