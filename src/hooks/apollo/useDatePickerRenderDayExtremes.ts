import { useCallback, useMemo } from 'react';
import {
  useGetCalendarDaysQuery,
  ActivityExtremes,
  ActivityType,
  GetCalendarDaysQuery
} from '../../generated/apollo';
import { DateTime } from 'luxon';
import { ApolloError } from '@apollo/client/errors';
import { getColorFromPoints, getColorInGradient } from '../../helpers/color';
import { useOnEntryUpdate } from '../useOnEntryUpdate';
import _ from 'lodash';
import { useDatePickerRenderDay } from './useDatePickerRenderDay';
import { CalendarHighlightOptions } from '../../containers/Calendar/components/CalendarFilters/hooks/useCalendarFilters';

export interface UseDatePickerRenderDayProps {
  onError?: (error: ApolloError) => void;
  selectedActivityId?: string;
  selectedActivityExtremes?: ActivityExtremes;
  isReverseColors?: boolean;
  activityId?: string;
  highlightOptions?: CalendarHighlightOptions;
  skip?: boolean;
}

export interface DayPayload {
  color: string;
  highlightResults: CalendarHighlightOptions;
  imageSrc?: string | null;
}

export interface DaysPayload {
  [key: string]: DayPayload;
}

type DayEntries = GetCalendarDaysQuery['entriesByDay'][0]['entries'];
type EntryHighlightField = keyof DayEntries[0];

export const useDatePickerRenderDayExtremes = ({
  onError,
  selectedActivityId,
  selectedActivityExtremes,
  isReverseColors = false,
  activityId,
  highlightOptions,
  skip
}: UseDatePickerRenderDayProps = {}) => {
  const { data: daysData, refetch } = useGetCalendarDaysQuery({
    onError,
    skip,
    variables: {
      activityId,
      dateAfter: DateTime.local().endOf('day').toISO(),
      dateBefore: DateTime.fromMillis(0).toISO() // TODO: Add calendar pagination
    }
  });

  useOnEntryUpdate([refetch]);

  const getIsHighlightDay = useCallback(
    ({
      highlightOption,
      entryField,
      entries,
      selectedActivityId
    }: {
      highlightOption: boolean;
      entryField: EntryHighlightField;
      entries: DayEntries;
      selectedActivityId?: string;
    }) => {
      if (!highlightOption) return false;

      if (selectedActivityId) {
        const entry = entries?.find((entry) => entry.activityId === selectedActivityId);

        return !!entry?.[entryField];
      }

      return entries?.some((entry) => !!entry?.[entryField]);
    },
    []
  );

  const daysPayload: DaysPayload = useMemo(
    () =>
      daysData?.entriesByDay?.reduce<DaysPayload>((acc, day) => {
        const date = DateTime.fromISO(day.date).toISODate();
        const entry = day.entries.find((entry) => entry.activityId === selectedActivityId);
        const isHighlightWithDescription = getIsHighlightDay({
          highlightOption: !!highlightOptions?.isHighlightWithDescription,
          entryField: 'hasDescription',
          selectedActivityId,
          entries: day.entries
        });
        const isHighlightWithImage = getIsHighlightDay({
          highlightOption: !!highlightOptions?.isHighlightWithImage,
          entryField: 'hasImage',
          selectedActivityId,
          entries: day.entries
        });
        const isHighlightWithVideo = getIsHighlightDay({
          highlightOption: !!highlightOptions?.isHighlightWithVideo,
          entryField: 'hasVideo',
          selectedActivityId,
          entries: day.entries
        });
        const imageSrc = isHighlightWithImage
          ? day.entries.find((entry) => !!entry?.imageSrc)?.imageSrc
          : null;

        const highlightResults = {
          isHighlightWithDescription,
          isHighlightWithImage,
          isHighlightWithVideo
        };

        if (!selectedActivityExtremes) {
          const color = getColorFromPoints(day.points);
          return {
            ...acc,
            [date]: {
              color,
              highlightResults,
              imageSrc
            }
          };
        }

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

          return {
            ...acc,
            [date]: {
              color,
              highlightResults,
              imageSrc
            }
          };
        }

        return acc;
      }, {}) || {},
    [
      daysData?.entriesByDay,
      getIsHighlightDay,
      highlightOptions,
      selectedActivityId,
      selectedActivityExtremes,
      isReverseColors
    ]
  );

  const onRenderDay = useCallback(
    (day: DateTime) => {
      const calendarDate = day.toISODate();

      return daysPayload[calendarDate] || {};
    },
    [daysPayload]
  );

  const { renderDay } = useDatePickerRenderDay({ onRenderDay, isLoading: !daysData });

  return { renderDay, daysData };
};
