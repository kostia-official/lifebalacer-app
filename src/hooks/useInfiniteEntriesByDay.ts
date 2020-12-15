import { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import { useGetEntriesByDayQuery } from '../generated/apollo';
import { UseApolloErrorProps } from './usePushTokenSave';

export const useInfiniteEntriesByDay = ({ onError }: UseApolloErrorProps) => {
  const [isHasMore, setIsHasMore] = useState(true);

  const { data, fetchMore, refetch } = useGetEntriesByDayQuery({
    onError,
    onCompleted: () => {
      const isCanScroll = document.documentElement.scrollHeight > window.innerHeight;

      if (!isCanScroll) setIsHasMore(false);
    }
  });

  const days = data?.entriesByDay;

  const loadMore = useCallback(() => {
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

  return { loadMore, refetch, isHasMore, entriesByDay: data?.entriesByDay };
};
