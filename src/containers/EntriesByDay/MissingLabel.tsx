import React from 'react';
import { getIsToday } from '../../helpers/date';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const LabelWrapper = styled.div<{ color: string }>`
  margin: 5px 0 1px 0;
  color: ${(props) => props.color};
`;

const Label = styled(Typography)`
  font-size: 15px;
`;

export const MissingLabel: React.FC<{ date: string }> = ({ date }) => {
  const isToday = getIsToday(date);
  const labelText = isToday ? 'Waiting' : 'Missing';
  const labelColor = isToday ? '#fff' : '#ff5f5f';

  return (
    <LabelWrapper color={labelColor}>
      <Label>{labelText}</Label>
    </LabelWrapper>
  );
};
