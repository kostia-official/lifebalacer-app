import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloLink } from '@apollo/client/link/core';
import { config } from './common/config';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { useTimezone } from './hooks/useTimezone';
import { apolloPersistCache } from './services/ApolloPersistCache';
import { DateTime } from 'luxon';
import { authService } from './services/auth0';

const authLink = setContext(async (_, { headers }) => {
  const token = await authService.getToken();
  const timezone = useTimezone();

  return {
    headers: {
      ...headers,
      Authorization: token,
      timezone
    }
  };
});

const httpLink = new HttpLink({
  uri: config.apiUrl
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 3,
    retryIf: (error, _operation) => {
      return error.statusCode > 500;
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          authService.isAuthError = true;

          return forward(operation);
      }
    }
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    EntriesByDay: {
      keyFields: ['date'],
      fields: {
        entries: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    },
    Query: {
      fields: {
        activity(_, { args, toReference }) {
          return toReference({
            __typename: 'Activity',
            _id: args?._id
          });
        },
        entriesByDay: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        entriesByOneDay(_, { args, toReference }) {
          if (!args?.date) return;

          // Enforce proper datetime format
          args.date = DateTime.fromISO(args.date).toISODate() + 'T00:00:00.000Z';

          return toReference({
            __typename: 'EntriesByDay',
            date: args.date
          });
        }
      }
    }
  }
});

apolloPersistCache.load().then();

export const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, retryLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});
