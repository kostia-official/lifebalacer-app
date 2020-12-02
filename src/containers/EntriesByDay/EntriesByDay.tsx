import React, { useCallback } from 'react';
import { DatePickerButton } from './DatePickerButton';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/useApolloError';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { useDaysStatisticText } from '../../hooks/useDaysStatisticText';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useActivities } from '../../hooks/useActivities';
import { FabButton } from '../../components/FabButton';
import { usePushTokenSave } from '../../hooks/usePushTokenSave';
import { useInfiniteEntriesByDay } from '../../hooks/useInfiniteEntriesByDay';
import { EmptyState } from '../../components/EmptyState';
import { EntriesLabels } from './EntriesLabels';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { DayTitle } from '../../components/DayTitle';
import { Spinner } from '../../components/Spinner';

const StyledList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: 6px;
`;

const DatePickerButtonWrapper = styled.div`
  position: fixed;
  bottom: 94px;
  right: 20px;
`;

export const EntriesByDay = () => {
  const history = useHistory();
  const { errorMessage, errorTime, onError } = useApolloError();

  usePushTokenSave({ onError });

  const { statisticText, refetch: refetchStatistic } = useDaysStatisticText({ onError });
  const { activities, todoistActivity, getActivityById } = useActivities({ onError });

  const {
    entriesByDay,
    isHasMore,
    loadMore,
    refetch: refetchEntriesByDay
  } = useInfiniteEntriesByDay({ onError });

  useOnEntryUpdate([refetchEntriesByDay, refetchStatistic]);

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      history.push(`/entries/${new Date(date).toISOString()}`);
    },
    [history]
  );

  const isLoading = !entriesByDay || !activities;

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={isLoading}>
      {entriesByDay?.length === 0 ? (
        <EmptyState text="So far no entries..." />
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={entriesByDay?.length ?? 0}
          next={loadMore}
          hasMore={isHasMore}
          loader={<Spinner />}
        >
          <StyledList
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {statisticText}
              </ListSubheader>
            }
          >
            {entriesByDay?.map((day) => {
              return (
                <ListItem key={day.date} onClick={() => onEntryFormOpen(day.date)} button>
                  <ListItemText
                    primary={<DayTitle day={day} />}
                    secondary={
                      <EntriesLabels
                        entries={day.entries}
                        todoistActivity={todoistActivity}
                        getActivityById={getActivityById}
                      />
                    }
                  />
                </ListItem>
              );
            })}
          </StyledList>
        </InfiniteScroll>
      )}

      <DatePickerButtonWrapper>
        <DatePickerButton onChange={onEntryFormOpen} />
      </DatePickerButtonWrapper>

      <FabButton onClick={() => onEntryFormOpen()} />
    </PageWrapper>
  );
};
