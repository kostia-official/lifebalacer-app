import { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { getIsCanScroll } from '../helpers/scroll';
import { OperationVariables } from '@apollo/client/core';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { QueryHookOptions } from '@apollo/client/react/types/types';

export interface Options<TData, TVariables> extends QueryHookOptions<TData, TVariables> {
  field: string;
  fetchMoreVariables: (data: TData) => TVariables | null;
}

export const useInfiniteQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  { field, fetchMoreVariables, ...apolloOptions }: Options<TData, TVariables>
) => {
  const [isHasMore, setIsHasMore] = useState(true);

  useEffect(() => {
    setIsHasMore(getIsCanScroll());
  }, []);

  const queryResult = useQuery(query, {
    ...apolloOptions,
    onCompleted: () => {
      setIsHasMore(getIsCanScroll());
    }
  });

  const { data, fetchMore } = queryResult;

  const loadMore = useCallback(() => {
    const variables = fetchMoreVariables(data!);

    if (!variables) {
      setIsHasMore(false);
      return;
    }

    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        const fetchedItems = _.get(fetchMoreResult, `[${field}]`);
        const prevItems = _.get(prev, `[${field}]`);

        if (_.isEmpty(fetchedItems)) {
          setIsHasMore(false);
          return prev;
        }

        return Object.assign({}, prev, {
          [field]: [...prevItems, ...fetchedItems]
        });
      }
    }).then();
  }, [fetchMoreVariables, data, fetchMore, field]);

  return { ...queryResult, isHasMore, loadMore };
};
