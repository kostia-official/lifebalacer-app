import { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { getIsCanScroll } from '../helpers/scroll';
import { OperationVariables } from '@apollo/client/core';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { QueryHookOptions } from '@apollo/client/react/types/types';

export const useInfiniteQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  field: string,
  options?: QueryHookOptions<TData, TVariables>
) => {
  const [isHasMore, setIsHasMore] = useState(true);

  useEffect(() => {
    setIsHasMore(getIsCanScroll());
  }, []);

  const queryResult = useQuery(query, {
    ...options,
    onCompleted: () => {
      if (!getIsCanScroll()) setIsHasMore(false);
    }
  });

  const { data, fetchMore } = queryResult;

  const items = _.get(data, `[${field}]`);

  const loadMore = useCallback(() => {
    const lastDate: string = _.chain(items)
      .last()
      // @ts-ignore
      .get('entries')
      .orderBy(['completedAt'], ['desc'])
      .last()
      .get('completedAt')
      .value();

    if (!lastDate) {
      setIsHasMore(false);
      return;
    }

    fetchMore({
      variables: {
        dateAfter: lastDate
      },
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
  }, [items, fetchMore, field]);

  return { ...queryResult, isHasMore, loadMore };
};
