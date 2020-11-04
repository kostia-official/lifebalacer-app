import React, { useCallback, useMemo } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useGetCalendarDaysQuery } from '../generated/apollo';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client/errors';

export interface UseDatePickerRenderDayProps {
  onError?: (error: ApolloError) => void;
  activityId?: string;
}

export interface DaysPayload {
  [key: string]: { points: number };
}

export const useDatePickerRenderDay = ({
  onError,
  activityId
}: UseDatePickerRenderDayProps = {}) => {
  const { data: daysData } = useGetCalendarDaysQuery({
    onError,
    variables: {
      dateAfter: DateTime.local().endOf('day').toISO(),
      dateBefore: DateTime.fromMillis(0).toISO() // TODO: Add calendar pagination
    },
    fetchPolicy: 'cache-and-network'
  });

  const daysPayload: DaysPayload = useMemo(
    () =>
      daysData?.entriesByDay?.reduce<DaysPayload>((acc, day) => {
        const date = DateTime.fromISO(day.date).toISODate();

        if (!activityId) {
          return { ...acc, [date]: { points: day.points } };
        }
        if (day.entries.find((entry) => entry.activityId === activityId)) {
          return { ...acc, [date]: { points: day.points } };
        }

        return acc;
      }, {}) || {},
    [daysData, activityId]
  );

  const renderDay = useCallback(
    (
      day: MaterialUiPickersDate,
      selectedDate: MaterialUiPickersDate,
      dayInCurrentMonth: boolean,
      dayComponent: JSX.Element
    ) => {
      if (!day) return dayComponent;

      const calendarDate = day.toISODate();
      const dayPayload = daysPayload[calendarDate];

      if (!dayPayload) return dayComponent;

      const color = getColorFromPoints(dayPayload.points);

      return React.cloneElement(dayComponent, {
        style: {
          border: `2px solid ${color}`,
          borderRadius: '50%'
        }
      });
    },
    [daysPayload]
  );

  return { renderDay, daysData };
};

function getColorFromPoints(points: number) {
  if (points > 300) return 'darkgreen';
  if (points < -300) return 'darkred';

  return '#757500';
}
