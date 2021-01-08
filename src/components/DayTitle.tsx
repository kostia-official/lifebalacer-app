import React from 'react';
import styled from 'styled-components';
import { DayResult } from '../common/types';
import { getDateTitle } from '../helpers/date';
import { Points } from './Points';

export interface DayTitleProps {
  day: Pick<DayResult, 'date' | 'points'>;
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateText = styled.span`
  font-size: 16px;
`;

export const DayTitle: React.FC<DayTitleProps> = ({ day }) => {
  return (
    <TitleWrapper>
      <DateText>{getDateTitle(day.date)}</DateText>
      <Points points={day.points} pointsSize={16} coinSize={17} />
    </TitleWrapper>
  );
};
