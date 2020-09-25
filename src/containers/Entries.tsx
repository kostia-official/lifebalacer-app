import React, { useCallback } from 'react';
import { DatePickerButton } from '../components/DatePickerButton';
import { AddFabButton } from '../components/AddFabButton';
import styled from 'styled-components';
import { useGetEntriesByDayQuery } from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

const StyledList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const PointsText = styled(ListItemText)`
  flex-grow: 0;
`;

const DatePickerButtonWrapper = styled.div`
  position: fixed;
  bottom: 90px;
  right: 16px;
`;
const AddFabButtonWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

export const Entries = () => {
  const history = useHistory();
  const { errorMessage, errorTime, onError } = useApolloError();
  const { data, loading } = useGetEntriesByDayQuery({ onError });

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      history.push(`/entries/${new Date(date).toISOString()}`);
    },
    [history]
  );

  const entries = data?.entriesByDay;

  const renderPickerDay = useCallback(
    (date: Date) => {
      const calendarDate = DateTime.fromJSDate(date).ordinal;

      const isMark = !!entries?.find((day) => {
        const entryDay = DateTime.fromISO(day.date).ordinal;

        return calendarDate === entryDay;
      });

      return {
        isMark,
        color: 'white'
      };
    },
    [entries]
  );

  if (loading) return <Spinner />;

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

      {_.isEmpty(entries) ? (
        <Typography>So far no entries...</Typography>
      ) : (
        <StyledList>
          {entries?.map((day) => {
            const activitiesText = day.entries
              .map(({ activity, value }) => {
                return `${activity.emoji} ${activity.name}${value ? ` (${value})` : ''}`;
              })
              .join(', ');

            return (
              <ListItem key={day.date} onClick={() => onEntryFormOpen(day.date)} button>
                <ListItemText
                  primary={DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_HUGE)}
                  secondary={activitiesText}
                />
                <PointsText primary={day.points} />
              </ListItem>
            );
          })}
        </StyledList>
      )}

      <DatePickerButtonWrapper>
        <DatePickerButton onChange={onEntryFormOpen} onRenderDay={renderPickerDay} />
      </DatePickerButtonWrapper>
      <AddFabButtonWrapper>
        <AddFabButton onClick={() => onEntryFormOpen()} />
      </AddFabButtonWrapper>
    </div>
  );
};
