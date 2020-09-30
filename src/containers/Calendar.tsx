import React, { useState, useCallback, ChangeEvent } from 'react';
import { Calendar as MaterialCalendar } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDatePickerRenderDay } from '../hooks/useDatePickerRenderDay';
import { useGetActivitiesQuery } from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { PageWrapper } from '../components/PageWrapper';
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

export const Calendar = () => {
  const history = useHistory();
  const { errorMessage, errorTime, onError } = useApolloError();
  const [selectedActivityId, setSelectedActivityId] = useState<string>();

  const onActivitySelect = useCallback((e: ChangeEvent<{ name?: string; value: any }>) => {
    setSelectedActivityId(e.target?.value);
  }, []);

  const { data: activityData } = useGetActivitiesQuery({ onError });

  const { renderDay, daysData } = useDatePickerRenderDay({
    onError,
    activityId: selectedActivityId
  });

  return (
    <PageWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={!activityData || !daysData}
    >
      <CalendarWrapper>
        <FormControlWrapper>
          <FormControlStyled margin="dense">
            <InputLabel>Activity</InputLabel>
            <Select value={selectedActivityId ?? ' '} onChange={onActivitySelect} displayEmpty>
              <MenuItem value=" ">All</MenuItem>
              {activityData?.activities?.map((activity) => (
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
      </CalendarWrapper>
    </PageWrapper>
  );
};
