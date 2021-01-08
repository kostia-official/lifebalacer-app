import React, { Fragment } from 'react';
import { Coin } from './Coin';
import styled from 'styled-components';
import _ from 'lodash';

export interface PointsProps {
  points?: string | number;
  coinSize?: number;
  pointsSize?: number;
  size?: number;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PointsWrapper = styled.span<{ $pointsSize: number }>`
  margin-right: 5px;
  font-size: ${(props) => props.$pointsSize}px;
  display: inline-block;
  vertical-align: center;
`;

export const Points: React.FC<PointsProps> = ({
  points,
  size = 18,
  coinSize = size,
  pointsSize = size - 2
}) => {
  if (_.isNil(points)) return <Fragment />;

  return (
    <Wrapper>
      <PointsWrapper $pointsSize={pointsSize}>{points}</PointsWrapper> <Coin size={coinSize} />
    </Wrapper>
  );
};
