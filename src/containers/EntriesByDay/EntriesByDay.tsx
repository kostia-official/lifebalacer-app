import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import EventIcon from '@material-ui/icons/Event';
import { useApolloError } from '../../hooks/useApolloError';
import { ScreenWrapper } from '../App/ScreenWrapper';
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
import { FabWrapper } from '../../components/FabWrapper';
import { EmptyBlock } from '../../components/EmptyBlock';
import { useLocalNotificationsUpdate } from '../../hooks/useLocalNotificationsUpdate';
import { useCheckStoreSubscription } from '../../hooks/storeSubscription/useCheckStoreSubscription';

const EntriesLabelsWrapper = styled.div`
  margin: 6px 16px 14px 16px;
`;

const scrollTargetId = 'entries-wrapper';

const EntriesByDay = React.memo(() => {
  const { goForwardTo, goForwardToCb } = useNavigationHelpers();
  const { errorMessage, errorTime, onError } = useApolloError();

  usePushTokenUpdate({ onError });
  useLocalNotificationsUpdate({ onError });
  useCheckStoreSubscription({ onError });

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
      <ScreenWrapper
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
            loader={<Spinner />}
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
          </InfiniteScroll>
        )}

        <FabWrapper>
          <FabButton icon={<EventIcon />} onClick={goForwardToCb('EntriesCalendar')} />

          <EmptyBlock height={16} />

          <FabButton onClick={() => onEntryFormOpen()} isShowBadge={isEmptyState} />
        </FabWrapper>
      </ScreenWrapper>
    );
  }, [
    entriesByDay,
    errorMessage,
    errorTime,
    goForwardToCb,
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
