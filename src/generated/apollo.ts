import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  activeSubscription?: Maybe<Subscription>;
  activities: Array<Activity>;
  activitiesExtremes: Array<ActivityExtremes>;
  activitiesStatistic: Array<ActivityBaseStatistic>;
  activity?: Maybe<Activity>;
  activityAdvancedStatistic?: Maybe<ActivityAdvancedStatistic>;
  activityBaseStatistic: ActivityBaseStatistic;
  balance: Balance;
  currentGoalsResults: Array<GoalResult>;
  daysStatistic: DaysStatistic;
  entries: Array<Entry>;
  entriesByDay: Array<EntriesByDay>;
  entriesByOneDay?: Maybe<EntriesByDay>;
  entry?: Maybe<Entry>;
  goal?: Maybe<Goal>;
  goals: Array<Goal>;
  journal: Array<Journal>;
  paymentUrl: Scalars['String'];
  pushTokens: Array<PushToken>;
  reminder?: Maybe<Reminder>;
  subscription?: Maybe<Subscription>;
  todoistActivity: Activity;
};

export type QueryActivitiesStatisticArgs = {
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
};

export type QueryActivityArgs = {
  _id: Scalars['ID'];
};

export type QueryActivityAdvancedStatisticArgs = {
  activityId: Scalars['String'];
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
};

export type QueryActivityBaseStatisticArgs = {
  activityId: Scalars['String'];
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
};

export type QueryBalanceArgs = {
  dateAfter?: Maybe<Scalars['Date']>;
};

export type QueryEntriesByDayArgs = {
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
};

export type QueryEntriesByOneDayArgs = {
  date: Scalars['Date'];
};

export type QueryEntryArgs = {
  _id: Scalars['ID'];
};

export type QueryGoalArgs = {
  _id: Scalars['ID'];
};

export type QueryJournalArgs = {
  dateAfter?: Maybe<Scalars['Date']>;
  daysLimit: Scalars['Int'];
  activities?: Maybe<Array<Scalars['String']>>;
};

export type QueryPaymentUrlArgs = {
  callbackUrl: Scalars['String'];
};

export type QuerySubscriptionArgs = {
  platform?: Maybe<SubscriptionPlatform>;
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertPushToken: PushToken;
  upsertReminder: Reminder;
  createActivity: Activity;
  updateActivityById: Activity;
  archiveActivity: Scalars['Boolean'];
  restoreActivity: Scalars['Boolean'];
  createGoal: Goal;
  updateGoalById: Goal;
  checkFailedGoalsResults: Scalars['Boolean'];
  createEntry: Entry;
  updateEntryById: Entry;
  deleteEntry?: Maybe<Scalars['String']>;
  connectTodoist: Activity;
  cancelSubscription: Scalars['Boolean'];
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

export type MutationCreateGoalArgs = {
  data: CreateGoalInput;
};

export type MutationUpdateGoalByIdArgs = {
  _id: Scalars['ID'];
  data: UpdateGoalInput;
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

export type MutationCancelSubscriptionArgs = {
  _id: Scalars['ID'];
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

export type Subscription = {
  __typename?: 'Subscription';
  _id: Scalars['String'];
  userId: Scalars['String'];
  productId: Scalars['String'];
  subscriptionId?: Maybe<Scalars['String']>;
  platform: SubscriptionPlatform;
  status: SubscriptionStatus;
  expireAt?: Maybe<Scalars['Date']>;
};

export type Goal = {
  __typename?: 'Goal';
  _id: Scalars['ID'];
  activity: Activity;
  activityId: Scalars['ID'];
  conditionType: ConditionType;
  durationEndCheckedAt: Scalars['Date'];
  durationType: DurationType;
  failPoints?: Maybe<Scalars['Float']>;
  negativeFailPoints?: Maybe<Scalars['Float']>;
  startDate: Scalars['Date'];
  successPoints?: Maybe<Scalars['Float']>;
  timesPerDuration: Scalars['Int'];
  userId: Scalars['String'];
};

export enum ConditionType {
  LessOrEqual = 'LessOrEqual',
  GreaterOrEqual = 'GreaterOrEqual'
}

export enum DurationType {
  Week = 'Week',
  Month = 'Month'
}

export type CreateGoalInput = {
  activityId: Scalars['ID'];
  conditionType: ConditionType;
  durationType: DurationType;
  timesPerDuration: Scalars['Int'];
  successPoints?: Maybe<Scalars['Float']>;
  failPoints?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type UpdateGoalInput = {
  activityId?: Maybe<Scalars['ID']>;
  conditionType?: Maybe<Scalars['String']>;
  durationType?: Maybe<Scalars['String']>;
  timesPerDuration?: Maybe<Scalars['Int']>;
  successPoints?: Maybe<Scalars['Float']>;
  failPoints?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type GoalResult = {
  __typename?: 'GoalResult';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  goalId: Scalars['ID'];
  goal: Goal;
  entries: Array<Entry>;
  recordedAt: Scalars['Date'];
  status: GoalResultStatus;
  points: Scalars['Float'];
};

export enum GoalResultStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed'
}

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
  points: Scalars['Float'];
  rangeMeta?: Maybe<RangeMeta>;
  todoistMeta?: Maybe<TodoistMeta>;
  createdAt: Scalars['Date'];
  isArchived: Scalars['Boolean'];
  isWithDescription: Scalars['Boolean'];
  isWidget: Scalars['Boolean'];
  isReverseColors: Scalars['Boolean'];
  isRequired: Scalars['Boolean'];
  dateIsRequiredSet: Scalars['Date'];
};

export type CreateActivityInput = {
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  emoji: Scalars['String'];
  valueLabel?: Maybe<Scalars['String']>;
  valueType: ActivityType;
  pointsType: PointsType;
  category: ActivityCategory;
  points: Scalars['Float'];
  rangeMeta?: Maybe<RangeMetaInput>;
  todoistMeta?: Maybe<TodoistMetaInput>;
  isWithDescription?: Maybe<Scalars['Boolean']>;
  isWidget?: Maybe<Scalars['Boolean']>;
  isReverseColors?: Maybe<Scalars['Boolean']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  dateIsRequiredSet?: Maybe<Scalars['Date']>;
};

export type UpdateActivityInput = {
  name?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  valueLabel?: Maybe<Scalars['String']>;
  valueType?: Maybe<ActivityType>;
  pointsType?: Maybe<PointsType>;
  category?: Maybe<ActivityCategory>;
  points?: Maybe<Scalars['Float']>;
  rangeMeta?: Maybe<RangeMetaInput>;
  todoistMeta?: Maybe<TodoistMetaInput>;
  isWithDescription?: Maybe<Scalars['Boolean']>;
  isWidget?: Maybe<Scalars['Boolean']>;
  isReverseColors?: Maybe<Scalars['Boolean']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  dateIsRequiredSet?: Maybe<Scalars['Date']>;
};

export type ActivityExtremes = {
  __typename?: 'ActivityExtremes';
  _id: Scalars['ID'];
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  valueType: ActivityType;
};

export type Streak = {
  __typename?: 'Streak';
  count: Scalars['Int'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type WeekdayStatistic = {
  __typename?: 'WeekdayStatistic';
  weekday: Scalars['Int'];
  count: Scalars['Int'];
  valueSum: Scalars['Float'];
  averageValue?: Maybe<Scalars['Float']>;
};

export type CountPerValue = {
  __typename?: 'CountPerValue';
  value: Scalars['Int'];
  count: Scalars['Int'];
};

export type EntryPerDate = {
  __typename?: 'EntryPerDate';
  valueSum?: Maybe<Scalars['Float']>;
  averageValue?: Maybe<Scalars['Float']>;
  count: Scalars['Int'];
  completedAt: Scalars['String'];
};

export type EntriesPerDateGroup = {
  __typename?: 'EntriesPerDateGroup';
  week: Array<EntryPerDate>;
  month: Array<EntryPerDate>;
};

export type ActivityBaseStatistic = {
  __typename?: 'ActivityBaseStatistic';
  _id: Scalars['ID'];
  activity: Activity;
  averageValue?: Maybe<Scalars['Float']>;
  dateAfterKey: Scalars['String'];
  medianValue?: Maybe<Scalars['Float']>;
  perWeek?: Maybe<Scalars['Float']>;
  streakWith: Streak;
  streakWithout: Streak;
  total: Scalars['Int'];
};

export type ActivityAdvancedStatistic = {
  __typename?: 'ActivityAdvancedStatistic';
  _id: Scalars['ID'];
  activity: Activity;
  countPerValue?: Maybe<Array<CountPerValue>>;
  dateAfterKey: Scalars['String'];
  entriesPerDateGroup: EntriesPerDateGroup;
  weekdays: Array<WeekdayStatistic>;
};

export type Entry = {
  __typename?: 'Entry';
  _id: Scalars['ID'];
  activity: Activity;
  activityId: Scalars['ID'];
  completedAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  goalResultsIds: Array<Maybe<Scalars['ID']>>;
  points: Scalars['Float'];
  userId: Scalars['String'];
  value?: Maybe<Scalars['Float']>;
};

export type EntryMissing = {
  __typename?: 'EntryMissing';
  activity: Activity;
  activityId: Scalars['ID'];
};

export type EntriesByDay = {
  __typename?: 'EntriesByDay';
  date: Scalars['Date'];
  points: Scalars['Float'];
  entries: Array<Entry>;
  missing: Array<EntryMissing>;
};

export type Journal = {
  __typename?: 'Journal';
  date: Scalars['Date'];
  points: Scalars['Float'];
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

export enum SubscriptionPlatform {
  AppStore = 'AppStore',
  GooglePlay = 'GooglePlay',
  Fondy = 'Fondy',
  Granted = 'Granted'
}

export enum SubscriptionStatus {
  NotSubscribed = 'NotSubscribed',
  Pending = 'Pending',
  Subscribed = 'Subscribed',
  Expired = 'Expired'
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

export type Balance = {
  __typename?: 'Balance';
  total: Scalars['Int'];
  year: Scalars['Int'];
  month: Scalars['Int'];
  week: Scalars['Int'];
};

export type CreateEntryInput = {
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  completedAt: Scalars['Date'];
  activityId: Scalars['ID'];
  value?: Maybe<Scalars['Float']>;
};

export type UpdateEntryInput = {
  description?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['Date']>;
  value?: Maybe<Scalars['Float']>;
};

export type ActivityFragment = { __typename?: 'Activity' } & Pick<
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
  | 'isReverseColors'
  | 'isRequired'
> & { rangeMeta?: Maybe<{ __typename?: 'RangeMeta' } & Pick<RangeMeta, 'from' | 'to'>> };

export type GetActivityQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type GetActivityQuery = { __typename?: 'Query' } & {
  activity?: Maybe<{ __typename?: 'Activity' } & ActivityFragment>;
};

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetActivitiesQuery = { __typename?: 'Query' } & {
  activities: Array<{ __typename?: 'Activity' } & ActivityFragment>;
};

export type GoalFragment = { __typename?: 'Goal' } & Pick<
  Goal,
  | '_id'
  | 'activityId'
  | 'conditionType'
  | 'timesPerDuration'
  | 'durationType'
  | 'failPoints'
  | 'successPoints'
  | 'startDate'
> & { activity: { __typename?: 'Activity' } & Pick<Activity, '_id' | 'name' | 'emoji'> };

export type GetGoalQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type GetGoalQuery = { __typename?: 'Query' } & {
  goal?: Maybe<{ __typename?: 'Goal' } & GoalFragment>;
};

export type GetGoalsQueryVariables = Exact<{ [key: string]: never }>;

export type GetGoalsQuery = { __typename?: 'Query' } & {
  goals: Array<{ __typename?: 'Goal' } & GoalFragment>;
};

export type GetCurrentGoalsResultsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentGoalsResultsQuery = { __typename?: 'Query' } & {
  currentGoalsResults: Array<
    { __typename?: 'GoalResult' } & Pick<GoalResult, '_id' | 'status' | 'points'> & {
        entries: Array<{ __typename?: 'Entry' } & Pick<Entry, '_id'>>;
        goal: { __typename?: 'Goal' } & Pick<Goal, '_id' | 'conditionType' | 'timesPerDuration'> & {
            activity: { __typename?: 'Activity' } & Pick<Activity, '_id' | 'name' | 'emoji'>;
          };
      }
  >;
};

export type CreateGoalMutationVariables = Exact<{
  data: CreateGoalInput;
}>;

export type CreateGoalMutation = { __typename?: 'Mutation' } & {
  createGoal: { __typename?: 'Goal' } & Pick<Goal, '_id'>;
};

export type UpdateGoalMutationVariables = Exact<{
  _id: Scalars['ID'];
  data: UpdateGoalInput;
}>;

export type UpdateGoalMutation = { __typename?: 'Mutation' } & {
  updateGoalById: { __typename?: 'Goal' } & Pick<Goal, '_id'>;
};

export type CheckFailedGoalsResultsMutationVariables = Exact<{ [key: string]: never }>;

export type CheckFailedGoalsResultsMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'checkFailedGoalsResults'
>;

export type GetActivitiesExtremesQueryVariables = Exact<{ [key: string]: never }>;

export type GetActivitiesExtremesQuery = { __typename?: 'Query' } & {
  activitiesExtremes: Array<
    { __typename?: 'ActivityExtremes' } & Pick<
      ActivityExtremes,
      '_id' | 'min' | 'max' | 'valueType'
    >
  >;
};

export type EntriesByDayResultFragment = { __typename?: 'EntriesByDay' } & Pick<
  EntriesByDay,
  'date' | 'points'
> & {
    entries: Array<
      { __typename?: 'Entry' } & Pick<
        Entry,
        '_id' | 'description' | 'value' | 'completedAt' | 'activityId' | 'points'
      > & {
          activity: { __typename?: 'Activity' } & Pick<
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
            | 'isReverseColors'
            | 'isRequired'
          > & { rangeMeta?: Maybe<{ __typename?: 'RangeMeta' } & Pick<RangeMeta, 'from' | 'to'>> };
        }
    >;
    missing: Array<
      { __typename?: 'EntryMissing' } & Pick<EntryMissing, 'activityId'> & {
          activity: { __typename?: 'Activity' } & Pick<
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
            | 'isReverseColors'
            | 'isRequired'
          > & { rangeMeta?: Maybe<{ __typename?: 'RangeMeta' } & Pick<RangeMeta, 'from' | 'to'>> };
        }
    >;
  };

export type GetEntriesByDayQueryVariables = Exact<{
  dateAfter?: Maybe<Scalars['Date']>;
}>;

export type GetEntriesByDayQuery = { __typename?: 'Query' } & {
  entriesByDay: Array<{ __typename?: 'EntriesByDay' } & EntriesByDayResultFragment>;
};

export type GetJournalQueryVariables = Exact<{
  dateAfter?: Maybe<Scalars['Date']>;
  daysLimit: Scalars['Int'];
  activities?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetJournalQuery = { __typename?: 'Query' } & {
  journal: Array<
    { __typename?: 'Journal' } & Pick<Journal, 'date' | 'points'> & {
        entries: Array<
          { __typename?: 'Entry' } & Pick<
            Entry,
            '_id' | 'completedAt' | 'description' | 'activityId' | 'value'
          >
        >;
      }
  >;
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

export type GetBalanceQueryVariables = Exact<{
  dateAfter?: Maybe<Scalars['Date']>;
}>;

export type GetBalanceQuery = { __typename?: 'Query' } & {
  balance: { __typename?: 'Balance' } & Pick<Balance, 'total' | 'year' | 'month' | 'week'>;
};

export type GetDaysStatisticQueryVariables = Exact<{ [key: string]: never }>;

export type GetDaysStatisticQuery = { __typename?: 'Query' } & {
  daysStatistic: { __typename?: 'DaysStatistic' } & Pick<
    DaysStatistic,
    'missing' | 'streak' | 'total'
  >;
};

export type EntryPerDateFragment = { __typename?: 'EntryPerDate' } & Pick<
  EntryPerDate,
  'averageValue' | 'completedAt' | 'count' | 'valueSum'
>;

export type ActivityBaseStatisticFragment = { __typename?: 'ActivityBaseStatistic' } & Pick<
  ActivityBaseStatistic,
  '_id' | 'dateAfterKey' | 'total' | 'perWeek' | 'medianValue' | 'averageValue'
> & {
    activity: { __typename?: 'Activity' } & Pick<
      Activity,
      'name' | 'emoji' | 'valueType' | 'isRequired' | 'isReverseColors'
    >;
    streakWith: { __typename?: 'Streak' } & Pick<Streak, 'count' | 'from' | 'to'>;
    streakWithout: { __typename?: 'Streak' } & Pick<Streak, 'count' | 'from' | 'to'>;
  };

export type GetActivitiesStatisticQueryVariables = Exact<{
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
}>;

export type GetActivitiesStatisticQuery = { __typename?: 'Query' } & {
  activitiesStatistic: Array<
    { __typename?: 'ActivityBaseStatistic' } & ActivityBaseStatisticFragment
  >;
};

export type GetActivityStatisticQueryVariables = Exact<{
  activityId: Scalars['String'];
  dateAfter?: Maybe<Scalars['Date']>;
  dateBefore?: Maybe<Scalars['Date']>;
}>;

export type GetActivityStatisticQuery = { __typename?: 'Query' } & {
  activityBaseStatistic: { __typename?: 'ActivityBaseStatistic' } & ActivityBaseStatisticFragment;
  activityAdvancedStatistic?: Maybe<
    { __typename?: 'ActivityAdvancedStatistic' } & Pick<
      ActivityAdvancedStatistic,
      '_id' | 'dateAfterKey'
    > & {
        activity: { __typename?: 'Activity' } & Pick<
          Activity,
          'name' | 'emoji' | 'valueType' | 'isRequired' | 'isReverseColors'
        >;
        weekdays: Array<
          { __typename?: 'WeekdayStatistic' } & Pick<
            WeekdayStatistic,
            'weekday' | 'count' | 'valueSum' | 'averageValue'
          >
        >;
        countPerValue?: Maybe<
          Array<{ __typename?: 'CountPerValue' } & Pick<CountPerValue, 'count' | 'value'>>
        >;
        entriesPerDateGroup: { __typename?: 'EntriesPerDateGroup' } & {
          week: Array<{ __typename?: 'EntryPerDate' } & EntryPerDateFragment>;
          month: Array<{ __typename?: 'EntryPerDate' } & EntryPerDateFragment>;
        };
      }
  >;
};

export type GetReminderQueryVariables = Exact<{ [key: string]: never }>;

export type GetReminderQuery = { __typename?: 'Query' } & {
  reminder?: Maybe<
    { __typename?: 'Reminder' } & Pick<Reminder, '_id' | 'remindAt' | 'isRepeating'>
  >;
};

export type GetPushTokensQueryVariables = Exact<{ [key: string]: never }>;

export type GetPushTokensQuery = { __typename?: 'Query' } & {
  pushTokens: Array<{ __typename?: 'PushToken' } & Pick<PushToken, '_id' | 'token' | 'userId'>>;
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

export type GetTodoistActivityQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodoistActivityQuery = { __typename?: 'Query' } & {
  todoistActivity: { __typename?: 'Activity' } & ActivityFragment;
};

export type GetPaymentUrlQueryVariables = Exact<{
  callbackUrl: Scalars['String'];
}>;

export type GetPaymentUrlQuery = { __typename?: 'Query' } & Pick<Query, 'paymentUrl'>;

export type GetActiveSubscriptionQueryVariables = Exact<{ [key: string]: never }>;

export type GetActiveSubscriptionQuery = { __typename?: 'Query' } & {
  activeSubscription?: Maybe<
    { __typename?: 'Subscription' } & Pick<
      Subscription,
      '_id' | 'productId' | 'status' | 'platform'
    >
  >;
};

export type CancelSubscriptionMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type CancelSubscriptionMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'cancelSubscription'
>;

export const ActivityFragmentDoc = gql`
  fragment ActivityFragment on Activity {
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
    isReverseColors
    isRequired
    rangeMeta {
      from
      to
    }
  }
`;
export const GoalFragmentDoc = gql`
  fragment GoalFragment on Goal {
    _id
    activityId
    conditionType
    timesPerDuration
    durationType
    failPoints
    successPoints
    startDate
    activity @client {
      _id
      name
      emoji
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
      activity @client {
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
        isReverseColors
        isRequired
        rangeMeta {
          from
          to
        }
      }
      points
    }
    missing {
      activityId
      activity @client {
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
        isReverseColors
        isRequired
        rangeMeta {
          from
          to
        }
      }
    }
  }
`;
export const EntryPerDateFragmentDoc = gql`
  fragment EntryPerDateFragment on EntryPerDate {
    averageValue
    completedAt
    count
    valueSum
  }
`;
export const ActivityBaseStatisticFragmentDoc = gql`
  fragment ActivityBaseStatisticFragment on ActivityBaseStatistic {
    _id
    dateAfterKey
    activity @client {
      name
      emoji
      valueType
      isRequired
      isReverseColors
    }
    total
    perWeek
    medianValue
    averageValue
    streakWith {
      count
      from
      to
    }
    streakWithout {
      count
      from
      to
    }
  }
`;
export const GetActivityDocument = gql`
  query GetActivity($_id: ID!) {
    activity(_id: $_id) {
      ...ActivityFragment
    }
  }
  ${ActivityFragmentDoc}
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
      ...ActivityFragment
    }
  }
  ${ActivityFragmentDoc}
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
export const GetGoalDocument = gql`
  query GetGoal($_id: ID!) {
    goal(_id: $_id) {
      ...GoalFragment
    }
  }
  ${GoalFragmentDoc}
`;

/**
 * __useGetGoalQuery__
 *
 * To run a query within a React component, call `useGetGoalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoalQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetGoalQuery(
  baseOptions: Apollo.QueryHookOptions<GetGoalQuery, GetGoalQueryVariables>
) {
  return Apollo.useQuery<GetGoalQuery, GetGoalQueryVariables>(GetGoalDocument, baseOptions);
}
export function useGetGoalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGoalQuery, GetGoalQueryVariables>
) {
  return Apollo.useLazyQuery<GetGoalQuery, GetGoalQueryVariables>(GetGoalDocument, baseOptions);
}
export type GetGoalQueryHookResult = ReturnType<typeof useGetGoalQuery>;
export type GetGoalLazyQueryHookResult = ReturnType<typeof useGetGoalLazyQuery>;
export type GetGoalQueryResult = Apollo.QueryResult<GetGoalQuery, GetGoalQueryVariables>;
export function refetchGetGoalQuery(variables?: GetGoalQueryVariables) {
  return { query: GetGoalDocument, variables: variables };
}
export const GetGoalsDocument = gql`
  query GetGoals {
    goals {
      ...GoalFragment
    }
  }
  ${GoalFragmentDoc}
`;

/**
 * __useGetGoalsQuery__
 *
 * To run a query within a React component, call `useGetGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGoalsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetGoalsQuery, GetGoalsQueryVariables>
) {
  return Apollo.useQuery<GetGoalsQuery, GetGoalsQueryVariables>(GetGoalsDocument, baseOptions);
}
export function useGetGoalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGoalsQuery, GetGoalsQueryVariables>
) {
  return Apollo.useLazyQuery<GetGoalsQuery, GetGoalsQueryVariables>(GetGoalsDocument, baseOptions);
}
export type GetGoalsQueryHookResult = ReturnType<typeof useGetGoalsQuery>;
export type GetGoalsLazyQueryHookResult = ReturnType<typeof useGetGoalsLazyQuery>;
export type GetGoalsQueryResult = Apollo.QueryResult<GetGoalsQuery, GetGoalsQueryVariables>;
export function refetchGetGoalsQuery(variables?: GetGoalsQueryVariables) {
  return { query: GetGoalsDocument, variables: variables };
}
export const GetCurrentGoalsResultsDocument = gql`
  query GetCurrentGoalsResults {
    currentGoalsResults {
      _id
      status
      points
      entries {
        _id
      }
      goal {
        _id
        conditionType
        timesPerDuration
        activity {
          _id
          name
          emoji
        }
      }
    }
  }
`;

/**
 * __useGetCurrentGoalsResultsQuery__
 *
 * To run a query within a React component, call `useGetCurrentGoalsResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentGoalsResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentGoalsResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentGoalsResultsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentGoalsResultsQuery,
    GetCurrentGoalsResultsQueryVariables
  >
) {
  return Apollo.useQuery<GetCurrentGoalsResultsQuery, GetCurrentGoalsResultsQueryVariables>(
    GetCurrentGoalsResultsDocument,
    baseOptions
  );
}
export function useGetCurrentGoalsResultsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentGoalsResultsQuery,
    GetCurrentGoalsResultsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetCurrentGoalsResultsQuery, GetCurrentGoalsResultsQueryVariables>(
    GetCurrentGoalsResultsDocument,
    baseOptions
  );
}
export type GetCurrentGoalsResultsQueryHookResult = ReturnType<
  typeof useGetCurrentGoalsResultsQuery
>;
export type GetCurrentGoalsResultsLazyQueryHookResult = ReturnType<
  typeof useGetCurrentGoalsResultsLazyQuery
>;
export type GetCurrentGoalsResultsQueryResult = Apollo.QueryResult<
  GetCurrentGoalsResultsQuery,
  GetCurrentGoalsResultsQueryVariables
>;
export function refetchGetCurrentGoalsResultsQuery(
  variables?: GetCurrentGoalsResultsQueryVariables
) {
  return { query: GetCurrentGoalsResultsDocument, variables: variables };
}
export const CreateGoalDocument = gql`
  mutation CreateGoal($data: CreateGoalInput!) {
    createGoal(data: $data) {
      _id
    }
  }
`;
export type CreateGoalMutationFn = Apollo.MutationFunction<
  CreateGoalMutation,
  CreateGoalMutationVariables
>;

/**
 * __useCreateGoalMutation__
 *
 * To run a mutation, you first call `useCreateGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGoalMutation, { data, loading, error }] = useCreateGoalMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGoalMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateGoalMutation, CreateGoalMutationVariables>
) {
  return Apollo.useMutation<CreateGoalMutation, CreateGoalMutationVariables>(
    CreateGoalDocument,
    baseOptions
  );
}
export type CreateGoalMutationHookResult = ReturnType<typeof useCreateGoalMutation>;
export type CreateGoalMutationResult = Apollo.MutationResult<CreateGoalMutation>;
export type CreateGoalMutationOptions = Apollo.BaseMutationOptions<
  CreateGoalMutation,
  CreateGoalMutationVariables
>;
export const UpdateGoalDocument = gql`
  mutation UpdateGoal($_id: ID!, $data: UpdateGoalInput!) {
    updateGoalById(_id: $_id, data: $data) {
      _id
    }
  }
`;
export type UpdateGoalMutationFn = Apollo.MutationFunction<
  UpdateGoalMutation,
  UpdateGoalMutationVariables
>;

/**
 * __useUpdateGoalMutation__
 *
 * To run a mutation, you first call `useUpdateGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGoalMutation, { data, loading, error }] = useUpdateGoalMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGoalMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateGoalMutation, UpdateGoalMutationVariables>
) {
  return Apollo.useMutation<UpdateGoalMutation, UpdateGoalMutationVariables>(
    UpdateGoalDocument,
    baseOptions
  );
}
export type UpdateGoalMutationHookResult = ReturnType<typeof useUpdateGoalMutation>;
export type UpdateGoalMutationResult = Apollo.MutationResult<UpdateGoalMutation>;
export type UpdateGoalMutationOptions = Apollo.BaseMutationOptions<
  UpdateGoalMutation,
  UpdateGoalMutationVariables
>;
export const CheckFailedGoalsResultsDocument = gql`
  mutation CheckFailedGoalsResults {
    checkFailedGoalsResults
  }
`;
export type CheckFailedGoalsResultsMutationFn = Apollo.MutationFunction<
  CheckFailedGoalsResultsMutation,
  CheckFailedGoalsResultsMutationVariables
>;

/**
 * __useCheckFailedGoalsResultsMutation__
 *
 * To run a mutation, you first call `useCheckFailedGoalsResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckFailedGoalsResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkFailedGoalsResultsMutation, { data, loading, error }] = useCheckFailedGoalsResultsMutation({
 *   variables: {
 *   },
 * });
 */
export function useCheckFailedGoalsResultsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckFailedGoalsResultsMutation,
    CheckFailedGoalsResultsMutationVariables
  >
) {
  return Apollo.useMutation<
    CheckFailedGoalsResultsMutation,
    CheckFailedGoalsResultsMutationVariables
  >(CheckFailedGoalsResultsDocument, baseOptions);
}
export type CheckFailedGoalsResultsMutationHookResult = ReturnType<
  typeof useCheckFailedGoalsResultsMutation
>;
export type CheckFailedGoalsResultsMutationResult = Apollo.MutationResult<CheckFailedGoalsResultsMutation>;
export type CheckFailedGoalsResultsMutationOptions = Apollo.BaseMutationOptions<
  CheckFailedGoalsResultsMutation,
  CheckFailedGoalsResultsMutationVariables
>;
export const GetActivitiesExtremesDocument = gql`
  query GetActivitiesExtremes {
    activitiesExtremes {
      _id
      min
      max
      valueType
    }
  }
`;

/**
 * __useGetActivitiesExtremesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesExtremesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesExtremesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesExtremesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesExtremesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActivitiesExtremesQuery,
    GetActivitiesExtremesQueryVariables
  >
) {
  return Apollo.useQuery<GetActivitiesExtremesQuery, GetActivitiesExtremesQueryVariables>(
    GetActivitiesExtremesDocument,
    baseOptions
  );
}
export function useGetActivitiesExtremesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActivitiesExtremesQuery,
    GetActivitiesExtremesQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetActivitiesExtremesQuery, GetActivitiesExtremesQueryVariables>(
    GetActivitiesExtremesDocument,
    baseOptions
  );
}
export type GetActivitiesExtremesQueryHookResult = ReturnType<typeof useGetActivitiesExtremesQuery>;
export type GetActivitiesExtremesLazyQueryHookResult = ReturnType<
  typeof useGetActivitiesExtremesLazyQuery
>;
export type GetActivitiesExtremesQueryResult = Apollo.QueryResult<
  GetActivitiesExtremesQuery,
  GetActivitiesExtremesQueryVariables
>;
export function refetchGetActivitiesExtremesQuery(variables?: GetActivitiesExtremesQueryVariables) {
  return { query: GetActivitiesExtremesDocument, variables: variables };
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
export const GetJournalDocument = gql`
  query GetJournal($dateAfter: Date, $daysLimit: Int!, $activities: [String!]) {
    journal(dateAfter: $dateAfter, daysLimit: $daysLimit, activities: $activities) {
      date
      points
      entries {
        _id
        completedAt
        description
        activityId
        value
      }
    }
  }
`;

/**
 * __useGetJournalQuery__
 *
 * To run a query within a React component, call `useGetJournalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalQuery({
 *   variables: {
 *      dateAfter: // value for 'dateAfter'
 *      daysLimit: // value for 'daysLimit'
 *      activities: // value for 'activities'
 *   },
 * });
 */
export function useGetJournalQuery(
  baseOptions: Apollo.QueryHookOptions<GetJournalQuery, GetJournalQueryVariables>
) {
  return Apollo.useQuery<GetJournalQuery, GetJournalQueryVariables>(
    GetJournalDocument,
    baseOptions
  );
}
export function useGetJournalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetJournalQuery, GetJournalQueryVariables>
) {
  return Apollo.useLazyQuery<GetJournalQuery, GetJournalQueryVariables>(
    GetJournalDocument,
    baseOptions
  );
}
export type GetJournalQueryHookResult = ReturnType<typeof useGetJournalQuery>;
export type GetJournalLazyQueryHookResult = ReturnType<typeof useGetJournalLazyQuery>;
export type GetJournalQueryResult = Apollo.QueryResult<GetJournalQuery, GetJournalQueryVariables>;
export function refetchGetJournalQuery(variables?: GetJournalQueryVariables) {
  return { query: GetJournalDocument, variables: variables };
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
  query GetBalance($dateAfter: Date) {
    balance(dateAfter: $dateAfter) {
      total
      year
      month
      week
    }
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
 *      dateAfter: // value for 'dateAfter'
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
export const GetActivitiesStatisticDocument = gql`
  query GetActivitiesStatistic($dateAfter: Date, $dateBefore: Date) {
    activitiesStatistic(dateAfter: $dateAfter, dateBefore: $dateBefore) {
      ...ActivityBaseStatisticFragment
    }
  }
  ${ActivityBaseStatisticFragmentDoc}
`;

/**
 * __useGetActivitiesStatisticQuery__
 *
 * To run a query within a React component, call `useGetActivitiesStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesStatisticQuery({
 *   variables: {
 *      dateAfter: // value for 'dateAfter'
 *      dateBefore: // value for 'dateBefore'
 *   },
 * });
 */
export function useGetActivitiesStatisticQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActivitiesStatisticQuery,
    GetActivitiesStatisticQueryVariables
  >
) {
  return Apollo.useQuery<GetActivitiesStatisticQuery, GetActivitiesStatisticQueryVariables>(
    GetActivitiesStatisticDocument,
    baseOptions
  );
}
export function useGetActivitiesStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActivitiesStatisticQuery,
    GetActivitiesStatisticQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetActivitiesStatisticQuery, GetActivitiesStatisticQueryVariables>(
    GetActivitiesStatisticDocument,
    baseOptions
  );
}
export type GetActivitiesStatisticQueryHookResult = ReturnType<
  typeof useGetActivitiesStatisticQuery
>;
export type GetActivitiesStatisticLazyQueryHookResult = ReturnType<
  typeof useGetActivitiesStatisticLazyQuery
>;
export type GetActivitiesStatisticQueryResult = Apollo.QueryResult<
  GetActivitiesStatisticQuery,
  GetActivitiesStatisticQueryVariables
>;
export function refetchGetActivitiesStatisticQuery(
  variables?: GetActivitiesStatisticQueryVariables
) {
  return { query: GetActivitiesStatisticDocument, variables: variables };
}
export const GetActivityStatisticDocument = gql`
  query GetActivityStatistic($activityId: String!, $dateAfter: Date, $dateBefore: Date) {
    activityBaseStatistic(activityId: $activityId, dateAfter: $dateAfter, dateBefore: $dateBefore) {
      ...ActivityBaseStatisticFragment
    }
    activityAdvancedStatistic(
      activityId: $activityId
      dateAfter: $dateAfter
      dateBefore: $dateBefore
    ) {
      _id
      dateAfterKey
      activity @client {
        name
        emoji
        valueType
        isRequired
        isReverseColors
      }
      weekdays {
        weekday
        count
        valueSum
        averageValue
      }
      countPerValue {
        count
        value
      }
      entriesPerDateGroup {
        week {
          ...EntryPerDateFragment
        }
        month {
          ...EntryPerDateFragment
        }
      }
    }
  }
  ${ActivityBaseStatisticFragmentDoc}
  ${EntryPerDateFragmentDoc}
`;

/**
 * __useGetActivityStatisticQuery__
 *
 * To run a query within a React component, call `useGetActivityStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityStatisticQuery({
 *   variables: {
 *      activityId: // value for 'activityId'
 *      dateAfter: // value for 'dateAfter'
 *      dateBefore: // value for 'dateBefore'
 *   },
 * });
 */
export function useGetActivityStatisticQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetActivityStatisticQuery,
    GetActivityStatisticQueryVariables
  >
) {
  return Apollo.useQuery<GetActivityStatisticQuery, GetActivityStatisticQueryVariables>(
    GetActivityStatisticDocument,
    baseOptions
  );
}
export function useGetActivityStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActivityStatisticQuery,
    GetActivityStatisticQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetActivityStatisticQuery, GetActivityStatisticQueryVariables>(
    GetActivityStatisticDocument,
    baseOptions
  );
}
export type GetActivityStatisticQueryHookResult = ReturnType<typeof useGetActivityStatisticQuery>;
export type GetActivityStatisticLazyQueryHookResult = ReturnType<
  typeof useGetActivityStatisticLazyQuery
>;
export type GetActivityStatisticQueryResult = Apollo.QueryResult<
  GetActivityStatisticQuery,
  GetActivityStatisticQueryVariables
>;
export function refetchGetActivityStatisticQuery(variables?: GetActivityStatisticQueryVariables) {
  return { query: GetActivityStatisticDocument, variables: variables };
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
export const GetPushTokensDocument = gql`
  query GetPushTokens {
    pushTokens {
      _id
      token
      userId
    }
  }
`;

/**
 * __useGetPushTokensQuery__
 *
 * To run a query within a React component, call `useGetPushTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPushTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPushTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPushTokensQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPushTokensQuery, GetPushTokensQueryVariables>
) {
  return Apollo.useQuery<GetPushTokensQuery, GetPushTokensQueryVariables>(
    GetPushTokensDocument,
    baseOptions
  );
}
export function useGetPushTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPushTokensQuery, GetPushTokensQueryVariables>
) {
  return Apollo.useLazyQuery<GetPushTokensQuery, GetPushTokensQueryVariables>(
    GetPushTokensDocument,
    baseOptions
  );
}
export type GetPushTokensQueryHookResult = ReturnType<typeof useGetPushTokensQuery>;
export type GetPushTokensLazyQueryHookResult = ReturnType<typeof useGetPushTokensLazyQuery>;
export type GetPushTokensQueryResult = Apollo.QueryResult<
  GetPushTokensQuery,
  GetPushTokensQueryVariables
>;
export function refetchGetPushTokensQuery(variables?: GetPushTokensQueryVariables) {
  return { query: GetPushTokensDocument, variables: variables };
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
export const GetTodoistActivityDocument = gql`
  query GetTodoistActivity {
    todoistActivity @client {
      ...ActivityFragment
    }
  }
  ${ActivityFragmentDoc}
`;

/**
 * __useGetTodoistActivityQuery__
 *
 * To run a query within a React component, call `useGetTodoistActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoistActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoistActivityQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodoistActivityQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTodoistActivityQuery, GetTodoistActivityQueryVariables>
) {
  return Apollo.useQuery<GetTodoistActivityQuery, GetTodoistActivityQueryVariables>(
    GetTodoistActivityDocument,
    baseOptions
  );
}
export function useGetTodoistActivityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTodoistActivityQuery,
    GetTodoistActivityQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetTodoistActivityQuery, GetTodoistActivityQueryVariables>(
    GetTodoistActivityDocument,
    baseOptions
  );
}
export type GetTodoistActivityQueryHookResult = ReturnType<typeof useGetTodoistActivityQuery>;
export type GetTodoistActivityLazyQueryHookResult = ReturnType<
  typeof useGetTodoistActivityLazyQuery
>;
export type GetTodoistActivityQueryResult = Apollo.QueryResult<
  GetTodoistActivityQuery,
  GetTodoistActivityQueryVariables
>;
export function refetchGetTodoistActivityQuery(variables?: GetTodoistActivityQueryVariables) {
  return { query: GetTodoistActivityDocument, variables: variables };
}
export const GetPaymentUrlDocument = gql`
  query GetPaymentUrl($callbackUrl: String!) {
    paymentUrl(callbackUrl: $callbackUrl)
  }
`;

/**
 * __useGetPaymentUrlQuery__
 *
 * To run a query within a React component, call `useGetPaymentUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentUrlQuery({
 *   variables: {
 *      callbackUrl: // value for 'callbackUrl'
 *   },
 * });
 */
export function useGetPaymentUrlQuery(
  baseOptions: Apollo.QueryHookOptions<GetPaymentUrlQuery, GetPaymentUrlQueryVariables>
) {
  return Apollo.useQuery<GetPaymentUrlQuery, GetPaymentUrlQueryVariables>(
    GetPaymentUrlDocument,
    baseOptions
  );
}
export function useGetPaymentUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentUrlQuery, GetPaymentUrlQueryVariables>
) {
  return Apollo.useLazyQuery<GetPaymentUrlQuery, GetPaymentUrlQueryVariables>(
    GetPaymentUrlDocument,
    baseOptions
  );
}
export type GetPaymentUrlQueryHookResult = ReturnType<typeof useGetPaymentUrlQuery>;
export type GetPaymentUrlLazyQueryHookResult = ReturnType<typeof useGetPaymentUrlLazyQuery>;
export type GetPaymentUrlQueryResult = Apollo.QueryResult<
  GetPaymentUrlQuery,
  GetPaymentUrlQueryVariables
>;
export function refetchGetPaymentUrlQuery(variables?: GetPaymentUrlQueryVariables) {
  return { query: GetPaymentUrlDocument, variables: variables };
}
export const GetActiveSubscriptionDocument = gql`
  query GetActiveSubscription {
    activeSubscription {
      _id
      productId
      status
      platform
    }
  }
`;

/**
 * __useGetActiveSubscription__
 *
 * To run a query within a React component, call `useGetActiveSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveSubscription(
  baseOptions?: Apollo.QueryHookOptions<
    GetActiveSubscriptionQuery,
    GetActiveSubscriptionQueryVariables
  >
) {
  return Apollo.useQuery<GetActiveSubscriptionQuery, GetActiveSubscriptionQueryVariables>(
    GetActiveSubscriptionDocument,
    baseOptions
  );
}
export function useGetActiveSubscriptionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActiveSubscriptionQuery,
    GetActiveSubscriptionQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetActiveSubscriptionQuery, GetActiveSubscriptionQueryVariables>(
    GetActiveSubscriptionDocument,
    baseOptions
  );
}
export type GetActiveSubscriptionHookResult = ReturnType<typeof useGetActiveSubscription>;
export type GetActiveSubscriptionLazyQueryHookResult = ReturnType<
  typeof useGetActiveSubscriptionLazyQuery
>;
export type GetActiveSubscriptionQueryResult = Apollo.QueryResult<
  GetActiveSubscriptionQuery,
  GetActiveSubscriptionQueryVariables
>;
export function refetchGetActiveSubscription(variables?: GetActiveSubscriptionQueryVariables) {
  return { query: GetActiveSubscriptionDocument, variables: variables };
}
export const CancelSubscriptionDocument = gql`
  mutation CancelSubscription($_id: ID!) {
    cancelSubscription(_id: $_id)
  }
`;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<
  CancelSubscriptionMutation,
  CancelSubscriptionMutationVariables
>;

/**
 * __useCancelSubscription__
 *
 * To run a mutation, you first call `useCancelSubscription` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscription` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscription, { data, loading, error }] = useCancelSubscription({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useCancelSubscription(
  baseOptions?: Apollo.MutationHookOptions<
    CancelSubscriptionMutation,
    CancelSubscriptionMutationVariables
  >
) {
  return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(
    CancelSubscriptionDocument,
    baseOptions
  );
}
export type CancelSubscriptionHookResult = ReturnType<typeof useCancelSubscription>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  CancelSubscriptionMutation,
  CancelSubscriptionMutationVariables
>;
