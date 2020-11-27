import React, { useCallback, useMemo } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useGetCalendarDaysQuery, ActivityExtremes, ActivityType } from '../generated/apollo';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client/errors';
import { getColorFromPoints, getColorInGradient } from '../helpers/color';
import { useOnEntryUpdate } from './useOnEntryUpdate';
import _ from 'lodash';

export interface UseDatePickerRenderDayProps {
  onError?: (error: ApolloError) => void;
  selectedActivityExtremes?: ActivityExtremes;
  isReverseColors: boolean;
}

export interface DaysPayload {
  [key: string]: { color: string };
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

export const useDatePickerRenderDayExtremes = ({
  onError,
  selectedActivityExtremes,
  isReverseColors
}: UseDatePickerRenderDayProps) => {
  const { data: daysData, refetch } = useGetCalendarDaysQuery({
    onError,
    variables: {
      dateAfter: DateTime.local().endOf('day').toISO(),
      dateBefore: DateTime.fromMillis(0).toISO() // TODO: Add calendar pagination
    }
  });

  useOnEntryUpdate([refetch]);

  const daysPayload: DaysPayload = useMemo(
    () =>
      daysData?.entriesByDay?.reduce<DaysPayload>((acc, day) => {
        const date = DateTime.fromISO(day.date).toISODate();

        if (!selectedActivityExtremes) {
          const color = getColorFromPoints(day.points);
          return { ...acc, [date]: { color } };
        }

        const entry = day.entries.find(
          (entry) => entry.activityId === selectedActivityExtremes._id
        );

        const isWithExtremes =
          _.isNumber(selectedActivityExtremes?.min) && _.isNumber(selectedActivityExtremes?.max);

        if (entry) {
          const color =
            isWithExtremes && selectedActivityExtremes.valueType !== ActivityType.Todoist
              ? getColorInGradient(
                  entry?.value!,
                  selectedActivityExtremes.min!,
                  selectedActivityExtremes.max!,
                  isReverseColors
                )
              : getColorFromPoints(day.points);

          return { ...acc, [date]: { color } };
        }

        return acc;
      }, {}) || {},
    [daysData, selectedActivityExtremes, isReverseColors]
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

      return dayComponentWrapper(dayComponent, dayPayload.color);
    },
    [daysPayload]
  );

  return { renderDay, daysData };
};
