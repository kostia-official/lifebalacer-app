import { useCallback, useMemo } from 'react';
import { useGetCalendarDaysQuery, ActivityExtremes, ActivityType } from '../generated/apollo';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client/errors';
import { getColorFromPoints, getColorInGradient } from '../helpers/color';
import { useOnEntryUpdate } from './useOnEntryUpdate';
import _ from 'lodash';
import { useDatePickerRenderDay } from './useDatePickerRenderDay';

export interface UseDatePickerRenderDayProps {
  onError?: (error: ApolloError) => void;
  selectedActivityExtremes?: ActivityExtremes;
  isReverseColors?: boolean;
}

export interface DaysPayload {
  [key: string]: { color: string };
}

export const useDatePickerRenderDayExtremes = ({
  onError,
  selectedActivityExtremes,
  isReverseColors = false
}: UseDatePickerRenderDayProps = {}) => {
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

  const onRenderDay = useCallback(
    (day: DateTime) => {
      const calendarDate = day.toISODate();
      const dayPayload = daysPayload[calendarDate];

      if (!dayPayload) return {};

      return { markColor: dayPayload.color };
    },
    [daysPayload]
  );

  const { renderDay } = useDatePickerRenderDay({ onRenderDay, isLoading: !daysData });

  return { renderDay, daysData };
};
