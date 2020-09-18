import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: Date;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Achievement = {
  __typename?: 'Achievement';
  _id: Scalars['ID'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  points: Scalars['Int'];
  createdAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type Reward = {
  __typename?: 'Reward';
  _id: Scalars['ID'];
  name: Scalars['String'];
  points: Scalars['Int'];
  userId: Scalars['String'];
};

export type Spending = {
  __typename?: 'Spending';
  _id: Scalars['ID'];
  points: Scalars['Int'];
  rewardId: Scalars['ID'];
  reward?: Maybe<Reward>;
  createdAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  todoistUserId: Scalars['String'];
  createdAt: Scalars['Date'];
};

export enum ActivityType {
  Simple = 'Simple',
  Value = 'Value',
  Range = 'Range',
  Todoist = 'Todoist'
}

export enum PointsType {
  Const = 'Const',
  Linear = 'Linear'
}

export enum ActivityCategory {
  Neutral = 'Neutral',
  Positive = 'Positive',
  Negative = 'Negative'
}

export type RangeMeta = {
  __typename?: 'RangeMeta';
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type RangeMetaInput = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type TodoistMeta = {
  __typename?: 'TodoistMeta';
  todoistUserId: Scalars['String'];
};

export type TodoistMetaInput = {
  todoistUserId: Scalars['String'];
};

export type Activity = {
  __typename?: 'Activity';
  _id: Scalars['ID'];
  name: Scalars['String'];
  emoji: Scalars['String'];
  userId: Scalars['String'];
  valueType: ActivityType;
  pointsType: PointsType;
  category: ActivityCategory;
  points: Scalars['Int'];
  rangeMeta?: Maybe<RangeMeta>;
  todoistMeta?: Maybe<TodoistMeta>;
  createdAt: Scalars['Date'];
};

export type Entry = {
  __typename?: 'Entry';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  completedAt: Scalars['Date'];
  activityId: Scalars['ID'];
  activity: Activity;
  points: Scalars['Int'];
  value?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  entry?: Maybe<Entry>;
  entries: Array<Entry>;
  activity?: Maybe<Activity>;
  activities: Array<Activity>;
  achievements: Array<Achievement>;
  rewards: Array<Reward>;
  spendings: Array<Spending>;
  balance: Scalars['Int'];
  profile?: Maybe<Profile>;
};


export type QueryEntryArgs = {
  _id: Scalars['ID'];
};


export type QueryActivityArgs = {
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createActivity: Activity;
  updateActivityById: Activity;
  deleteActivity: Scalars['Boolean'];
  createEntry: Entry;
  updateEntryById: Entry;
  deleteEntry: Scalars['Boolean'];
  createReward: Reward;
  updateRewardById: Reward;
  deleteReward: Scalars['Boolean'];
  createAchievement: Reward;
  updateAchievementById: Reward;
  deleteAchievement: Scalars['Boolean'];
  spendReward: Spending;
  deleteSpending: Scalars['Boolean'];
  authorizeInTodoist: Profile;
};


export type MutationCreateActivityArgs = {
  data: CreateActivityInput;
};


export type MutationUpdateActivityByIdArgs = {
  _id: Scalars['ID'];
  data: UpdateActivityInput;
};


export type MutationDeleteActivityArgs = {
  _id: Scalars['ID'];
};


export type MutationCreateEntryArgs = {
  data: CreateEntryInput;
};


export type MutationUpdateEntryByIdArgs = {
  _id: Scalars['ID'];
  data: UpdateEntryInput;
};


export type MutationDeleteEntryArgs = {
  _id: Scalars['ID'];
};


export type MutationCreateRewardArgs = {
  data: CreateRewardInput;
};


export type MutationUpdateRewardByIdArgs = {
  _id: Scalars['ID'];
  data: UpdateRewardInput;
};


export type MutationDeleteRewardArgs = {
  _id: Scalars['ID'];
};


export type MutationCreateAchievementArgs = {
  data: CreateAchievementInput;
};


export type MutationUpdateAchievementByIdArgs = {
  _id: Scalars['ID'];
  data: UpdateAchievementInput;
};


export type MutationDeleteAchievementArgs = {
  _id: Scalars['ID'];
};


export type MutationSpendRewardArgs = {
  rewardId: Scalars['ID'];
};


export type MutationDeleteSpendingArgs = {
  _id: Scalars['ID'];
};


export type MutationAuthorizeInTodoistArgs = {
  authCode: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  achievementCreated: Achievement;
};

export type CreateActivityInput = {
  name: Scalars['String'];
  emoji: Scalars['String'];
  valueType: ActivityType;
  pointsType: PointsType;
  category: ActivityCategory;
  points: Scalars['Int'];
  rangeMeta?: Maybe<RangeMetaInput>;
  todoistMeta?: Maybe<TodoistMetaInput>;
};

export type UpdateActivityInput = {
  name?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  valueType?: Maybe<ActivityType>;
  pointsType?: Maybe<PointsType>;
  category?: Maybe<ActivityCategory>;
  points?: Maybe<Scalars['Int']>;
  rangeMeta?: Maybe<RangeMetaInput>;
  todoistMeta?: Maybe<TodoistMetaInput>;
};

export type CreateEntryInput = {
  description?: Maybe<Scalars['String']>;
  completedAt: Scalars['Date'];
  activityId: Scalars['ID'];
  value?: Maybe<Scalars['Int']>;
};

export type UpdateEntryInput = {
  description?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['Date']>;
  value?: Maybe<Scalars['Int']>;
};

export type CreateRewardInput = {
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  points: Scalars['Int'];
  userId?: Maybe<Scalars['String']>;
};

export type UpdateRewardInput = {
  name?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateAchievementInput = {
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  points: Scalars['Int'];
  userId?: Maybe<Scalars['String']>;
};

export type UpdateAchievementInput = {
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetActivityQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type GetActivityQuery = (
  { __typename?: 'Query' }
  & { activity?: Maybe<(
    { __typename?: 'Activity' }
    & Pick<Activity, '_id' | 'name' | 'emoji' | 'category' | 'valueType' | 'pointsType' | 'points'>
  )> }
);

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = (
  { __typename?: 'Query' }
  & { activities: Array<(
    { __typename?: 'Activity' }
    & Pick<Activity, '_id' | 'name' | 'emoji' | 'category' | 'valueType' | 'pointsType' | 'points' | 'createdAt'>
  )> }
);

export type GetEntryQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type GetEntryQuery = (
  { __typename?: 'Query' }
  & { entry?: Maybe<(
    { __typename?: 'Entry' }
    & Pick<Entry, '_id' | 'description' | 'points' | 'value' | 'completedAt'>
    & { activity: (
      { __typename?: 'Activity' }
      & Pick<Activity, 'name' | 'emoji' | 'category'>
    ) }
  )> }
);

export type GetEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntriesQuery = (
  { __typename?: 'Query' }
  & { entries: Array<(
    { __typename?: 'Entry' }
    & Pick<Entry, '_id' | 'description' | 'points' | 'value' | 'completedAt'>
    & { activity: (
      { __typename?: 'Activity' }
      & Pick<Activity, 'name' | 'emoji' | 'category'>
    ) }
  )> }
);

export type GetAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAchievementsQuery = (
  { __typename?: 'Query' }
  & { achievements: Array<(
    { __typename?: 'Achievement' }
    & Pick<Achievement, '_id' | 'name' | 'points' | 'priority' | 'createdAt'>
  )> }
);

export type GetRewardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRewardsQuery = (
  { __typename?: 'Query' }
  & { rewards: Array<(
    { __typename?: 'Reward' }
    & Pick<Reward, '_id' | 'name' | 'points'>
  )> }
);

export type GetSpendingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpendingsQuery = (
  { __typename?: 'Query' }
  & { spendings: Array<(
    { __typename?: 'Spending' }
    & Pick<Spending, '_id' | 'points' | 'createdAt'>
    & { reward?: Maybe<(
      { __typename?: 'Reward' }
      & Pick<Reward, '_id' | 'name'>
    )> }
  )> }
);

export type GetBalanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBalanceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'balance'>
);

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { profile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, '_id' | 'todoistUserId' | 'userId'>
  )> }
);

export type CreateActivityMutationVariables = Exact<{
  data: CreateActivityInput;
}>;


export type CreateActivityMutation = (
  { __typename?: 'Mutation' }
  & { createActivity: (
    { __typename?: 'Activity' }
    & Pick<Activity, '_id'>
  ) }
);

export type UpdateActivityMutationVariables = Exact<{
  _id: Scalars['ID'];
  data: UpdateActivityInput;
}>;


export type UpdateActivityMutation = (
  { __typename?: 'Mutation' }
  & { updateActivityById: (
    { __typename?: 'Activity' }
    & Pick<Activity, '_id'>
  ) }
);

export type DeleteActivityMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteActivityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteActivity'>
);

export type CreateEntryMutationVariables = Exact<{
  data: CreateEntryInput;
}>;


export type CreateEntryMutation = (
  { __typename?: 'Mutation' }
  & { createEntry: (
    { __typename?: 'Entry' }
    & Pick<Entry, '_id'>
  ) }
);

export type UpdateEntryMutationVariables = Exact<{
  _id: Scalars['ID'];
  data: UpdateEntryInput;
}>;


export type UpdateEntryMutation = (
  { __typename?: 'Mutation' }
  & { updateEntryById: (
    { __typename?: 'Entry' }
    & Pick<Entry, '_id'>
  ) }
);

export type DeleteEntryMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteEntryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEntry'>
);

export type CreateRewardMutationVariables = Exact<{
  data: CreateRewardInput;
}>;


export type CreateRewardMutation = (
  { __typename?: 'Mutation' }
  & { createReward: (
    { __typename?: 'Reward' }
    & Pick<Reward, '_id' | 'name' | 'points'>
  ) }
);

export type UpdateRewardByIdMutationVariables = Exact<{
  _id: Scalars['ID'];
  data: UpdateRewardInput;
}>;


export type UpdateRewardByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateRewardById: (
    { __typename?: 'Reward' }
    & Pick<Reward, '_id' | 'name' | 'points'>
  ) }
);

export type DeleteRewardMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteRewardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteReward'>
);

export type SpendRewardMutationVariables = Exact<{
  rewardId: Scalars['ID'];
}>;


export type SpendRewardMutation = (
  { __typename?: 'Mutation' }
  & { spendReward: (
    { __typename?: 'Spending' }
    & Pick<Spending, '_id' | 'points' | 'createdAt'>
    & { reward?: Maybe<(
      { __typename?: 'Reward' }
      & Pick<Reward, '_id' | 'name'>
    )> }
  ) }
);

export type DeleteSpendingMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteSpendingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSpending'>
);

export type DeleteAchievementMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteAchievementMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAchievement'>
);

export type ConnectTodoistMutationVariables = Exact<{
  authCode: Scalars['String'];
}>;


export type ConnectTodoistMutation = (
  { __typename?: 'Mutation' }
  & { authorizeInTodoist: (
    { __typename?: 'Profile' }
    & Pick<Profile, '_id' | 'todoistUserId'>
  ) }
);

export type OnAchievementCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnAchievementCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { achievementCreated: (
    { __typename?: 'Achievement' }
    & Pick<Achievement, '_id' | 'createdAt' | 'name' | 'points' | 'priority'>
  ) }
);


export const GetActivityDocument = gql`
    query GetActivity($_id: ID!) {
  activity(_id: $_id) {
    _id
    name
    emoji
    category
    valueType
    pointsType
    points
  }
}
    `;

/**
 * __useGetActivityQuery__
 *
 * To run a query within a React component, call `useGetActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetActivityQuery(baseOptions?: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
        return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, baseOptions);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
          return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, baseOptions);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GetActivityQuery, GetActivityQueryVariables>;
export function refetchGetActivityQuery(variables?: GetActivityQueryVariables) {
      return { query: GetActivityDocument, variables: variables }
    }
export const GetActivitiesDocument = gql`
    query GetActivities {
  activities {
    _id
    name
    emoji
    category
    valueType
    pointsType
    points
    createdAt
  }
}
    `;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
        return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, baseOptions);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, baseOptions);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GetActivitiesQuery, GetActivitiesQueryVariables>;
export function refetchGetActivitiesQuery(variables?: GetActivitiesQueryVariables) {
      return { query: GetActivitiesDocument, variables: variables }
    }
export const GetEntryDocument = gql`
    query GetEntry($_id: ID!) {
  entry(_id: $_id) {
    _id
    description
    points
    value
    completedAt
    activity {
      name
      emoji
      category
    }
  }
}
    `;

/**
 * __useGetEntryQuery__
 *
 * To run a query within a React component, call `useGetEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntryQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetEntryQuery(baseOptions?: Apollo.QueryHookOptions<GetEntryQuery, GetEntryQueryVariables>) {
        return Apollo.useQuery<GetEntryQuery, GetEntryQueryVariables>(GetEntryDocument, baseOptions);
      }
export function useGetEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEntryQuery, GetEntryQueryVariables>) {
          return Apollo.useLazyQuery<GetEntryQuery, GetEntryQueryVariables>(GetEntryDocument, baseOptions);
        }
export type GetEntryQueryHookResult = ReturnType<typeof useGetEntryQuery>;
export type GetEntryLazyQueryHookResult = ReturnType<typeof useGetEntryLazyQuery>;
export type GetEntryQueryResult = Apollo.QueryResult<GetEntryQuery, GetEntryQueryVariables>;
export function refetchGetEntryQuery(variables?: GetEntryQueryVariables) {
      return { query: GetEntryDocument, variables: variables }
    }
export const GetEntriesDocument = gql`
    query GetEntries {
  entries {
    _id
    description
    points
    value
    completedAt
    activity {
      name
      emoji
      category
    }
  }
}
    `;

/**
 * __useGetEntriesQuery__
 *
 * To run a query within a React component, call `useGetEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
        return Apollo.useQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, baseOptions);
      }
export function useGetEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
          return Apollo.useLazyQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, baseOptions);
        }
export type GetEntriesQueryHookResult = ReturnType<typeof useGetEntriesQuery>;
export type GetEntriesLazyQueryHookResult = ReturnType<typeof useGetEntriesLazyQuery>;
export type GetEntriesQueryResult = Apollo.QueryResult<GetEntriesQuery, GetEntriesQueryVariables>;
export function refetchGetEntriesQuery(variables?: GetEntriesQueryVariables) {
      return { query: GetEntriesDocument, variables: variables }
    }
export const GetAchievementsDocument = gql`
    query GetAchievements {
  achievements {
    _id
    name
    points
    priority
    createdAt
  }
}
    `;

/**
 * __useGetAchievementsQuery__
 *
 * To run a query within a React component, call `useGetAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAchievementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAchievementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAchievementsQuery, GetAchievementsQueryVariables>) {
        return Apollo.useQuery<GetAchievementsQuery, GetAchievementsQueryVariables>(GetAchievementsDocument, baseOptions);
      }
export function useGetAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAchievementsQuery, GetAchievementsQueryVariables>) {
          return Apollo.useLazyQuery<GetAchievementsQuery, GetAchievementsQueryVariables>(GetAchievementsDocument, baseOptions);
        }
export type GetAchievementsQueryHookResult = ReturnType<typeof useGetAchievementsQuery>;
export type GetAchievementsLazyQueryHookResult = ReturnType<typeof useGetAchievementsLazyQuery>;
export type GetAchievementsQueryResult = Apollo.QueryResult<GetAchievementsQuery, GetAchievementsQueryVariables>;
export function refetchGetAchievementsQuery(variables?: GetAchievementsQueryVariables) {
      return { query: GetAchievementsDocument, variables: variables }
    }
export const GetRewardsDocument = gql`
    query GetRewards {
  rewards {
    _id
    name
    points
  }
}
    `;

/**
 * __useGetRewardsQuery__
 *
 * To run a query within a React component, call `useGetRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRewardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRewardsQuery(baseOptions?: Apollo.QueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
        return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, baseOptions);
      }
export function useGetRewardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
          return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, baseOptions);
        }
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>;
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>;
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>;
export function refetchGetRewardsQuery(variables?: GetRewardsQueryVariables) {
      return { query: GetRewardsDocument, variables: variables }
    }
export const GetSpendingsDocument = gql`
    query GetSpendings {
  spendings {
    _id
    points
    reward {
      _id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetSpendingsQuery__
 *
 * To run a query within a React component, call `useGetSpendingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpendingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpendingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpendingsQuery(baseOptions?: Apollo.QueryHookOptions<GetSpendingsQuery, GetSpendingsQueryVariables>) {
        return Apollo.useQuery<GetSpendingsQuery, GetSpendingsQueryVariables>(GetSpendingsDocument, baseOptions);
      }
export function useGetSpendingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpendingsQuery, GetSpendingsQueryVariables>) {
          return Apollo.useLazyQuery<GetSpendingsQuery, GetSpendingsQueryVariables>(GetSpendingsDocument, baseOptions);
        }
export type GetSpendingsQueryHookResult = ReturnType<typeof useGetSpendingsQuery>;
export type GetSpendingsLazyQueryHookResult = ReturnType<typeof useGetSpendingsLazyQuery>;
export type GetSpendingsQueryResult = Apollo.QueryResult<GetSpendingsQuery, GetSpendingsQueryVariables>;
export function refetchGetSpendingsQuery(variables?: GetSpendingsQueryVariables) {
      return { query: GetSpendingsDocument, variables: variables }
    }
export const GetBalanceDocument = gql`
    query GetBalance {
  balance
}
    `;

/**
 * __useGetBalanceQuery__
 *
 * To run a query within a React component, call `useGetBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBalanceQuery(baseOptions?: Apollo.QueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
        return Apollo.useQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, baseOptions);
      }
export function useGetBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
          return Apollo.useLazyQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, baseOptions);
        }
export type GetBalanceQueryHookResult = ReturnType<typeof useGetBalanceQuery>;
export type GetBalanceLazyQueryHookResult = ReturnType<typeof useGetBalanceLazyQuery>;
export type GetBalanceQueryResult = Apollo.QueryResult<GetBalanceQuery, GetBalanceQueryVariables>;
export function refetchGetBalanceQuery(variables?: GetBalanceQueryVariables) {
      return { query: GetBalanceDocument, variables: variables }
    }
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    _id
    todoistUserId
    userId
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export function refetchGetProfileQuery(variables?: GetProfileQueryVariables) {
      return { query: GetProfileDocument, variables: variables }
    }
export const CreateActivityDocument = gql`
    mutation CreateActivity($data: CreateActivityInput!) {
  createActivity(data: $data) {
    _id
  }
}
    `;
export type CreateActivityMutationFn = Apollo.MutationFunction<CreateActivityMutation, CreateActivityMutationVariables>;

/**
 * __useCreateActivityMutation__
 *
 * To run a mutation, you first call `useCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityMutation, { data, loading, error }] = useCreateActivityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>) {
        return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(CreateActivityDocument, baseOptions);
      }
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<CreateActivityMutation, CreateActivityMutationVariables>;
export const UpdateActivityDocument = gql`
    mutation UpdateActivity($_id: ID!, $data: UpdateActivityInput!) {
  updateActivityById(_id: $_id, data: $data) {
    _id
  }
}
    `;
export type UpdateActivityMutationFn = Apollo.MutationFunction<UpdateActivityMutation, UpdateActivityMutationVariables>;

/**
 * __useUpdateActivityMutation__
 *
 * To run a mutation, you first call `useUpdateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityMutation, { data, loading, error }] = useUpdateActivityMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityMutation, UpdateActivityMutationVariables>) {
        return Apollo.useMutation<UpdateActivityMutation, UpdateActivityMutationVariables>(UpdateActivityDocument, baseOptions);
      }
export type UpdateActivityMutationHookResult = ReturnType<typeof useUpdateActivityMutation>;
export type UpdateActivityMutationResult = Apollo.MutationResult<UpdateActivityMutation>;
export type UpdateActivityMutationOptions = Apollo.BaseMutationOptions<UpdateActivityMutation, UpdateActivityMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($_id: ID!) {
  deleteActivity(_id: $_id)
}
    `;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, baseOptions);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const CreateEntryDocument = gql`
    mutation CreateEntry($data: CreateEntryInput!) {
  createEntry(data: $data) {
    _id
  }
}
    `;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, baseOptions);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const UpdateEntryDocument = gql`
    mutation UpdateEntry($_id: ID!, $data: UpdateEntryInput!) {
  updateEntryById(_id: $_id, data: $data) {
    _id
  }
}
    `;
export type UpdateEntryMutationFn = Apollo.MutationFunction<UpdateEntryMutation, UpdateEntryMutationVariables>;

/**
 * __useUpdateEntryMutation__
 *
 * To run a mutation, you first call `useUpdateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntryMutation, { data, loading, error }] = useUpdateEntryMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntryMutation, UpdateEntryMutationVariables>) {
        return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(UpdateEntryDocument, baseOptions);
      }
export type UpdateEntryMutationHookResult = ReturnType<typeof useUpdateEntryMutation>;
export type UpdateEntryMutationResult = Apollo.MutationResult<UpdateEntryMutation>;
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<UpdateEntryMutation, UpdateEntryMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($_id: ID!) {
  deleteEntry(_id: $_id)
}
    `;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, baseOptions);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const CreateRewardDocument = gql`
    mutation CreateReward($data: CreateRewardInput!) {
  createReward(data: $data) {
    _id
    name
    points
  }
}
    `;
export type CreateRewardMutationFn = Apollo.MutationFunction<CreateRewardMutation, CreateRewardMutationVariables>;

/**
 * __useCreateRewardMutation__
 *
 * To run a mutation, you first call `useCreateRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRewardMutation, { data, loading, error }] = useCreateRewardMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRewardMutation(baseOptions?: Apollo.MutationHookOptions<CreateRewardMutation, CreateRewardMutationVariables>) {
        return Apollo.useMutation<CreateRewardMutation, CreateRewardMutationVariables>(CreateRewardDocument, baseOptions);
      }
export type CreateRewardMutationHookResult = ReturnType<typeof useCreateRewardMutation>;
export type CreateRewardMutationResult = Apollo.MutationResult<CreateRewardMutation>;
export type CreateRewardMutationOptions = Apollo.BaseMutationOptions<CreateRewardMutation, CreateRewardMutationVariables>;
export const UpdateRewardByIdDocument = gql`
    mutation UpdateRewardById($_id: ID!, $data: UpdateRewardInput!) {
  updateRewardById(_id: $_id, data: $data) {
    _id
    name
    points
  }
}
    `;
export type UpdateRewardByIdMutationFn = Apollo.MutationFunction<UpdateRewardByIdMutation, UpdateRewardByIdMutationVariables>;

/**
 * __useUpdateRewardByIdMutation__
 *
 * To run a mutation, you first call `useUpdateRewardByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRewardByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRewardByIdMutation, { data, loading, error }] = useUpdateRewardByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRewardByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRewardByIdMutation, UpdateRewardByIdMutationVariables>) {
        return Apollo.useMutation<UpdateRewardByIdMutation, UpdateRewardByIdMutationVariables>(UpdateRewardByIdDocument, baseOptions);
      }
export type UpdateRewardByIdMutationHookResult = ReturnType<typeof useUpdateRewardByIdMutation>;
export type UpdateRewardByIdMutationResult = Apollo.MutationResult<UpdateRewardByIdMutation>;
export type UpdateRewardByIdMutationOptions = Apollo.BaseMutationOptions<UpdateRewardByIdMutation, UpdateRewardByIdMutationVariables>;
export const DeleteRewardDocument = gql`
    mutation DeleteReward($_id: ID!) {
  deleteReward(_id: $_id)
}
    `;
export type DeleteRewardMutationFn = Apollo.MutationFunction<DeleteRewardMutation, DeleteRewardMutationVariables>;

/**
 * __useDeleteRewardMutation__
 *
 * To run a mutation, you first call `useDeleteRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRewardMutation, { data, loading, error }] = useDeleteRewardMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteRewardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRewardMutation, DeleteRewardMutationVariables>) {
        return Apollo.useMutation<DeleteRewardMutation, DeleteRewardMutationVariables>(DeleteRewardDocument, baseOptions);
      }
export type DeleteRewardMutationHookResult = ReturnType<typeof useDeleteRewardMutation>;
export type DeleteRewardMutationResult = Apollo.MutationResult<DeleteRewardMutation>;
export type DeleteRewardMutationOptions = Apollo.BaseMutationOptions<DeleteRewardMutation, DeleteRewardMutationVariables>;
export const SpendRewardDocument = gql`
    mutation SpendReward($rewardId: ID!) {
  spendReward(rewardId: $rewardId) {
    _id
    points
    reward {
      _id
      name
    }
    createdAt
  }
}
    `;
export type SpendRewardMutationFn = Apollo.MutationFunction<SpendRewardMutation, SpendRewardMutationVariables>;

/**
 * __useSpendRewardMutation__
 *
 * To run a mutation, you first call `useSpendRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpendRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spendRewardMutation, { data, loading, error }] = useSpendRewardMutation({
 *   variables: {
 *      rewardId: // value for 'rewardId'
 *   },
 * });
 */
export function useSpendRewardMutation(baseOptions?: Apollo.MutationHookOptions<SpendRewardMutation, SpendRewardMutationVariables>) {
        return Apollo.useMutation<SpendRewardMutation, SpendRewardMutationVariables>(SpendRewardDocument, baseOptions);
      }
export type SpendRewardMutationHookResult = ReturnType<typeof useSpendRewardMutation>;
export type SpendRewardMutationResult = Apollo.MutationResult<SpendRewardMutation>;
export type SpendRewardMutationOptions = Apollo.BaseMutationOptions<SpendRewardMutation, SpendRewardMutationVariables>;
export const DeleteSpendingDocument = gql`
    mutation DeleteSpending($_id: ID!) {
  deleteSpending(_id: $_id)
}
    `;
export type DeleteSpendingMutationFn = Apollo.MutationFunction<DeleteSpendingMutation, DeleteSpendingMutationVariables>;

/**
 * __useDeleteSpendingMutation__
 *
 * To run a mutation, you first call `useDeleteSpendingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpendingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSpendingMutation, { data, loading, error }] = useDeleteSpendingMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteSpendingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSpendingMutation, DeleteSpendingMutationVariables>) {
        return Apollo.useMutation<DeleteSpendingMutation, DeleteSpendingMutationVariables>(DeleteSpendingDocument, baseOptions);
      }
export type DeleteSpendingMutationHookResult = ReturnType<typeof useDeleteSpendingMutation>;
export type DeleteSpendingMutationResult = Apollo.MutationResult<DeleteSpendingMutation>;
export type DeleteSpendingMutationOptions = Apollo.BaseMutationOptions<DeleteSpendingMutation, DeleteSpendingMutationVariables>;
export const DeleteAchievementDocument = gql`
    mutation DeleteAchievement($_id: ID!) {
  deleteAchievement(_id: $_id)
}
    `;
export type DeleteAchievementMutationFn = Apollo.MutationFunction<DeleteAchievementMutation, DeleteAchievementMutationVariables>;

/**
 * __useDeleteAchievementMutation__
 *
 * To run a mutation, you first call `useDeleteAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAchievementMutation, { data, loading, error }] = useDeleteAchievementMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteAchievementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAchievementMutation, DeleteAchievementMutationVariables>) {
        return Apollo.useMutation<DeleteAchievementMutation, DeleteAchievementMutationVariables>(DeleteAchievementDocument, baseOptions);
      }
export type DeleteAchievementMutationHookResult = ReturnType<typeof useDeleteAchievementMutation>;
export type DeleteAchievementMutationResult = Apollo.MutationResult<DeleteAchievementMutation>;
export type DeleteAchievementMutationOptions = Apollo.BaseMutationOptions<DeleteAchievementMutation, DeleteAchievementMutationVariables>;
export const ConnectTodoistDocument = gql`
    mutation ConnectTodoist($authCode: String!) {
  authorizeInTodoist(authCode: $authCode) {
    _id
    todoistUserId
  }
}
    `;
export type ConnectTodoistMutationFn = Apollo.MutationFunction<ConnectTodoistMutation, ConnectTodoistMutationVariables>;

/**
 * __useConnectTodoistMutation__
 *
 * To run a mutation, you first call `useConnectTodoistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectTodoistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectTodoistMutation, { data, loading, error }] = useConnectTodoistMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useConnectTodoistMutation(baseOptions?: Apollo.MutationHookOptions<ConnectTodoistMutation, ConnectTodoistMutationVariables>) {
        return Apollo.useMutation<ConnectTodoistMutation, ConnectTodoistMutationVariables>(ConnectTodoistDocument, baseOptions);
      }
export type ConnectTodoistMutationHookResult = ReturnType<typeof useConnectTodoistMutation>;
export type ConnectTodoistMutationResult = Apollo.MutationResult<ConnectTodoistMutation>;
export type ConnectTodoistMutationOptions = Apollo.BaseMutationOptions<ConnectTodoistMutation, ConnectTodoistMutationVariables>;
export const OnAchievementCreatedDocument = gql`
    subscription OnAchievementCreated {
  achievementCreated {
    _id
    createdAt
    name
    points
    priority
  }
}
    `;

/**
 * __useOnAchievementCreatedSubscription__
 *
 * To run a query within a React component, call `useOnAchievementCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnAchievementCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnAchievementCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnAchievementCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnAchievementCreatedSubscription, OnAchievementCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<OnAchievementCreatedSubscription, OnAchievementCreatedSubscriptionVariables>(OnAchievementCreatedDocument, baseOptions);
      }
export type OnAchievementCreatedSubscriptionHookResult = ReturnType<typeof useOnAchievementCreatedSubscription>;
export type OnAchievementCreatedSubscriptionResult = Apollo.SubscriptionResult<OnAchievementCreatedSubscription>;