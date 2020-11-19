import React, { useState, useCallback, ChangeEvent } from 'react';
import { Calendar as MaterialCalendar } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDatePickerRenderDay } from '../../hooks/useDatePickerRenderDay';
import { useApolloError } from '../../hooks/useApolloError';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Loadable } from '../../components/Loadable';
import { DateTime } from 'luxon';
import { CalendarLegends } from './CalendarLegends';
import { useActivities } from '../../hooks/useActivities';

const CalendarWrapper = styled.div`
  overflow: hidden;
`;

const CalendarLegendsWrapper = styled.div`
  margin-top: 20px;
`;

const FormControlWrapper = styled(FormControl)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormControlStyled = styled(FormControl)`
  width: 200px;
`;

export const Calendar = () => {
  const history = useHistory();
  const { errorMessage, errorTime, onError } = useApolloError();
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');

  const onActivitySelect = useCallback((e: ChangeEvent<{ name?: string; value: any }>) => {
    setSelectedActivityId(e.target?.value);
  }, []);

  const { activities } = useActivities({ onError });

  const { renderDay, daysData } = useDatePickerRenderDay({
    onError,
    activityId: selectedActivityId
  });

  return (
    <Loadable
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={!activities || !daysData}
    >
      <CalendarWrapper>
        <FormControlWrapper>
          <FormControlStyled margin="dense">
            <InputLabel shrink>Activity</InputLabel>
            <Select value={selectedActivityId} onChange={onActivitySelect} displayEmpty>
              <MenuItem value="">All</MenuItem>
              {activities?.map((activity) => (
                <MenuItem key={activity._id} value={activity._id}>
                  {activity.emoji} {activity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControlStyled>
        </FormControlWrapper>

        <MaterialCalendar
          date={DateTime.local()}
          onChange={(date) => {
            if (!date) return;
            history.push(`/entries/${date.toISO()}`);
          }}
          renderDay={renderDay}
        />

        <CalendarLegendsWrapper>
          <CalendarLegends />
        </CalendarLegendsWrapper>
      </CalendarWrapper>
    </Loadable>
  );
};
