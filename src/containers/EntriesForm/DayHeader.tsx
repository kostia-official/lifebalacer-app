import React from 'react';
import { getDateTitle } from '../../helpers/date';
import { HeaderCard } from '../../components/HeaderCard';
import { DayResult } from '../../common/types';

export interface DayHeaderProps {
  day: Pick<DayResult, 'date' | 'points'>;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ day }) => {
  return <HeaderCard text={getDateTitle(day.date)} />;
};
