import { setContext } from '@apollo/client/link/context';
import { authService } from '../services/auth0';
import { useTimezone } from '../hooks/useTimezone';
import { config } from '../common/config';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client/link/core';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          authService.invalidateToken();

          return forward(operation);
      }
    }
  }
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
      return error.statusCode >= 500;
    }
  }
});

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

const baseApiLink = new HttpLink({
  uri: config.apiUrl
});

const warmApiLink = new HttpLink({
  uri: config.warmApiUrl
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    // Run GetEntriesByDay query only on warmer lambda
    return definition.name?.value === 'GetEntriesByDay';
  },
  warmApiLink,
  baseApiLink
);

export const link = ApolloLink.from([errorLink, retryLink, authLink, splitLink]);
