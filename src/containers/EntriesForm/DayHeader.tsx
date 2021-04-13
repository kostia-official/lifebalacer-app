import React from 'react';
import { getDateTitle, DateAny } from '../../helpers/date';
import { HeaderCard } from '../../components/HeaderCard';
import { MoreButton } from '../../components/MoreButton';
import styled from 'styled-components';

export interface DayHeaderProps {
  date: DateAny;
}

const ContentWrapper = styled.div`
  margin: 2px 0;
`;

export const DayHeader: React.FC<DayHeaderProps> = ({ date }) => {
  return (
    <HeaderCard
      content={<ContentWrapper>{getDateTitle(date)}</ContentWrapper>}
      rightContent={<MoreButton />}
    />
  );
};
