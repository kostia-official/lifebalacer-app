import React, { useCallback } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ExtendButtonBase } from '@material-ui/core/ButtonBase';
import { IconButtonTypeMap } from '@material-ui/core/IconButton/IconButton';
import { DateTime } from 'luxon';
import { transparentize } from 'polished';
import { Spinner } from '../../components/Spinner';

export interface UseDatePickerRenderDayProps {
  onRenderDay: (
    date: DateTime,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => {
    markColor?: string;
  };
  isLoading: boolean;
}

interface DayButtonProps extends ExtendButtonBase<IconButtonTypeMap> {
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $markColor?: string;
}

const DayButton = styled(IconButton)<DayButtonProps>`
  width: 36px;
  height: 36px;
  margin: 1px 2px;
  color: ${(props) => (props.$isCurrentMonth ? 'inherit' : '#5b5b5b')};
  background-color: ${(props) =>
    props.$isToday && props.$isCurrentMonth ? 'darkslategrey' : 'inherit'};

  border: 2px solid
    ${(props) => transparentize(props.$isCurrentMonth ? 0 : 0.8, props.$markColor || 'transparent')};
  border-radius: 50%;
`;

const DayText = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 400;
`;

const SpinnerWrapper = styled.div`
  position: absolute;

  top: 100px;

  left: 50%;
  transform: translate(-50%, -50%);
`;

export const useDatePickerRenderDay = ({ onRenderDay, isLoading }: UseDatePickerRenderDayProps) => {
  const renderDay = useCallback(
    (
      date: MaterialUiPickersDate,
      selectedDate: MaterialUiPickersDate,
      dayInCurrentMonth: boolean,
      dayComponent: JSX.Element
    ) => {
      if (isLoading) {
        return (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        );
      }

      if (!date) return dayComponent;

      const { markColor } = onRenderDay(date, selectedDate, dayInCurrentMonth, dayComponent);

      return (
        <DayButton
          $isCurrentMonth={dayInCurrentMonth}
          $isToday={dayComponent.props.current}
          $markColor={markColor}
          name=""
        >
          <DayText> {date.get('day')} </DayText>
        </DayButton>
      );
    },
    [isLoading, onRenderDay]
  );

  return { renderDay };
};