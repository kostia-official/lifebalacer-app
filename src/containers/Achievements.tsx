import React, { Fragment } from 'react';
import {
  useGetAchievementsQuery,
  useOnAchievementCreatedSubscription,
  useDeleteAchievementMutation,
  refetchGetBalanceQuery,
  refetchGetAchievementsQuery
} from '../generated/apollo';
import { Table } from '../components/Table';
import { Spinner } from '../components/Spinner';
import { useApolloError } from '../hooks/errorMessage';
import { ErrorMessage } from '../components/ErrorMessage';

export const Achievements = () => {
  const { errorMessage, onError } = useApolloError();

  const { data, loading, refetch } = useGetAchievementsQuery({ onError });
  const [deleteAchievement] = useDeleteAchievementMutation({
    onError,
    refetchQueries: [refetchGetBalanceQuery(), refetchGetAchievementsQuery()]
  });

  useOnAchievementCreatedSubscription({
    onSubscriptionData: () => refetch()
  });

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <ErrorMessage errorMessage={errorMessage} />
      <Table
        title="Achievements"
        columns={[
          { title: 'Name', field: 'name' },
          {
            title: 'Priority',
            field: 'priority',
            type: 'numeric'
          },
          {
            title: 'Points',
            field: 'points',
            type: 'numeric'
          },
          {
            title: 'Created at',
            field: 'createdAt',
            type: 'datetime',
            width: '200px',
            defaultSort: 'desc'
          }
        ]}
        data={data?.achievements || []}
        editable={{
          onRowDelete: async (oldData) => {
            return deleteAchievement({ variables: { _id: oldData._id } });
          }
        }}
      />
    </Fragment>
  );
};
