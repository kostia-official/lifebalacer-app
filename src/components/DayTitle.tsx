import React from 'react';
import { Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { DayResult } from '../common/types';

export interface DayTitleProps {
  day: Pick<DayResult, 'date' | 'points'>;
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DayTitle: React.FC<DayTitleProps> = ({ day }) => {
  return (
    <TitleWrapper>
      <Typography>{DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_HUGE)}</Typography>
      <Typography>{day.points}</Typography>
    </TitleWrapper>
  );
};
