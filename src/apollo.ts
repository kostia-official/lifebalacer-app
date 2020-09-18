import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloLink } from '@apollo/client/link/core';
import { config } from './config';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import _ from 'lodash';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token
    }
  };
});

const wsLink = new WebSocketLink({
  uri: config.wsUrl,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: config.apiUrl
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

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

export const apolloClient = new ApolloClient({
  defaultOptions: {
    mutate: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          activity(_, { args, toReference }) {
            return toReference({
              __typename: 'Activity',
              _id: args?._id
            });
          }
        }
      }
    }
  }),
  link: ApolloLink.from([retryLink, authLink, splitLink])
});
