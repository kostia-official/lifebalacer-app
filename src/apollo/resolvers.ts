import { Resolvers, ApolloClient, InMemoryCache } from '@apollo/client';
import { refetchGetActivitiesQuery } from '../generated/apollo';
import { ActivityResult } from '../common/types';
import { FetchPolicy } from '@apollo/client/core/watchQueryOptions';

const queryActivity = async (
  client: ApolloClient<InMemoryCache>,
  activityId: string,
  fetchPolicy: FetchPolicy = 'cache-first'
) => {
  const { data } = await client.query({ ...refetchGetActivitiesQuery(), fetchPolicy });

  return data?.activities?.find((activity: ActivityResult) => {
    return activity._id === activityId;
  });
};

const activityResolver = async (client: ApolloClient<InMemoryCache>, activityId: string) => {
  const activity = await queryActivity(client, activityId);

  if (activity) return activity;

  return queryActivity(client, activityId, 'network-only');
};

export const resolvers: Resolvers = {
  ActivityBaseStatistic: {
    activity: async ({ _id }, _args, { client }) => {
      return activityResolver(client, _id);
    }
  },
  ActivityAdvancedStatistic: {
    activity: async ({ _id }, _args, { client }) => {
      return activityResolver(client, _id);
    }
  },
  Entry: {
    activity: async ({ activityId }, _args, { client }) => {
      return activityResolver(client, activityId);
    }
  },
  EntryMissing: {
    activity: async ({ activityId }, _args, { client }) => {
      return activityResolver(client, activityId);
    }
  },
  Goal: {
    activity: async ({ activityId }, _args, { client }) => {
      return activityResolver(client, activityId);
    }
  }
};
