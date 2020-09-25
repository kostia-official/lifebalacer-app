import React, { useState, useCallback, ChangeEvent } from 'react';
import { Calendar as MaterialCalendar } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDatePickerRenderDay } from '../hooks/useDatePickerRenderDay';
import { useGetActivitiesQuery, useGetActivityEntriesByDayQuery } from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DateTime } from 'luxon';

const CalendarWrapper = styled.div`
  overflow: hidden;
`;

const FormControlWrapper = styled(FormControl)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormControlStyled = styled(FormControl)`
  width: 200px;
`;

const ALL_ACTIVITIES = 'ALL';

export const Calendar = () => {
  const history = useHistory();
  const { errorMessage, errorTime, onError } = useApolloError();
  const [selectedActivityId, setSelectedActivityId] = useState<string>(ALL_ACTIVITIES);

  const onActivitySelect = useCallback((e: ChangeEvent<{ name?: string; value: any }>) => {
    setSelectedActivityId(e.target?.value);
  }, []);

  const { data: activityData, loading: activityLoading } = useGetActivitiesQuery({ onError });
  const daysVariables =
    selectedActivityId === ALL_ACTIVITIES ? undefined : { activityId: selectedActivityId };
  const { data: daysData } = useGetActivityEntriesByDayQuery({
    onError,
    variables: daysVariables,
    fetchPolicy: 'cache-and-network'
  });
  const daysDates = daysData?.entriesByDay?.map((day) => DateTime.fromISO(day.date).toISODate());

  const { renderDay } = useDatePickerRenderDay({
    onDay: (date: Date) => {
      const calendarDate = DateTime.fromJSDate(date).toISODate();
      const isMark = !!daysDates?.includes(calendarDate);

      return {
        isMark,
        color: 'white'
      };
    }
  });

  if (activityLoading) return <Spinner />;

  return (
    <CalendarWrapper>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

      <FormControlWrapper>
        <FormControlStyled margin="dense">
          <InputLabel>Activity</InputLabel>
          <Select
            value={selectedActivityId || ALL_ACTIVITIES}
            onChange={onActivitySelect}
            displayEmpty
          >
            <MenuItem value={ALL_ACTIVITIES}>All</MenuItem>
            {activityData?.activities?.map((activity) => (
              <MenuItem key={activity._id} value={activity._id}>
                {activity.emoji} {activity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControlStyled>
      </FormControlWrapper>

      <MaterialCalendar
        date={new Date()}
        onChange={(date) => {
          if (!date) return;
          history.push(`/entries/${date.toISOString()}`);
        }}
        renderDay={renderDay}
      />
    </CalendarWrapper>
  );
};
