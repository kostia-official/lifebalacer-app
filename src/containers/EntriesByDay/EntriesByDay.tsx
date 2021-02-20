import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import { DatePickerButton } from './DatePickerButton';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/useApolloError';
import { PageWrapper } from '../../components/PageWrapper';
import { useDaysStatisticText } from '../../hooks/useDaysStatisticText';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FabButton } from '../../components/FabButton';
import { EmptyState } from '../../components/EmptyState';
import { EntriesLabels } from './EntriesLabels';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { Spinner } from '../../components/Spinner';
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery';
import {
  GetEntriesByDayDocument,
  GetEntriesByDayQuery,
  GetEntriesByDayQueryVariables,
  useGetTodoistActivityQuery
} from '../../generated/apollo';
import { getIsToday, toLuxon } from '../../helpers/date';
import { DayCard } from '../../components/DayCard';
import { HeaderCard } from '../../components/HeaderCard';
import { getDayQueryVariables } from '../../helpers/getDayQueryVariables';
import { usePushTokenUpdate } from '../../hooks/usePushTokenUpdate';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { Fragment } from 'react';

const EntriesLabelsWrapper = styled.div`
  margin: 6px 16px 14px 16px;
`;

const DatePickerButtonWrapper = styled.div`
  position: fixed;
  bottom: 140px;
  right: 26px;
`;

const scrollTargetId = 'entries-wrapper';

const EntriesByDay = React.memo(() => {
  const { goForwardTo } = useNavigationHelpers();
  const { errorMessage, errorTime, onError } = useApolloError();

  usePushTokenUpdate({ onError });

  const { statisticText, refetch: refetchStatistic } = useDaysStatisticText({ onError });

  const { data: todoistActivityData } = useGetTodoistActivityQuery({
    onError,
    fetchPolicy: 'cache-first'
  });
  const todoistActivity = todoistActivityData?.todoistActivity;

  const { data, isHasMore, loadMore, refetch: refetchEntriesByDay, loading } = useInfiniteQuery<
    GetEntriesByDayQuery,
    GetEntriesByDayQueryVariables
  >(GetEntriesByDayDocument, {
    scrollTargetId,
    onError,
    field: 'entriesByDay',
    fetchMoreVariables: (data) => getDayQueryVariables(_.last(data.entriesByDay)?.date)
  });

  const entriesByDay = data?.entriesByDay;

  const { isRefetching } = useOnEntryUpdate([refetchEntriesByDay, refetchStatistic]);

  const lastDayDate = _.get(entriesByDay, '[0].date');
  const isLastDayToday = getIsToday(lastDayDate);
  const isNewDayLoading = !isLastDayToday && (loading || isRefetching);

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      goForwardTo('EntriesForm', {
        date: toLuxon(date).toISODate()
      });
    },
    [goForwardTo]
  );

  const isLoading = !entriesByDay || isNewDayLoading;

  const isEmptyState = _.isEmpty(entriesByDay);

  return useMemo(() => {
    return (
      <PageWrapper
        id={scrollTargetId}
        errorMessage={errorMessage}
        errorTime={errorTime}
        isLoading={isLoading}
      >
        {isEmptyState ? (
          <EmptyState text="So far no entries..." />
        ) : (
          <InfiniteScroll
            dataLength={entriesByDay?.length ?? 0}
            next={loadMore}
            loader={<Fragment />}
            hasMore={isHasMore}
            scrollableTarget={scrollTargetId}
          >
            <HeaderCard text={statisticText} />

            {entriesByDay?.map((day) => {
              return (
                <DayCard key={day.date} onClick={onEntryFormOpen} day={day}>
                  <EntriesLabelsWrapper>
                    <EntriesLabels day={day} todoistActivity={todoistActivity} />
                  </EntriesLabelsWrapper>
                </DayCard>
              );
            })}

            {isHasMore && <Spinner />}
          </InfiniteScroll>
        )}

        <DatePickerButtonWrapper>
          <DatePickerButton onChange={onEntryFormOpen} />
        </DatePickerButtonWrapper>

        <FabButton onClick={() => onEntryFormOpen()} isShowBadge={isEmptyState} />
      </PageWrapper>
    );
  }, [
    entriesByDay,
    errorMessage,
    errorTime,
    isEmptyState,
    isHasMore,
    isLoading,
    loadMore,
    onEntryFormOpen,
    statisticText,
    todoistActivity
  ]);
});

export default EntriesByDay;
