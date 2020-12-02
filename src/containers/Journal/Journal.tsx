import React, { Fragment, useCallback } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@material-ui/core';
import { EmptyState } from '../../components/EmptyState';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DateTime } from 'luxon';
import { useInfiniteJournal } from '../../hooks/useInfiniteJournal';
import styled from 'styled-components';
import { useActivities } from '../../hooks/useActivities';
import { Spinner } from '../../components/Spinner';
import { useHistory } from 'react-router-dom';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const ActivityTitle = styled(Typography)`
  margin-bottom: 8px;
`;

const Description = styled(Typography)`
  margin-bottom: 16px;
`;

export const Journal = () => {
  const { errorMessage, onError, errorTime } = useApolloError();

  const { getActivityById, todoistActivity, activities } = useActivities({ onError });

  const { journal, isHasMore, loadMore, refetch } = useInfiniteJournal({
    onError,
    variables: {
      activities: activities
        ?.filter((activity) => activity._id !== todoistActivity?._id)
        .map((activity) => activity._id)
    }
  });

  useOnEntryUpdate([refetch]);

  const history = useHistory();

  const onDayClick = useCallback(
    (date = new Date()) => () => {
      history.push(`/entries/${new Date(date).toISOString()}`);
    },
    [history]
  );

  const isLoading = !journal || !activities;

  console.log('isHasMore', isHasMore);

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
              <CardStyled key={day.date} onClick={onDayClick(day.date)}>
                <CardActionArea>
                  <CardHeaderStyled
                    title={
                      <TitleWrapper>
                        <Typography>
                          {DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_HUGE)}
                        </Typography>
                        <Typography>{day.points}</Typography>
                      </TitleWrapper>
                    }
                  />
                  <CardContentStyled>
                    {day.entries.map((entry) => {
                      const activity = getActivityById(entry.activityId);

                      return (
                        <Fragment key={entry._id}>
                          <ActivityTitle variant="body1">
                            {activity?.emoji} {activity?.name}
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
    </PageWrapper>
  );
};
