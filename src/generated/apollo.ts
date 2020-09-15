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

export type Query = {
  __typename?: 'Query';
  achievements: Array<Achievement>;
  rewards: Array<Reward>;
  spendings: Array<Spending>;
  balance: Scalars['Int'];
  profile?: Maybe<Profile>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createReward: Reward;
  updateRewardById: Reward;
  deleteReward: Scalars['Boolean'];
  createAchievement: Reward;
  updateAchievementById: Reward;
  deleteAchievement: Scalars['Boolean'];
  spendReward: Spending;
  deleteSpending: Scalars['Boolean'];
  connectTodoist: Profile;
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


export type MutationConnectTodoistArgs = {
  authCode: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  achievementCreated: Achievement;
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
  & { connectTodoist: (
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
  connectTodoist(authCode: $authCode) {
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