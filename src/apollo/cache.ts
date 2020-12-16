import { InMemoryCache } from '@apollo/client';
import { ApolloPersistCache } from '../services/ApolloPersistCache';
import { toZeroTimeISO } from '../helpers/date';

export const cache = new InMemoryCache({
  typePolicies: {
    EntriesByDay: {
      keyFields: ['date'],
      fields: {
        entries: { merge: (_, incoming) => incoming },
        missing: { merge: (_, incoming) => incoming }
      }
    },
    Journal: {
      keyFields: ['date'],
      fields: {
        entries: { merge: (_, incoming) => incoming }
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
        entriesByDay: { merge: (_, incoming) => incoming },
        entriesByOneDay(_, { args, toReference }) {
          if (!args?.date) return;

          // Enforce proper datetime format
          args.date = toZeroTimeISO(args.date);

          return toReference({
            __typename: 'EntriesByDay',
            date: args.date
          });
        }
      }
    }
  }
});

export const persistCache = new ApolloPersistCache(cache);

persistCache.load().then();
