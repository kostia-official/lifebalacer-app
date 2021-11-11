import { Resolvers, ApolloClient, InMemoryCache } from '@apollo/client';
import { refetchGetActivitiesQuery } from '../generated/apollo';
import { ActivityResult } from '../common/types';

const activityResolver = async (client: ApolloClient<InMemoryCache>, activityId: string) => {
  const { data } = await client.query(refetchGetActivitiesQuery());

  return data?.activities?.find((activity: ActivityResult) => {
    return activity._id === activityId;
  });
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
