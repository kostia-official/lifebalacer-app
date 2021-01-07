import React, { useCallback } from 'react';
import _ from 'lodash';
import { DatePickerButton } from './DatePickerButton';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/useApolloError';
import { Card, Typography } from '@material-ui/core';
import { PageWrapper } from '../../components/PageWrapper';
import { useDaysStatisticText } from '../../hooks/useDaysStatisticText';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useActivities } from '../../hooks/useActivities';
import { FabButton } from '../../components/FabButton';
import { usePushTokenSave } from '../../hooks/usePushTokenSave';
import { EmptyState } from '../../components/EmptyState';
import { EntriesLabels } from './EntriesLabels';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { Spinner } from '../../components/Spinner';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery';
import {
  GetEntriesByDayDocument,
  GetEntriesByDayQuery,
  GetEntriesByDayQueryVariables
} from '../../generated/apollo';
import { getIsToday } from '../../helpers/date';
import { DayCard } from '../../components/DayCard';

const HeaderCard = styled(Card)`
  margin-bottom: 10px;
`;

const HeaderContent = styled(Typography)`
  margin: 10px 16px;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const EntriesLabelsWrapper = styled.div`
  margin: 6px 16px 14px 16px;
`;

const DatePickerButtonWrapper = styled.div`
  position: fixed;
  bottom: 94px;
  right: 20px;
`;

const EntriesByDay = () => {
  const { goForwardTo } = useHistoryNavigation();
  const { errorMessage, errorTime, onError } = useApolloError();

  usePushTokenSave({ onError });

  const { statisticText, refetch: refetchStatistic } = useDaysStatisticText({ onError });
  const { activities, todoistActivity, getActivityById } = useActivities({ onError });

  const { data, isHasMore, loadMore, refetch: refetchEntriesByDay, loading } = useInfiniteQuery<
    GetEntriesByDayQuery,
    GetEntriesByDayQueryVariables
  >(GetEntriesByDayDocument, 'entriesByDay', { onError });

  const entriesByDay = data?.entriesByDay;

  const { isRefetching } = useOnEntryUpdate([refetchEntriesByDay, refetchStatistic]);

  const isNewDayLoading = !getIsToday(_.get(entriesByDay, '[0].date')) && (loading || isRefetching);

  const onEntryFormOpen = useCallback(
    (date = new Date()) => {
      goForwardTo(`/entries/${new Date(date).toISOString()}`);
    },
    [goForwardTo]
  );

  const isLoading = !entriesByDay || !activities || isNewDayLoading;

  const isEmptyState = _.isEmpty(entriesByDay);

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={isLoading}>
      {isEmptyState ? (
        <EmptyState text="So far no entries..." />
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={entriesByDay?.length ?? 0}
          next={loadMore}
          hasMore={isHasMore}
          loader={<Spinner />}
        >
          <HeaderCard key="stats">
            <HeaderContent variant="subtitle2">{statisticText}</HeaderContent>
          </HeaderCard>

          {entriesByDay?.map((day) => {
            return (
              <DayCard key={day.date} onClick={onEntryFormOpen} day={day}>
                <EntriesLabelsWrapper>
                  <EntriesLabels
                    day={day}
                    todoistActivity={todoistActivity}
                    getActivityById={getActivityById}
                  />
                </EntriesLabelsWrapper>
              </DayCard>
            );
          })}
        </InfiniteScroll>
      )}

      <DatePickerButtonWrapper>
        <DatePickerButton onChange={onEntryFormOpen} />
      </DatePickerButtonWrapper>

      <FabButton onClick={() => onEntryFormOpen()} isShowBadge={isEmptyState} />
    </PageWrapper>
  );
};

export default EntriesByDay;
