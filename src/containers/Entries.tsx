import React, { useCallback, useState, Fragment } from 'react';
import { DatePickerButton } from './DatePickerButton';
import { AddFabButton } from '../components/AddFabButton';
import styled from 'styled-components';
import { useGetEntriesByDayQuery } from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';
import { List, ListItem, ListItemText, Typography, ListSubheader } from '@material-ui/core';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { PageWrapper } from '../components/PageWrapper';
import { useDaysStatisticText } from '../hooks/useDaysStatisticText';
import { getEntryLabel } from '../helpers/getEntryLabel';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const { isStatisticLoading, statisticText } = useDaysStatisticText();
  const [isHasMore, setIsHasMore] = useState(true);

  const { data, loading: isEntriesLoading, fetchMore } = useGetEntriesByDayQuery({ onError });
  const days = data?.entriesByDay;

  const onLoadMore = useCallback(() => {
    const lastDate: string = _.chain(days)
      .last()
      .get('entries')
      .orderBy(['completedAt'], ['desc'])
      .last()
      .get('completedAt')
      .value();

    if (!lastDate) return;

    fetchMore({
      variables: {
        dateAfter: lastDate
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || _.isEmpty(fetchMoreResult?.entriesByDay)) {
          setIsHasMore(false);
          return prev;
        }

        return Object.assign({}, prev, {
          entriesByDay: [...prev.entriesByDay, ...fetchMoreResult.entriesByDay]
        });
      }
    }).then();
  }, [days, fetchMore]);

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      history.push(`/entries/${new Date(date).toISOString()}`);
    },
    [history]
  );

  const isLoading = isStatisticLoading || isEntriesLoading;

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={isLoading}>
      {_.isEmpty(days) ? (
        <Typography>So far no entries...</Typography>
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={days?.length ?? 0}
          next={onLoadMore}
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
            {days?.map((day) => {
              const activitiesText = day.entries
                .map((entry) => getEntryLabel({ entry, activity: entry.activity }))
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
        </InfiniteScroll>
      )}

      <DatePickerButtonWrapper>
        <DatePickerButton onChange={onEntryFormOpen} />
      </DatePickerButtonWrapper>
      <AddFabButtonWrapper>
        <AddFabButton onClick={() => onEntryFormOpen()} />
      </AddFabButtonWrapper>
    </PageWrapper>
  );
};
