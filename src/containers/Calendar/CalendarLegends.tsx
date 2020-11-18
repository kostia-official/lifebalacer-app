import React from 'react';
import styled from 'styled-components';
import { DayColors } from '../../common/colors';
import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DayCircle = styled.div<{ color: DayColors }>`
  display: inline-block;

  border: 2px solid ${(props) => props.color};
  border-radius: 50%;
  width: 20px;
  height: 20px;

  margin-right: 10px;
`;

const Description = styled(Typography)`
  display: inline;
  margin-right: 10px;
`;

export const CalendarLegends = () => {
  return (
    <Wrapper>
      {Object.entries(DayColors).map(([name, color]) => (
        <LegendWrapper key={name}>
          <DayCircle color={color} />
          <Description>{name}</Description>
        </LegendWrapper>
      ))}
    </Wrapper>
  );
};
