import { InMemoryCache, Reference } from '@apollo/client';
import { ApolloPersistCache } from '../services/ApolloPersistCache';
import { toZeroTimeISO } from '../helpers/date';
import { ActivityType } from '../generated/apollo';

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
        todoistActivity: {
          read(_, { readField }) {
            const activities = readField<Reference[]>('activities');

            return activities?.find((activityRef: Reference) => {
              const valueType = readField('valueType', activityRef);
              return valueType === ActivityType.Todoist;
            });
          }
        },
        activity(_, { args, toReference }) {
          return toReference({
            __typename: 'Activity',
            _id: args?._id
          });
        },
        entriesByDay: {
          merge: (_, incoming) => incoming
        },
        entriesByOneDay: {
          merge: (_, incoming) => incoming,
          read: (existing, { args, toReference, ...other }) => {
            if (!existing) return existing;
            if (!args?.date) return;

            // Enforce proper datetime format
            args.date = toZeroTimeISO(args.date);

            return toReference({
              __typename: 'EntriesByDay',
              date: args.date
            });
          }
        },
        journal: { merge: (_, incoming) => incoming }
      }
    }
  }
});

export const persistCache = new ApolloPersistCache(cache);

persistCache.load().then();
