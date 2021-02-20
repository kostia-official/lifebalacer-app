import React from 'react';
import { getDateTitle, DateAny } from '../../helpers/date';
import { HeaderCard } from '../../components/HeaderCard';

export interface DayHeaderProps {
  date: DateAny;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ date }) => {
  return <HeaderCard text={getDateTitle(date)} />;
};
