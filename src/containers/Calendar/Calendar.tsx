import React, { useCallback, ChangeEvent, useMemo, useState, useEffect } from 'react';
import { Calendar as MaterialCalendar, useStaticState } from '@material-ui/pickers';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { CalendarLegends } from './CalendarLegends';
import { useActivities } from '../../hooks/apollo/useActivities';
import {
  useGetActivitiesExtremesQuery,
  ActivityType,
  useUpdateActivityMutation,
  refetchGetActivitiesQuery,
  refetchGetActivitiesExtremesQuery
} from '../../generated/apollo';
import { ValueGradient } from './ValueGradient';
import { useDatePickerRenderDayExtremes } from '../../hooks/apollo/useDatePickerRenderDayExtremes';
import { useReactiveVar } from '@apollo/client';
import { calendarActivityIdVar } from '../../reactiveState';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { useOnActivityUpdate } from '../../hooks/useOnActivityUpdate';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { Greyscale } from '../../components/Greyscale';
import { toLuxon } from '../../helpers/date';
import { useRoute } from '@react-navigation/native';

const CalendarWrapper = styled.div`
  overflow: hidden;
`;

const CalendarLegendsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const FormControlWrapper = styled(FormControl)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormControlStyled = styled(FormControl)`
  width: 200px;
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
    setIsCanRenderCalendar(true);
  }, []);

  const { errorMessage, errorTime, onError } = useApolloError();
  const selectedActivityId = useReactiveVar(calendarActivityIdVar);

  const onActivitySelect = useCallback((e: ChangeEvent<{ name?: string; value: any }>) => {
    calendarActivityIdVar(e.target?.value);
  }, []);

  const { allActivities } = useActivities({ onError });
  const { data, refetch: refetchExtremes } = useGetActivitiesExtremesQuery({ onError });
  const activitiesExtremes = data?.activitiesExtremes;

  useOnEntryUpdate([refetchExtremes]);
  useOnActivityUpdate([refetchExtremes]);

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
    selectedActivityExtremes,
    isReverseColors
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

  return (
    <ScreenWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={!allActivities || !isCanRenderCalendar}
    >
      <CalendarWrapper>
        <FormControlWrapper>
          <FormControlStyled margin="dense">
            <InputLabel shrink>Activity</InputLabel>
            <Select value={selectedActivityId} onChange={onActivitySelect} displayEmpty>
              <MenuItem value="">All</MenuItem>
              {allActivities?.map((activity) => (
                <MenuItem key={activity._id} value={activity._id}>
                  <Greyscale isEnable={activity.isArchived}>
                    {activity.emoji} {activity.name}
                  </Greyscale>
                </MenuItem>
              ))}
            </Select>
          </FormControlStyled>
        </FormControlWrapper>

        <MaterialCalendarWrapper>
          {isCanRenderCalendar && <MaterialCalendar {...pickerProps} renderDay={renderDay} />}
        </MaterialCalendarWrapper>

        <CalendarLegendsWrapper>
          {!selectedActivity ||
          selectedActivity.isWidget ||
          selectedActivity?.valueType === ActivityType.Simple ? (
            <CalendarLegends />
          ) : (
            <ValueGradient
              isReverseColors={isReverseColors}
              onReverseColors={reverseColors}
              min={selectedActivityExtremes?.min!}
              max={selectedActivityExtremes?.max!}
            />
          )}
        </CalendarLegendsWrapper>
      </CalendarWrapper>
    </ScreenWrapper>
  );
};

export default Calendar;
