import React, { useCallback } from 'react';
import { CardActionArea, Card, CardHeader, CardContent } from '@material-ui/core';
import { DayTitle } from './DayTitle';
import { DayResult } from '../common/types';
import styled from 'styled-components';

export interface DayCardProps {
  onClick: (date: string) => void;
  day: Pick<DayResult, 'date' | 'points'>;
}

const CardStyled = styled(Card)`
  margin-bottom: 8px;
`;

const CardHeaderStyled = styled(CardHeader)`
  padding: 16px 18px 0 16px;
`;

const CardContentStyled = styled(CardContent)`
  padding: 0;
`;

export const DayCard: React.FC<DayCardProps> = ({ children, onClick, day }) => {
  const onCardClick = useCallback(() => {
    onClick(day.date);
  }, [day, onClick]);

  return (
    <CardStyled onClick={onCardClick}>
      <CardActionArea>
        <CardHeaderStyled title={<DayTitle day={day} />} />
        <CardContentStyled>{children}</CardContentStyled>
      </CardActionArea>
    </CardStyled>
  );
};
