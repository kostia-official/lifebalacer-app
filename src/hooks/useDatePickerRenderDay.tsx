import React, { useCallback, useMemo } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useGetCalendarDaysQuery } from '../generated/apollo';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client/errors';
import { getColorFromPoints } from '../helpers/color';

export interface UseDatePickerRenderDayProps {
  onError?: (error: ApolloError) => void;
  activityId?: string;
}

export interface DaysPayload {
  [key: string]: { points: number };
}

const dayComponentWrapper = (dayComponent: JSX.Element, color = 'transparent') => {
  const backgroundColorProp = dayComponent.props.current
    ? { backgroundColor: 'darkslategrey' }
    : {};

  return React.cloneElement(dayComponent, {
    style: {
      border: `2px solid ${color}`,
      borderRadius: '50%',
      marginTop: '1px',
      marginBottom: '1px',
      ...backgroundColorProp
    }
  });
};

export const useDatePickerRenderDay = ({
  onError,
  activityId
}: UseDatePickerRenderDayProps = {}) => {
  const { data: daysData } = useGetCalendarDaysQuery({
    onError,
    variables: {
      dateAfter: DateTime.local().endOf('day').toISO(),
      dateBefore: DateTime.fromMillis(0).toISO() // TODO: Add calendar pagination
    }
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
      if (!day) return dayComponentWrapper(dayComponent);

      const calendarDate = day.toISODate();
      const dayPayload = daysPayload[calendarDate];

      if (!dayPayload) return dayComponentWrapper(dayComponent);

      const color = getColorFromPoints(dayPayload.points);

      return dayComponentWrapper(dayComponent, color);
    },
    [daysPayload]
  );

  return { renderDay, daysData };
};
