import React, { Fragment, useCallback } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@material-ui/core';
import { EmptyState } from '../../components/EmptyState';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { useActivities } from '../../hooks/useActivities';
import { Spinner } from '../../components/Spinner';
import { DayTitle } from '../../components/DayTitle';
import { DatePickerButton } from '../EntriesByDay/DatePickerButton';
import { FabButton } from '../../components/FabButton';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery';
import {
  GetJournalQuery,
  GetJournalQueryVariables,
  GetJournalDocument
} from '../../generated/apollo';
import { getEntryLabel } from '../../helpers/entryLabel';

const CardStyled = styled(Card)`
  margin-bottom: 10px;
`;

const CardHeaderStyled = styled(CardHeader)`
  padding: 16px 16px 6px 16px;
`;

const CardContentStyled = styled(CardContent)`
  padding: 10px 16px 0 16px;

  :last-child {
    padding-bottom: 0;
  }
`;

const Emoji = styled.span`
  font-size: 16px;
  margin-right: 1px;
`;

const ActivityTitle = styled(Typography)`
  font-size: 15px;
  margin-bottom: 8px;
`;

const Description = styled(Typography)`
  margin-bottom: 16px;
  white-space: pre-line;
`;

const DatePickerButtonWrapper = styled.div`
  position: fixed;
  bottom: 94px;
  right: 20px;
`;

const Journal = () => {
  const { goForwardTo } = useHistoryNavigation();
  const { errorMessage, onError, errorTime } = useApolloError();

  const { getActivityById, todoistActivity, activities } = useActivities({ onError });

  const { data, isHasMore, loadMore, refetch } = useInfiniteQuery<
    GetJournalQuery,
    GetJournalQueryVariables
  >(GetJournalDocument, 'journal', {
    onError,
    variables: {
      activities: activities
        ?.filter((activity) => activity._id !== todoistActivity?._id)
        .map((activity) => activity._id)
    }
  });

  const journal = data?.journal;

  useOnEntryUpdate([refetch]);

  const onDayClick = useCallback(
    (date = new Date()) => {
      goForwardTo(`/entries/${new Date(date).toISOString()}`);
    },
    [goForwardTo]
  );

  const isLoading = !journal || !activities;

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={isLoading}>
      {journal?.length === 0 ? (
        <EmptyState text="So far no entries with description..." />
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={journal?.length ?? 0}
          next={loadMore}
          hasMore={isHasMore}
          loader={<Spinner />}
        >
          {journal?.map((day) => {
            return (
              <CardStyled key={day.date} onClick={() => onDayClick(day.date)}>
                <CardActionArea>
                  <CardHeaderStyled title={<DayTitle day={day} />} />
                  <CardContentStyled>
                    {day.entries.map((entry) => {
                      const activity = getActivityById(entry.activityId);

                      return (
                        <Fragment key={entry._id}>
                          <ActivityTitle>
                            <Emoji>{activity?.emoji}</Emoji>
                            {getEntryLabel({ entry, activity, isWithEmoji: false })}
                          </ActivityTitle>
                          <Description variant="body2">{entry.description}</Description>
                        </Fragment>
                      );
                    })}
                  </CardContentStyled>
                </CardActionArea>
              </CardStyled>
            );
          })}
        </InfiniteScroll>
      )}

      <DatePickerButtonWrapper>
        <DatePickerButton onChange={onDayClick} />
      </DatePickerButtonWrapper>

      <FabButton onClick={() => onDayClick()} />
    </PageWrapper>
  );
};

export default Journal;
