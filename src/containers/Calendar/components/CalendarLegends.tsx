import React from 'react';
import styled from 'styled-components';
import { ProductivityColors } from '../../../common/colors';
import { Typography } from '@material-ui/core';
import { Emoji } from '../../../components/Emoji';
import { ActivityFragment } from '../../../generated/apollo';
import { FlexBox } from '../../../components/FlexBox';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DayCircle = styled.div<{ color: string }>`
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
  font-size: 14px;
`;

export interface CalendarLegendsProps {
  selectedActivity?: ActivityFragment;
}

export const CalendarLegends: React.FC<CalendarLegendsProps> = ({ selectedActivity }) => {
  return (
    <FlexBox column gap={8} centerX>
      {selectedActivity && (
        <Typography>
          Day with <Emoji>{selectedActivity.emoji}</Emoji>
          {selectedActivity.name} activity:
        </Typography>
      )}

      <Wrapper>
        {Object.entries(ProductivityColors).map(([name, color]) => (
          <LegendWrapper key={name}>
            <DayCircle color={color} />
            <Description>{name}</Description>
          </LegendWrapper>
        ))}
      </Wrapper>
    </FlexBox>
  );
};
