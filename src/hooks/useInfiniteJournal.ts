import { useCallback, useState } from 'react';
import _ from 'lodash';
import { useGetJournalQuery, GetJournalQueryVariables, GetJournalQuery } from '../generated/apollo';
import * as Apollo from '@apollo/client';

export const useInfiniteJournal = ({
  onError,
  variables
}: Apollo.QueryHookOptions<GetJournalQuery, GetJournalQueryVariables>) => {
  const [isHasMore, setIsHasMore] = useState(true);

  const { data, fetchMore, refetch, loading } = useGetJournalQuery({ onError, variables });

  const journal = data?.journal;

  const loadMore = useCallback(() => {
    console.log('loadMore');
    const lastDate: string = _.chain(journal)
      .last()
      .get('entries')
      .orderBy(['completedAt'], ['desc'])
      .last()
      .get('completedAt')
      .value();

    console.log('lastDate', lastDate);

    if (!lastDate) return;

    fetchMore({
      variables: {
        dateAfter: lastDate
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log('fetchMoreResult', fetchMoreResult);
        if (!fetchMoreResult || _.isEmpty(fetchMoreResult?.journal)) {
          setIsHasMore(false);
          return prev;
        }

        return Object.assign({}, prev, {
          entriesByDay: [...prev.journal, ...fetchMoreResult.journal]
        });
      }
    }).then();
  }, [journal, fetchMore]);

  return { loadMore, refetch, isHasMore, journal, loading };
};
