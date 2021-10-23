import React from 'react';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { EmptyState } from '../../components/EmptyState';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../../components/Spinner';
import { useInfiniteQuery } from '../../hooks/apollo/useInfiniteQuery';
import {
  GetGoalsResultsDocument,
  GetGoalsResultsQuery,
  GetGoalsResultsQueryVariables,
  GoalResultFragment
} from '../../generated/apollo';
import _ from 'lodash';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { getTimezone, makeDateFormatter } from '../../helpers/date';
import { getGoalDurationDates } from '../../helpers/goal';
import { GoalsResultsGroupCard } from './components/GoalsResultsGroupCard';
import { FabWrapper } from '../../components/FabWrapper';
import { GoalsResultsFilters } from './components/GoalsResultsFilters';
import { useGoalsResultsFilters } from './hooks/useGoalsResultsFilters';
import { DateTime } from 'luxon';

const scrollTargetId = 'goals-results-wrapper';
const limit = 30;

type GroupedGoalsResults = Record<string, GoalResultFragment[]>;

const dateFormatter = makeDateFormatter({
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

const GoalsResults = () => {
  const { errorMessage, onError, errorTime } = useApolloError();

  const currentDate = DateTime.local().endOf('day').toISO();

  const { filters } = useGoalsResultsFilters();

  const { data, isHasMore, loadMore } = useInfiniteQuery<
    GetGoalsResultsQuery,
    GetGoalsResultsQueryVariables
  >(GetGoalsResultsDocument, {
    onError,
    field: 'goalsResults',
    variables: {
      durationType: filters.duration,
      goalsIds: filters.goalsIds,
      limit,
      dateAfter: currentDate
    },
    fetchMoreVariables: (data) => ({
      limit,
      dateAfter: _.last(data.goalsResults)?.recordedAt!
    })
  });
  const goalsResults = data?.goalsResults;

  const groupedGoalsResults: GroupedGoalsResults | undefined = data?.goalsResults.reduce(
    (acc, item) => {
      const {
        recordedAt,
        goal: { durationType }
      } = item;

      const { startDate, endDate } = getGoalDurationDates({
        durationType,
        recordedAt,
        timezone: getTimezone()
      });

      const dateRange = dateFormatter.formatRange(new Date(startDate), new Date(endDate));
      const goalsResults = acc[dateRange] || [];

      return { ...acc, [dateRange]: [...goalsResults, item] };
    },
    {} as GroupedGoalsResults
  );

  const isLoading = !goalsResults;

  return (
    <>
      <ScreenWrapper
        id={scrollTargetId}
        errorMessage={errorMessage}
        errorTime={errorTime}
        isLoading={isLoading}
      >
        {goalsResults?.length === 0 ? (
          <EmptyState text="So far no results for your goals..." />
        ) : (
          <InfiniteScroll
            dataLength={goalsResults?.length ?? 0}
            next={loadMore}
            loader={<Spinner />}
            hasMore={isHasMore}
            scrollableTarget={scrollTargetId}
          >
            {groupedGoalsResults &&
              Object.entries(groupedGoalsResults).map(([dateRange, goalsResults]) => (
                <GoalsResultsGroupCard
                  key={dateRange}
                  dateRange={dateRange}
                  goalsResults={goalsResults}
                />
              ))}
          </InfiniteScroll>
        )}
      </ScreenWrapper>

      <FabWrapper>
        <GoalsResultsFilters />
      </FabWrapper>
    </>
  );
};

export default GoalsResults;
