import { ApolloClient } from '@apollo/client';
import { link } from './link';
import { cache } from './cache';
import { config } from '../common/config';
import { resolvers } from './resolvers';

export const apolloClient = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    }
  },
  resolvers,
  connectToDevTools: config.isDev
});
