import React, { useCallback, Fragment } from 'react';
import { DatePickerButton } from './DatePickerButton';
import styled from 'styled-components';
import { useApolloError } from '../hooks/useApolloError';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import { Loadable } from '../components/Loadable';
import { useDaysStatisticText } from '../hooks/useDaysStatisticText';
import { EntryLabel } from '../components/EntryLabel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { groupTodoistEntries } from '../helpers/groupTodoistEntries';
import { useActivities } from '../hooks/useActivities';
import { FabButton } from '../components/FabButton';
import { usePushTokenSave } from '../hooks/usePushTokenSave';
import { useInfiniteEntriesByDay } from '../hooks/useInfiniteEntriesByDay';
import { EmptyState } from '../components/EmptyState';

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

const ActivitiesLabelsWrapper = styled.span`
  display: inline-block;
  margin: 4px 0 0 0;
  font-size: 14px;
`;

const EntriesDivider = styled.span`
  margin-right: 7px;
`;

export const Entries = () => {
  const history = useHistory();
  const { errorMessage, errorTime, onError } = useApolloError();

  usePushTokenSave({ onError });

  const { statisticText } = useDaysStatisticText({ onError });
  const { getActivityById, todoistActivity } = useActivities({ onError });

  const { entriesByDay, isHasMore, loadMore } = useInfiniteEntriesByDay({ onError });

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      history.push(`/entries/${new Date(date).toISOString()}`);
    },
    [history]
  );

  return (
    <Loadable errorMessage={errorMessage} errorTime={errorTime} isLoading={!entriesByDay}>
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
              const { entriesWithTodoistGroup } = groupTodoistEntries({
                entries: day.entries,
                todoistActivityId: todoistActivity?._id
              });

              const activitiesLabels = entriesWithTodoistGroup.reduce<any[]>(
                (acc, entry, index, array) => {
                  const isLast = index === array.length - 1;

                  const dividerOptional = isLast
                    ? []
                    : [<EntriesDivider key={entry._id + '-divider'}>,</EntriesDivider>];

                  return [
                    ...acc,
                    <EntryLabel
                      key={entry._id}
                      entry={entry}
                      activity={getActivityById(entry.activityId)}
                    />,
                    ...dividerOptional
                  ];
                },
                []
              );

              return (
                <ListItem key={day.date} onClick={() => onEntryFormOpen(day.date)} button>
                  <ListItemText
                    primary={DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_HUGE)}
                    secondary={
                      <ActivitiesLabelsWrapper>{activitiesLabels}</ActivitiesLabelsWrapper>
                    }
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
