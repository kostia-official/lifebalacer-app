import { ApolloClient } from '@apollo/client';
import { link } from './link';
import { cache } from './cache';

export const apolloClient = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    }
  }
});
