import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloLink } from '@apollo/client/link/core';
import { config } from './common/config';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import _ from 'lodash';
import { useTimezone } from './hooks/useTimezone';
import { apolloPersistCache } from './services/ApolloPersistCache';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
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
    max: 6,
    retryIf: (error, _operation) => {
      return _.get(error, 'result.errors[0].extensions.code') === 'UNAUTHENTICATED';
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
        entriesByOneDay(existing, { args, readField }) {
          if (existing) return existing;

          const entriesByDay = readField('entriesByDay');

          if (_.isArray(entriesByDay)) {
            return _.find(entriesByDay, (day) => {
              return day.date === args?.date;
            });
          }

          return undefined;
        }
      }
    }
  }
});

apolloPersistCache.load().then();

export const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([retryLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});
