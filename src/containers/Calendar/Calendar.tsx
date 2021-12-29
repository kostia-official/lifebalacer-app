import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Calendar as MaterialCalendar, useStaticState } from '@material-ui/pickers';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { CalendarLegends } from './components/CalendarLegends';
import { useActivities } from '../../hooks/apollo/useActivities';
import {
  useGetActivitiesExtremesQuery,
  ActivityType,
  useUpdateActivityMutation,
  refetchGetActivitiesQuery,
  refetchGetActivitiesExtremesQuery
} from '../../generated/apollo';
import { ValueGradient } from './components/ValueGradient';
import { useDatePickerRenderDayExtremes } from '../../hooks/apollo/useDatePickerRenderDayExtremes';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { useOnActivityUpdate } from '../../hooks/useOnActivityUpdate';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { toLuxon } from '../../helpers/date';
import { useRoute } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import { FabWrapper } from '../../components/FabWrapper';
import { useCalendarFilters } from './components/CalendarFilters/hooks/useCalendarFilters';
import { CalendarFilters } from './components/CalendarFilters/CalendarFilters';

const CalendarWrapper = styled.div`
  overflow: hidden;
`;

const CalendarLegendsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MaterialCalendarWrapper = styled.div`
  & .MuiPickersCalendarHeader-iconButton {
    top: 155px;
  }
`;

const Calendar = () => {
  const route = useRoute();

  const { goForwardTo } = useNavigationHelpers();
  const [isCanRenderCalendar, setIsCanRenderCalendar] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsCanRenderCalendar(true);
    });
  }, []);

  const { errorMessage, errorTime, onError } = useApolloError();

  const { allActivities } = useActivities({ onError, skip: !isCanRenderCalendar });
  const { data, refetch: refetchExtremes } = useGetActivitiesExtremesQuery({
    onError,
    skip: !isCanRenderCalendar
  });
  const activitiesExtremes = data?.activitiesExtremes;

  useOnEntryUpdate([refetchExtremes]);
  useOnActivityUpdate([refetchExtremes]);

  const {
    persistFilters: { activityId: selectedActivityId, ...highlightOptions }
  } = useCalendarFilters();

  const selectedActivity = useMemo(() => {
    return allActivities?.find(({ _id }) => _id === selectedActivityId);
  }, [allActivities, selectedActivityId]);

  const selectedActivityExtremes = useMemo(() => {
    return activitiesExtremes?.find(({ _id }) => _id === selectedActivityId);
  }, [activitiesExtremes, selectedActivityId]);

  const [isReverseColors, setIsReverseColors] = useState(!!selectedActivity?.isReverseColors);

  useEffect(() => {
    setIsReverseColors(!!selectedActivity?.isReverseColors);
  }, [selectedActivity]);

  const [updateActivity] = useUpdateActivityMutation({
    onError,
    refetchQueries: [refetchGetActivitiesQuery(), refetchGetActivitiesExtremesQuery()]
  });

  const reverseColors = useCallback(
    (newValue) => {
      setIsReverseColors(newValue);

      if (selectedActivity) {
        updateActivity({
          variables: { _id: selectedActivity?._id, data: { isReverseColors: newValue } }
        }).then();
      }
    },
    [selectedActivity, updateActivity]
  );

  const { renderDay } = useDatePickerRenderDayExtremes({
    onError,
    selectedActivityId,
    selectedActivityExtremes,
    isReverseColors,
    highlightOptions,
    skip: !isCanRenderCalendar
  });

  const onDateChange = useCallback(
    (date) => {
      if (!date) return;

      const nextRouteMapper: Record<string, string> = {
        EntriesCalendar: 'EntriesForm',
        Calendar: 'CalendarEntries'
      };

      goForwardTo(nextRouteMapper[route.name], {
        date: toLuxon(date).toISODate()
      });
    },
    [goForwardTo, route.name]
  );

  const [date] = useState(new Date());

  const { pickerProps } = useStaticState({
    value: date,
    onChange: onDateChange
  });

  const isShowDaysLegend =
    !selectedActivity ||
    selectedActivity.isWidget ||
    selectedActivity?.valueType === ActivityType.Simple;

  return (
    <>
      <ScreenWrapper
        errorMessage={errorMessage}
        errorTime={errorTime}
        isLoading={!allActivities || !isCanRenderCalendar}
        unmountOnHide
      >
        <CalendarWrapper>
          <MaterialCalendarWrapper>
            {isCanRenderCalendar && <MaterialCalendar {...pickerProps} renderDay={renderDay} />}
          </MaterialCalendarWrapper>

          <CalendarLegendsWrapper>
            {isShowDaysLegend ? (
              <CalendarLegends selectedActivity={selectedActivity} />
            ) : (
              <ValueGradient
                selectedActivity={selectedActivity}
                isReverseColors={isReverseColors}
                onReverseColors={reverseColors}
                min={selectedActivityExtremes?.min!}
                max={selectedActivityExtremes?.max!}
              />
            )}
          </CalendarLegendsWrapper>
        </CalendarWrapper>
      </ScreenWrapper>

      <FabWrapper>
        <CalendarFilters />
      </FabWrapper>
    </>
  );
};

export default Calendar;
