import React, { Fragment } from 'react';
import {
  useGetRewardsQuery,
  useSpendRewardMutation,
  Reward,
  useCreateRewardMutation,
  useUpdateRewardByIdMutation,
  refetchGetRewardsQuery,
  refetchGetBalanceQuery,
  refetchGetSpendingsQuery,
  useDeleteRewardMutation
} from '../generated/apollo';
import { Table } from '../components/Table';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useApolloError } from '../hooks/errorMessage';

export const Rewards = () => {
  const { errorMessage, onError } = useApolloError();

  const { data, loading } = useGetRewardsQuery({ onError });
  const [spendReward] = useSpendRewardMutation({
    onError,
    refetchQueries: [refetchGetBalanceQuery(), refetchGetSpendingsQuery()]
  });
  const [createReward] = useCreateRewardMutation({
    onError,
    refetchQueries: [refetchGetRewardsQuery()]
  });
  const [updateReward] = useUpdateRewardByIdMutation({ onError });
  const [deleteReward] = useDeleteRewardMutation({
    onError,
    refetchQueries: [refetchGetRewardsQuery()]
  });

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <ErrorMessage errorMessage={errorMessage} />
      <Table
        title="Rewards"
        columns={[
          { title: 'Name', field: 'name', width: 180, editable: 'always' },
          {
            title: 'Points',
            field: 'points',
            type: 'numeric',
            defaultSort: 'desc',
            editable: 'always'
          }
        ]}
        data={data?.rewards || []}
        actions={[
          {
            icon: 'add_task',
            tooltip: 'Spend',
            onClick: (_, rowData) => {
              const reward = rowData as Reward;
              spendReward({
                variables: { rewardId: reward._id }
              });
            }
          }
        ]}
        editable={{
          onRowAdd: async (newData) => {
            return createReward({
              variables: {
                data: {
                  name: newData.name,
                  points: newData.points
                }
              }
            });
          },
          onRowUpdate: async (newData) => {
            return updateReward({
              variables: {
                _id: newData._id,
                data: {
                  name: newData.name,
                  points: newData.points
                }
              }
            });
          },
          onRowDelete: async (oldData) => {
            return deleteReward({ variables: { _id: oldData._id } });
          }
        }}
      />
    </Fragment>
  );
};
