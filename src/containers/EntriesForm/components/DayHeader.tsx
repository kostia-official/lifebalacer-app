import React from 'react';
import { getDateTitle, DateAny } from '../../../helpers/date';
import { HeaderCard } from '../../../components/HeaderCard';
import { Box } from '@material-ui/core';

export interface DayHeaderProps {
  date: DateAny;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ date }) => {
  return (
    <Box marginBottom={1}>
      <HeaderCard text={getDateTitle(date)} />
    </Box>
  );
};
