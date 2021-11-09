import { Resolvers, ApolloClient, InMemoryCache } from '@apollo/client';
import { refetchGetActivitiesQuery, Entry } from '../generated/apollo';
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
    },
    isWithDescription: ({ description, activity }: Entry) => {
      return description && !activity?.isWidget;
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
