import { setContext } from '@apollo/client/link/context';
import { auth0Client } from '../common/auth0';
import { useTimezone } from '../hooks/useTimezone';
import { config } from '../common/config';
import { RetryLink } from '@apollo/client/link/retry';
import { ApolloLink } from '@apollo/client/link/core';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

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
  const token = await auth0Client.getTokenSilently();
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

    // Run priority queries only on warmer lambda
    return ['GetEntriesByDay', 'GetEntriesByOneDay'].includes(definition.name?.value!);
  },
  warmApiLink,
  baseApiLink
);

export const link = ApolloLink.from([retryLink, authLink, splitLink]);
