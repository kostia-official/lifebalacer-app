import React, { useCallback, useMemo } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useGetCalendarDaysQuery } from '../generated/apollo';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client/errors';

export interface UseDatePickerRenderDayProps {
  onError?: (error: ApolloError) => void;
  activityId?: string;
}

export const useDatePickerRenderDay = ({ onError, activityId }: UseDatePickerRenderDayProps = {}) => {
  const { data: daysData } = useGetCalendarDaysQuery({
    onError,
    variables: {
      dateAfter: DateTime.local().endOf('day').toISO(),
      dateBefore: DateTime.fromMillis(0).toISO() // TODO: Add calendar pagination
    },
    fetchPolicy: 'cache-and-network'
  });

  const daysDates: string[] =
    useMemo(
      () =>
        daysData?.entriesByDay?.reduce((acc, day) => {
          const date = DateTime.fromISO(day.date).toISODate();

          if (!activityId) {
            return [...acc, date];
          }
          if (day.entries.find((entry) => entry.activityId === activityId)) {
            return [...acc, date];
          }

          return acc;
        }, [] as string[]),
      [daysData, activityId]
    ) ?? [];

  const renderDay = useCallback(
    (
      day: MaterialUiPickersDate,
      selectedDate: MaterialUiPickersDate,
      dayInCurrentMonth: boolean,
      dayComponent: JSX.Element
    ) => {
      if (!day) return dayComponent;

      const calendarDate = day.toISODate();
      const isMark = !!daysDates?.includes(calendarDate);

      if (!isMark) return dayComponent;

      return React.cloneElement(dayComponent, {
        style: {
          border: `2px solid white`,
          borderRadius: '50%'
        }
      });
    },
    [daysDates]
  );

  return { renderDay, daysData };
};
