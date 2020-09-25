import { RenderDayResult } from '../types';
import React, { useCallback } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface UseDatePickerRenderDayProps {
  onDay?: (date: Date) => RenderDayResult;
}

export const useDatePickerRenderDay = ({ onDay }: UseDatePickerRenderDayProps) => {
  const renderDay = useCallback(
    (
      day: MaterialUiPickersDate,
      selectedDate: MaterialUiPickersDate,
      dayInCurrentMonth: boolean,
      dayComponent: JSX.Element
    ) => {
      if (!day || !onDay) return dayComponent;

      const { isMark, color = 'transparent' } = onDay(day);
      if (!isMark) return dayComponent;

      return React.cloneElement(dayComponent, {
        style: {
          border: `2px solid ${color}`,
          borderRadius: '50%'
        }
      });
    },
    [onDay]
  );

  return { renderDay };
};
