import React, { useCallback, Fragment } from 'react';
import { DatePickerButton } from '../DatePickerButton';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/useApolloError';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import { Loadable } from '../../components/Loadable';
import { useDaysStatisticText } from '../../hooks/useDaysStatisticText';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useActivities } from '../../hooks/useActivities';
import { FabButton } from '../../components/FabButton';
import { usePushTokenSave } from '../../hooks/usePushTokenSave';
import { useInfiniteEntriesByDay } from '../../hooks/useInfiniteEntriesByDay';
import { EmptyState } from '../../components/EmptyState';
import { EntriesLabels } from './EntriesLabels';
import { useOnEntryUpdated } from '../../hooks/useOnEntryUpdated';
import { authService } from '../../services/auth0';

const StyledList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const PointsText = styled(ListItemText)`
  flex-grow: 0;
  min-width: 30px;
  margin-left: 10px;
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
  const { activities } = useActivities({ onError });
  const {
    entriesByDay,
    isHasMore,
    loadMore,
    refetch: refetchEntriesByDay
  } = useInfiniteEntriesByDay({ onError });

  const onEntryUpdated = useCallback(() => {
    refetchEntriesByDay().then();
    refetchStatistic().then();
  }, [refetchEntriesByDay, refetchStatistic]);

  useOnEntryUpdated({
    userId: authService.getUserId()!,
    onEvent: onEntryUpdated
  });

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      history.push(`/entries/${new Date(date).toISOString()}`);
    },
    [history]
  );

  const isLoading = !entriesByDay || !activities;

  return (
    <Loadable errorMessage={errorMessage} errorTime={errorTime} isLoading={isLoading}>
      {entriesByDay?.length === 0 ? (
        <EmptyState text="So far no entries..." />
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={entriesByDay?.length ?? 0}
          next={loadMore}
          hasMore={isHasMore}
          loader={<Fragment />}
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
                    primary={DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_HUGE)}
                    secondary={<EntriesLabels entries={day.entries} />}
                  />
                  <PointsText primary={day.points} />
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
    </Loadable>
  );
};
