import React, { Fragment, useCallback } from 'react';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { Typography } from '@material-ui/core';
import { EmptyState } from '../../components/EmptyState';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled, { css } from 'styled-components';
import { useActivities } from '../../hooks/apollo/useActivities';
import { Spinner } from '../../components/Spinner';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { useInfiniteQuery } from '../../hooks/apollo/useInfiniteQuery';
import {
  GetJournalQuery,
  GetJournalQueryVariables,
  GetJournalDocument
} from '../../generated/apollo';
import { getEntryLabel } from '../../helpers/entryLabel';
import { DayCard } from '../../components/DayCard';
import { Emoji } from '../../components/Emoji';
import _ from 'lodash';
import { getDayQueryVariables } from '../../helpers/getDayQueryVariables';
import { toLuxon } from '../../helpers/date';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { sanitizeHtml } from '../../helpers/sanitizeHtml';
import { desktopStyles } from '../../common/breakpoints';
import { BackgroundColor } from '../../common/colors';

const ActivityTitle = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Description = styled(Typography)`
  max-height: 10000px; // Fixes FontBoosting for mobile
  font-size: 16px;
  margin-bottom: 16px;
  white-space: pre-line;

  :last-child {
    margin-bottom: 0;
  }
`;

const CKEditorContent = styled.span`
  figure {
    margin: 0;
  }

  & img,
  video {
    ${desktopStyles(css`
      height: 60vh;
      width: auto;
    `)}
    height: auto;
    width: 100%;
    display: block;
    background-color: ${BackgroundColor.Lighter};
  }

  .todo-list {
    list-style-type: none;
    margin: 0;
    padding: 0 0 0 16px;
  }

  .todo-list__label input {
    margin-right: 8px;
  }

  p {
    :first-child {
      margin-block-start: 0;
    }

    :last-child {
      margin-block-end: 0;
    }
  }

  ul,
  ol {
    margin: 0;

    :last-child {
      margin-block-end: 0;
    }
  }
`;

const DayContent = styled.div`
  padding: 16px;
`;

const scrollTargetId = 'journal-wrapper';
const daysLimit = 14;

const Journal = () => {
  const { goForwardTo } = useNavigationHelpers();
  const { errorMessage, onError, errorTime } = useApolloError();

  const { getActivityById, allActivities } = useActivities({ onError });

  const { data, isHasMore, loadMore, refetch } = useInfiniteQuery<
    GetJournalQuery,
    GetJournalQueryVariables
  >(GetJournalDocument, {
    onError,
    field: 'journal',
    variables: {
      daysLimit
    },
    fetchMoreVariables: (data) => ({
      ...getDayQueryVariables(_.last(data.journal)?.date),
      daysLimit
    })
  });

  const journal = data?.journal;

  useOnEntryUpdate([refetch]);

  const onDayClick = useCallback(
    (date = new Date()) => {
      goForwardTo('JournalEntries', { date: toLuxon(date).toISODate() });
    },
    [goForwardTo]
  );

  const isLoading = !journal || !allActivities;

  return (
    <ScreenWrapper
      id={scrollTargetId}
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={isLoading}
    >
      {journal?.length === 0 ? (
        <EmptyState text="So far no entries with description..." />
      ) : (
        <InfiniteScroll
          dataLength={journal?.length ?? 0}
          next={loadMore}
          loader={<Spinner />}
          hasMore={isHasMore}
          scrollableTarget={scrollTargetId}
        >
          {journal?.map((day) => {
            return (
              <DayCard key={day.date} day={day} onClick={onDayClick}>
                <DayContent>
                  {day.entries.map((entry) => {
                    const activity = getActivityById(entry.activityId);

                    return (
                      <Fragment key={entry._id}>
                        <ActivityTitle>
                          <Emoji>{activity?.emoji}</Emoji>
                          {getEntryLabel({ entry, activity })}
                        </ActivityTitle>

                        <Description variant="body2">
                          {entry.description && (
                            <CKEditorContent
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(entry.description)
                              }}
                            />
                          )}
                        </Description>
                      </Fragment>
                    );
                  })}
                </DayContent>
              </DayCard>
            );
          })}
        </InfiniteScroll>
      )}
    </ScreenWrapper>
  );
};

export default Journal;
