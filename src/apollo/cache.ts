import { InMemoryCache } from '@apollo/client';
import { DateTime } from 'luxon';
import { apolloPersistCache } from '../services/ApolloPersistCache';

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
