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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** Date custom scalar type */
  Date: string;
};

export type Query = {
  __typename?: 'Query';
  pushToken?: Maybe<PushToken>;
  reminder?: Maybe<Reminder>;
  entry?: Maybe<Entry>;
  entries: Array<Entry>;
  entriesByOneDay?: Maybe<EntriesByDay>;
  entriesByDay: Array<EntriesByDay>;
  daysStatistic: DaysStatistic;
  activity?: Maybe<Activity>;
  activities: Array<Activity>;
  balance: Scalars['Int'];
};

export type QueryEntryArgs = {
  _id: Scalars['ID'];
};

export type QueryEntriesByOneDayArgs = {
  date: Scalars['Date'];
  activityId?: Maybe<Scalars['ID']>;
};

export type QueryEntriesByDayArgs = {
  activityId?: Maybe<Scalars['ID']>;
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
};

export type QueryActivityArgs = {
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertPushToken: PushToken;
  upsertReminder: Reminder;
  createActivity: Activity;
  updateActivityById: Activity;
  archiveActivity: Scalars['Boolean'];
  restoreActivity: Scalars['Boolean'];
  createEntry: Entry;
  updateEntryById: Entry;
  deleteEntry: Scalars['Boolean'];
  connectTodoist: Activity;
};

export type MutationUpsertPushTokenArgs = {
  data: PushTokenUpsertInput;
};

export type MutationUpsertReminderArgs = {
  data: ReminderInput;
};

export type MutationCreateActivityArgs = {
  data: CreateActivityInput;
};

export type MutationUpdateActivityByIdArgs = {
  _id: Scalars['ID'];
  data: UpdateActivityInput;
};

export type MutationArchiveActivityArgs = {
  _id: Scalars['ID'];
};

export type MutationRestoreActivityArgs = {
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

export type MutationConnectTodoistArgs = {
  authCode: Scalars['String'];
};

export type PushToken = {
  __typename?: 'PushToken';
  _id: Scalars['ID'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type PushTokenUpsertInput = {
  token: Scalars['String'];
};

export type Reminder = {
  __typename?: 'Reminder';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  isRepeating: Scalars['Boolean'];
  remindAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type ReminderInput = {
  _id?: Maybe<Scalars['ID']>;
  isRepeating?: Maybe<Scalars['Boolean']>;
  remindAt: Scalars['DateTime'];
};

export type Activity = {
  __typename?: 'Activity';
  _id: Scalars['ID'];
  name: Scalars['String'];
  emoji: Scalars['String'];
  userId: Scalars['String'];
  valueLabel?: Maybe<Scalars['String']>;
  valueType: ActivityType;
  pointsType: PointsType;
  category: ActivityCategory;
  points: Scalars['Int'];
  rangeMeta?: Maybe<RangeMeta>;
  todoistMeta?: Maybe<TodoistMeta>;
  createdAt: Scalars['Date'];
  isArchived: Scalars['Boolean'];
  isWithDescription: Scalars['Boolean'];
  isWidget: Scalars['Boolean'];
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

export type EntriesByDay = {
  __typename?: 'EntriesByDay';
  date: Scalars['Date'];
  points: Scalars['Int'];
  entries: Array<Entry>;
};

export type DaysStatistic = {
  __typename?: 'DaysStatistic';
  total: Scalars['Int'];
  missing: Scalars['Int'];
  streak: Scalars['Int'];
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

export type CreateActivityInput = {
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  emoji: Scalars['String'];
  valueLabel?: Maybe<Scalars['String']>;
  valueType: ActivityType;
  pointsType: PointsType;
  category: ActivityCategory;
  points: Scalars['Int'];
  rangeMeta?: Maybe<RangeMetaInput>;
  todoistMeta?: Maybe<TodoistMetaInput>;
  isWithDescription?: Maybe<Scalars['Boolean']>;
  isWidget?: Maybe<Scalars['Boolean']>;
};

export type UpdateActivityInput = {
  name?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  valueLabel?: Maybe<Scalars['String']>;
  valueType?: Maybe<ActivityType>;
  pointsType?: Maybe<PointsType>;
  category?: Maybe<ActivityCategory>;
  points?: Maybe<Scalars['Int']>;
  rangeMeta?: Maybe<RangeMetaInput>;
  todoistMeta?: Maybe<TodoistMetaInput>;
  isWithDescription?: Maybe<Scalars['Boolean']>;
  isWidget?: Maybe<Scalars['Boolean']>;
};

export type CreateEntryInput = {
  _id?: Maybe<Scalars['ID']>;
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

export type ActivityResultFragment = { __typename?: 'Activity' } & Pick<
  Activity,
  | '_id'
  | 'name'
  | 'emoji'
  | 'category'
  | 'valueLabel'
  | 'valueType'
  | 'pointsType'
  | 'points'
  | 'isArchived'
  | 'isWithDescription'
  | 'isWidget'
> & { rangeMeta?: Maybe<{ __typename?: 'RangeMeta' } & Pick<RangeMeta, 'from' | 'to'>> };

export type GetActivityQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type GetActivityQuery = { __typename?: 'Query' } & {
  activity?: Maybe<{ __typename?: 'Activity' } & ActivityResultFragment>;
};

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetActivitiesQuery = { __typename?: 'Query' } & {
  activities: Array<{ __typename?: 'Activity' } & ActivityResultFragment>;
};

export type EntriesByDayResultFragment = { __typename?: 'EntriesByDay' } & Pick<
  EntriesByDay,
  'date' | 'points'
> & {
    entries: Array<
      { __typename?: 'Entry' } & Pick<
        Entry,
        '_id' | 'description' | 'value' | 'completedAt' | 'activityId'
      >
    >;
  };

export type GetEntriesByDayQueryVariables = Exact<{
  dateAfter?: Maybe<Scalars['Date']>;
}>;

export type GetEntriesByDayQuery = { __typename?: 'Query' } & {
  entriesByDay: Array<{ __typename?: 'EntriesByDay' } & EntriesByDayResultFragment>;
};

export type GetCalendarDaysQueryVariables = Exact<{
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
}>;

export type GetCalendarDaysQuery = { __typename?: 'Query' } & {
  entriesByDay: Array<
    { __typename?: 'EntriesByDay' } & Pick<EntriesByDay, 'date' | 'points'> & {
        entries: Array<{ __typename?: 'Entry' } & Pick<Entry, '_id' | 'value' | 'activityId'>>;
      }
  >;
};

export type GetEntriesByOneDayQueryVariables = Exact<{
  date: Scalars['Date'];
}>;

export type GetEntriesByOneDayQuery = { __typename?: 'Query' } & {
  entriesByOneDay?: Maybe<{ __typename?: 'EntriesByDay' } & EntriesByDayResultFragment>;
};

export type GetBalanceQueryVariables = Exact<{ [key: string]: never }>;

export type GetBalanceQuery = { __typename?: 'Query' } & Pick<Query, 'balance'>;

export type GetDaysStatisticQueryVariables = Exact<{ [key: string]: never }>;

export type GetDaysStatisticQuery = { __typename?: 'Query' } & {
  daysStatistic: { __typename?: 'DaysStatistic' } & Pick<
    DaysStatistic,
    'missing' | 'streak' | 'total'
  >;
};

export type GetReminderQueryVariables = Exact<{ [key: string]: never }>;

export type GetReminderQuery = { __typename?: 'Query' } & {
  reminder?: Maybe<
    { __typename?: 'Reminder' } & Pick<Reminder, '_id' | 'remindAt' | 'isRepeating'>
  >;
};

export type GetPushTokenQueryVariables = Exact<{ [key: string]: never }>;

export type GetPushTokenQuery = { __typename?: 'Query' } & {
  pushToken?: Maybe<{ __typename?: 'PushToken' } & Pick<PushToken, '_id' | 'token' | 'userId'>>;
};

export type CreateActivityMutationVariables = Exact<{
  data: CreateActivityInput;
}>;

export type CreateActivityMutation = { __typename?: 'Mutation' } & {
  createActivity: { __typename?: 'Activity' } & Pick<Activity, '_id'>;
};

export type UpdateActivityMutationVariables = Exact<{
  _id: Scalars['ID'];
  data: UpdateActivityInput;
}>;

export type UpdateActivityMutation = { __typename?: 'Mutation' } & {
  updateActivityById: { __typename?: 'Activity' } & Pick<Activity, '_id'>;
};

export type ArchiveActivityMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type ArchiveActivityMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'archiveActivity'
>;

export type RestoreActivityMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type RestoreActivityMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'restoreActivity'
>;

export type CreateEntryMutationVariables = Exact<{
  data: CreateEntryInput;
}>;

export type CreateEntryMutation = { __typename?: 'Mutation' } & {
  createEntry: { __typename?: 'Entry' } & Pick<Entry, '_id'>;
};

export type UpdateEntryMutationVariables = Exact<{
  _id: Scalars['ID'];
  data: UpdateEntryInput;
}>;

export type UpdateEntryMutation = { __typename?: 'Mutation' } & {
  updateEntryById: { __typename?: 'Entry' } & Pick<Entry, '_id'>;
};

export type DeleteEntryMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type DeleteEntryMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteEntry'>;

export type ConnectTodoistMutationVariables = Exact<{
  authCode: Scalars['String'];
}>;

export type ConnectTodoistMutation = { __typename?: 'Mutation' } & {
  connectTodoist: { __typename?: 'Activity' } & Pick<Activity, '_id'>;
};

export type UpsertReminderMutationVariables = Exact<{
  data: ReminderInput;
}>;

export type UpsertReminderMutation = { __typename?: 'Mutation' } & {
  upsertReminder: { __typename?: 'Reminder' } & Pick<
    Reminder,
    '_id' | 'createdAt' | 'remindAt' | 'isRepeating' | 'userId'
  >;
};

export type UpsertPushTokenMutationVariables = Exact<{
  data: PushTokenUpsertInput;
}>;

export type UpsertPushTokenMutation = { __typename?: 'Mutation' } & {
  upsertPushToken: { __typename?: 'PushToken' } & Pick<PushToken, '_id' | 'userId' | 'token'>;
};

export const ActivityResultFragmentDoc = gql`
  fragment ActivityResult on Activity {
    _id
    name
    emoji
    category
    valueLabel
    valueType
    pointsType
    points
    isArchived
    isWithDescription
    isWidget
    rangeMeta {
      from
      to
    }
  }
`;
export const EntriesByDayResultFragmentDoc = gql`
  fragment EntriesByDayResult on EntriesByDay {
    date
    points
    entries {
      _id
      description
      value
      completedAt
      activityId
    }
  }
`;
export const GetActivityDocument = gql`
  query GetActivity($_id: ID!) {
    activity(_id: $_id) {
      ...ActivityResult
    }
  }
  ${ActivityResultFragmentDoc}
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
export function useGetActivityQuery(
  baseOptions: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>
) {
  return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(
    GetActivityDocument,
    baseOptions
  );
}
export function useGetActivityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>
) {
  return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(
    GetActivityDocument,
    baseOptions
  );
}
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<
  GetActivityQuery,
  GetActivityQueryVariables
>;
export function refetchGetActivityQuery(variables?: GetActivityQueryVariables) {
  return { query: GetActivityDocument, variables: variables };
}
export const GetActivitiesDocument = gql`
  query GetActivities {
    activities {
      ...ActivityResult
    }
  }
  ${ActivityResultFragmentDoc}
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
export function useGetActivitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>
) {
  return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(
    GetActivitiesDocument,
    baseOptions
  );
}
export function useGetActivitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>
) {
  return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(
    GetActivitiesDocument,
    baseOptions
  );
}
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<
  GetActivitiesQuery,
  GetActivitiesQueryVariables
>;
export function refetchGetActivitiesQuery(variables?: GetActivitiesQueryVariables) {
  return { query: GetActivitiesDocument, variables: variables };
}
export const GetEntriesByDayDocument = gql`
  query GetEntriesByDay($dateAfter: Date) {
    entriesByDay(dateAfter: $dateAfter) {
      ...EntriesByDayResult
    }
  }
  ${EntriesByDayResultFragmentDoc}
`;

/**
 * __useGetEntriesByDayQuery__
 *
 * To run a query within a React component, call `useGetEntriesByDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntriesByDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntriesByDayQuery({
 *   variables: {
 *      dateAfter: // value for 'dateAfter'
 *   },
 * });
 */
export function useGetEntriesByDayQuery(
  baseOptions?: Apollo.QueryHookOptions<GetEntriesByDayQuery, GetEntriesByDayQueryVariables>
) {
  return Apollo.useQuery<GetEntriesByDayQuery, GetEntriesByDayQueryVariables>(
    GetEntriesByDayDocument,
    baseOptions
  );
}
export function useGetEntriesByDayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEntriesByDayQuery, GetEntriesByDayQueryVariables>
) {
  return Apollo.useLazyQuery<GetEntriesByDayQuery, GetEntriesByDayQueryVariables>(
    GetEntriesByDayDocument,
    baseOptions
  );
}
export type GetEntriesByDayQueryHookResult = ReturnType<typeof useGetEntriesByDayQuery>;
export type GetEntriesByDayLazyQueryHookResult = ReturnType<typeof useGetEntriesByDayLazyQuery>;
export type GetEntriesByDayQueryResult = Apollo.QueryResult<
  GetEntriesByDayQuery,
  GetEntriesByDayQueryVariables
>;
export function refetchGetEntriesByDayQuery(variables?: GetEntriesByDayQueryVariables) {
  return { query: GetEntriesByDayDocument, variables: variables };
}
export const GetCalendarDaysDocument = gql`
  query GetCalendarDays($dateAfter: Date, $dateBefore: Date) {
    entriesByDay(dateAfter: $dateAfter, dateBefore: $dateBefore) {
      date
      points
      entries {
        _id
        value
        activityId
      }
    }
  }
`;

/**
 * __useGetCalendarDaysQuery__
 *
 * To run a query within a React component, call `useGetCalendarDaysQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarDaysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarDaysQuery({
 *   variables: {
 *      dateAfter: // value for 'dateAfter'
 *      dateBefore: // value for 'dateBefore'
 *   },
 * });
 */
export function useGetCalendarDaysQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCalendarDaysQuery, GetCalendarDaysQueryVariables>
) {
  return Apollo.useQuery<GetCalendarDaysQuery, GetCalendarDaysQueryVariables>(
    GetCalendarDaysDocument,
    baseOptions
  );
}
export function useGetCalendarDaysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarDaysQuery, GetCalendarDaysQueryVariables>
) {
  return Apollo.useLazyQuery<GetCalendarDaysQuery, GetCalendarDaysQueryVariables>(
    GetCalendarDaysDocument,
    baseOptions
  );
}
export type GetCalendarDaysQueryHookResult = ReturnType<typeof useGetCalendarDaysQuery>;
export type GetCalendarDaysLazyQueryHookResult = ReturnType<typeof useGetCalendarDaysLazyQuery>;
export type GetCalendarDaysQueryResult = Apollo.QueryResult<
  GetCalendarDaysQuery,
  GetCalendarDaysQueryVariables
>;
export function refetchGetCalendarDaysQuery(variables?: GetCalendarDaysQueryVariables) {
  return { query: GetCalendarDaysDocument, variables: variables };
}
export const GetEntriesByOneDayDocument = gql`
  query GetEntriesByOneDay($date: Date!) {
    entriesByOneDay(date: $date) {
      ...EntriesByDayResult
    }
  }
  ${EntriesByDayResultFragmentDoc}
`;

/**
 * __useGetEntriesByOneDayQuery__
 *
 * To run a query within a React component, call `useGetEntriesByOneDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntriesByOneDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntriesByOneDayQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetEntriesByOneDayQuery(
  baseOptions: Apollo.QueryHookOptions<GetEntriesByOneDayQuery, GetEntriesByOneDayQueryVariables>
) {
  return Apollo.useQuery<GetEntriesByOneDayQuery, GetEntriesByOneDayQueryVariables>(
    GetEntriesByOneDayDocument,
    baseOptions
  );
}
export function useGetEntriesByOneDayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEntriesByOneDayQuery,
    GetEntriesByOneDayQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetEntriesByOneDayQuery, GetEntriesByOneDayQueryVariables>(
    GetEntriesByOneDayDocument,
    baseOptions
  );
}
export type GetEntriesByOneDayQueryHookResult = ReturnType<typeof useGetEntriesByOneDayQuery>;
export type GetEntriesByOneDayLazyQueryHookResult = ReturnType<
  typeof useGetEntriesByOneDayLazyQuery
>;
export type GetEntriesByOneDayQueryResult = Apollo.QueryResult<
  GetEntriesByOneDayQuery,
  GetEntriesByOneDayQueryVariables
>;
export function refetchGetEntriesByOneDayQuery(variables?: GetEntriesByOneDayQueryVariables) {
  return { query: GetEntriesByOneDayDocument, variables: variables };
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
export function useGetBalanceQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>
) {
  return Apollo.useQuery<GetBalanceQuery, GetBalanceQueryVariables>(
    GetBalanceDocument,
    baseOptions
  );
}
export function useGetBalanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>
) {
  return Apollo.useLazyQuery<GetBalanceQuery, GetBalanceQueryVariables>(
    GetBalanceDocument,
    baseOptions
  );
}
export type GetBalanceQueryHookResult = ReturnType<typeof useGetBalanceQuery>;
export type GetBalanceLazyQueryHookResult = ReturnType<typeof useGetBalanceLazyQuery>;
export type GetBalanceQueryResult = Apollo.QueryResult<GetBalanceQuery, GetBalanceQueryVariables>;
export function refetchGetBalanceQuery(variables?: GetBalanceQueryVariables) {
  return { query: GetBalanceDocument, variables: variables };
}
export const GetDaysStatisticDocument = gql`
  query GetDaysStatistic {
    daysStatistic {
      missing
      streak
      total
    }
  }
`;

/**
 * __useGetDaysStatisticQuery__
 *
 * To run a query within a React component, call `useGetDaysStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDaysStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDaysStatisticQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDaysStatisticQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDaysStatisticQuery, GetDaysStatisticQueryVariables>
) {
  return Apollo.useQuery<GetDaysStatisticQuery, GetDaysStatisticQueryVariables>(
    GetDaysStatisticDocument,
    baseOptions
  );
}
export function useGetDaysStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDaysStatisticQuery, GetDaysStatisticQueryVariables>
) {
  return Apollo.useLazyQuery<GetDaysStatisticQuery, GetDaysStatisticQueryVariables>(
    GetDaysStatisticDocument,
    baseOptions
  );
}
export type GetDaysStatisticQueryHookResult = ReturnType<typeof useGetDaysStatisticQuery>;
export type GetDaysStatisticLazyQueryHookResult = ReturnType<typeof useGetDaysStatisticLazyQuery>;
export type GetDaysStatisticQueryResult = Apollo.QueryResult<
  GetDaysStatisticQuery,
  GetDaysStatisticQueryVariables
>;
export function refetchGetDaysStatisticQuery(variables?: GetDaysStatisticQueryVariables) {
  return { query: GetDaysStatisticDocument, variables: variables };
}
export const GetReminderDocument = gql`
  query GetReminder {
    reminder {
      _id
      remindAt
      isRepeating
    }
  }
`;

/**
 * __useGetReminderQuery__
 *
 * To run a query within a React component, call `useGetReminderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReminderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReminderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReminderQuery(
  baseOptions?: Apollo.QueryHookOptions<GetReminderQuery, GetReminderQueryVariables>
) {
  return Apollo.useQuery<GetReminderQuery, GetReminderQueryVariables>(
    GetReminderDocument,
    baseOptions
  );
}
export function useGetReminderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReminderQuery, GetReminderQueryVariables>
) {
  return Apollo.useLazyQuery<GetReminderQuery, GetReminderQueryVariables>(
    GetReminderDocument,
    baseOptions
  );
}
export type GetReminderQueryHookResult = ReturnType<typeof useGetReminderQuery>;
export type GetReminderLazyQueryHookResult = ReturnType<typeof useGetReminderLazyQuery>;
export type GetReminderQueryResult = Apollo.QueryResult<
  GetReminderQuery,
  GetReminderQueryVariables
>;
export function refetchGetReminderQuery(variables?: GetReminderQueryVariables) {
  return { query: GetReminderDocument, variables: variables };
}
export const GetPushTokenDocument = gql`
  query GetPushToken {
    pushToken {
      _id
      token
      userId
    }
  }
`;

/**
 * __useGetPushTokenQuery__
 *
 * To run a query within a React component, call `useGetPushTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPushTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPushTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPushTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPushTokenQuery, GetPushTokenQueryVariables>
) {
  return Apollo.useQuery<GetPushTokenQuery, GetPushTokenQueryVariables>(
    GetPushTokenDocument,
    baseOptions
  );
}
export function useGetPushTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPushTokenQuery, GetPushTokenQueryVariables>
) {
  return Apollo.useLazyQuery<GetPushTokenQuery, GetPushTokenQueryVariables>(
    GetPushTokenDocument,
    baseOptions
  );
}
export type GetPushTokenQueryHookResult = ReturnType<typeof useGetPushTokenQuery>;
export type GetPushTokenLazyQueryHookResult = ReturnType<typeof useGetPushTokenLazyQuery>;
export type GetPushTokenQueryResult = Apollo.QueryResult<
  GetPushTokenQuery,
  GetPushTokenQueryVariables
>;
export function refetchGetPushTokenQuery(variables?: GetPushTokenQueryVariables) {
  return { query: GetPushTokenDocument, variables: variables };
}
export const CreateActivityDocument = gql`
  mutation CreateActivity($data: CreateActivityInput!) {
    createActivity(data: $data) {
      _id
    }
  }
`;
export type CreateActivityMutationFn = Apollo.MutationFunction<
  CreateActivityMutation,
  CreateActivityMutationVariables
>;

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
export function useCreateActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>
) {
  return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(
    CreateActivityDocument,
    baseOptions
  );
}
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<
  CreateActivityMutation,
  CreateActivityMutationVariables
>;
export const UpdateActivityDocument = gql`
  mutation UpdateActivity($_id: ID!, $data: UpdateActivityInput!) {
    updateActivityById(_id: $_id, data: $data) {
      _id
    }
  }
`;
export type UpdateActivityMutationFn = Apollo.MutationFunction<
  UpdateActivityMutation,
  UpdateActivityMutationVariables
>;

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
export function useUpdateActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateActivityMutation, UpdateActivityMutationVariables>
) {
  return Apollo.useMutation<UpdateActivityMutation, UpdateActivityMutationVariables>(
    UpdateActivityDocument,
    baseOptions
  );
}
export type UpdateActivityMutationHookResult = ReturnType<typeof useUpdateActivityMutation>;
export type UpdateActivityMutationResult = Apollo.MutationResult<UpdateActivityMutation>;
export type UpdateActivityMutationOptions = Apollo.BaseMutationOptions<
  UpdateActivityMutation,
  UpdateActivityMutationVariables
>;
export const ArchiveActivityDocument = gql`
  mutation ArchiveActivity($_id: ID!) {
    archiveActivity(_id: $_id)
  }
`;
export type ArchiveActivityMutationFn = Apollo.MutationFunction<
  ArchiveActivityMutation,
  ArchiveActivityMutationVariables
>;

/**
 * __useArchiveActivityMutation__
 *
 * To run a mutation, you first call `useArchiveActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveActivityMutation, { data, loading, error }] = useArchiveActivityMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useArchiveActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchiveActivityMutation,
    ArchiveActivityMutationVariables
  >
) {
  return Apollo.useMutation<ArchiveActivityMutation, ArchiveActivityMutationVariables>(
    ArchiveActivityDocument,
    baseOptions
  );
}
export type ArchiveActivityMutationHookResult = ReturnType<typeof useArchiveActivityMutation>;
export type ArchiveActivityMutationResult = Apollo.MutationResult<ArchiveActivityMutation>;
export type ArchiveActivityMutationOptions = Apollo.BaseMutationOptions<
  ArchiveActivityMutation,
  ArchiveActivityMutationVariables
>;
export const RestoreActivityDocument = gql`
  mutation RestoreActivity($_id: ID!) {
    restoreActivity(_id: $_id)
  }
`;
export type RestoreActivityMutationFn = Apollo.MutationFunction<
  RestoreActivityMutation,
  RestoreActivityMutationVariables
>;

/**
 * __useRestoreActivityMutation__
 *
 * To run a mutation, you first call `useRestoreActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreActivityMutation, { data, loading, error }] = useRestoreActivityMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRestoreActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreActivityMutation,
    RestoreActivityMutationVariables
  >
) {
  return Apollo.useMutation<RestoreActivityMutation, RestoreActivityMutationVariables>(
    RestoreActivityDocument,
    baseOptions
  );
}
export type RestoreActivityMutationHookResult = ReturnType<typeof useRestoreActivityMutation>;
export type RestoreActivityMutationResult = Apollo.MutationResult<RestoreActivityMutation>;
export type RestoreActivityMutationOptions = Apollo.BaseMutationOptions<
  RestoreActivityMutation,
  RestoreActivityMutationVariables
>;
export const CreateEntryDocument = gql`
  mutation CreateEntry($data: CreateEntryInput!) {
    createEntry(data: $data) {
      _id
    }
  }
`;
export type CreateEntryMutationFn = Apollo.MutationFunction<
  CreateEntryMutation,
  CreateEntryMutationVariables
>;

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
export function useCreateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>
) {
  return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(
    CreateEntryDocument,
    baseOptions
  );
}
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<
  CreateEntryMutation,
  CreateEntryMutationVariables
>;
export const UpdateEntryDocument = gql`
  mutation UpdateEntry($_id: ID!, $data: UpdateEntryInput!) {
    updateEntryById(_id: $_id, data: $data) {
      _id
    }
  }
`;
export type UpdateEntryMutationFn = Apollo.MutationFunction<
  UpdateEntryMutation,
  UpdateEntryMutationVariables
>;

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
export function useUpdateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateEntryMutation, UpdateEntryMutationVariables>
) {
  return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(
    UpdateEntryDocument,
    baseOptions
  );
}
export type UpdateEntryMutationHookResult = ReturnType<typeof useUpdateEntryMutation>;
export type UpdateEntryMutationResult = Apollo.MutationResult<UpdateEntryMutation>;
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<
  UpdateEntryMutation,
  UpdateEntryMutationVariables
>;
export const DeleteEntryDocument = gql`
  mutation DeleteEntry($_id: ID!) {
    deleteEntry(_id: $_id)
  }
`;
export type DeleteEntryMutationFn = Apollo.MutationFunction<
  DeleteEntryMutation,
  DeleteEntryMutationVariables
>;

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
export function useDeleteEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>
) {
  return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(
    DeleteEntryDocument,
    baseOptions
  );
}
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<
  DeleteEntryMutation,
  DeleteEntryMutationVariables
>;
export const ConnectTodoistDocument = gql`
  mutation ConnectTodoist($authCode: String!) {
    connectTodoist(authCode: $authCode) {
      _id
    }
  }
`;
export type ConnectTodoistMutationFn = Apollo.MutationFunction<
  ConnectTodoistMutation,
  ConnectTodoistMutationVariables
>;

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
export function useConnectTodoistMutation(
  baseOptions?: Apollo.MutationHookOptions<ConnectTodoistMutation, ConnectTodoistMutationVariables>
) {
  return Apollo.useMutation<ConnectTodoistMutation, ConnectTodoistMutationVariables>(
    ConnectTodoistDocument,
    baseOptions
  );
}
export type ConnectTodoistMutationHookResult = ReturnType<typeof useConnectTodoistMutation>;
export type ConnectTodoistMutationResult = Apollo.MutationResult<ConnectTodoistMutation>;
export type ConnectTodoistMutationOptions = Apollo.BaseMutationOptions<
  ConnectTodoistMutation,
  ConnectTodoistMutationVariables
>;
export const UpsertReminderDocument = gql`
  mutation UpsertReminder($data: ReminderInput!) {
    upsertReminder(data: $data) {
      _id
      createdAt
      remindAt
      isRepeating
      userId
    }
  }
`;
export type UpsertReminderMutationFn = Apollo.MutationFunction<
  UpsertReminderMutation,
  UpsertReminderMutationVariables
>;

/**
 * __useUpsertReminderMutation__
 *
 * To run a mutation, you first call `useUpsertReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertReminderMutation, { data, loading, error }] = useUpsertReminderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpsertReminderMutation(
  baseOptions?: Apollo.MutationHookOptions<UpsertReminderMutation, UpsertReminderMutationVariables>
) {
  return Apollo.useMutation<UpsertReminderMutation, UpsertReminderMutationVariables>(
    UpsertReminderDocument,
    baseOptions
  );
}
export type UpsertReminderMutationHookResult = ReturnType<typeof useUpsertReminderMutation>;
export type UpsertReminderMutationResult = Apollo.MutationResult<UpsertReminderMutation>;
export type UpsertReminderMutationOptions = Apollo.BaseMutationOptions<
  UpsertReminderMutation,
  UpsertReminderMutationVariables
>;
export const UpsertPushTokenDocument = gql`
  mutation UpsertPushToken($data: PushTokenUpsertInput!) {
    upsertPushToken(data: $data) {
      _id
      userId
      token
    }
  }
`;
export type UpsertPushTokenMutationFn = Apollo.MutationFunction<
  UpsertPushTokenMutation,
  UpsertPushTokenMutationVariables
>;

/**
 * __useUpsertPushTokenMutation__
 *
 * To run a mutation, you first call `useUpsertPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPushTokenMutation, { data, loading, error }] = useUpsertPushTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpsertPushTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPushTokenMutation,
    UpsertPushTokenMutationVariables
  >
) {
  return Apollo.useMutation<UpsertPushTokenMutation, UpsertPushTokenMutationVariables>(
    UpsertPushTokenDocument,
    baseOptions
  );
}
export type UpsertPushTokenMutationHookResult = ReturnType<typeof useUpsertPushTokenMutation>;
export type UpsertPushTokenMutationResult = Apollo.MutationResult<UpsertPushTokenMutation>;
export type UpsertPushTokenMutationOptions = Apollo.BaseMutationOptions<
  UpsertPushTokenMutation,
  UpsertPushTokenMutationVariables
>;
