import React, { Fragment } from 'react';
import {
  useGetSpendingsQuery,
  refetchGetBalanceQuery,
  refetchGetSpendingsQuery,
  useDeleteSpendingMutation
} from '../generated/apollo';
import { Table } from '../components/Table';
import { Spinner } from '../components/Spinner';
import { useApolloError } from '../hooks/errorMessage';
import { ErrorMessage } from '../components/ErrorMessage';

export const Spendings = () => {
  const { errorMessage, onError } = useApolloError();

  const { data, loading } = useGetSpendingsQuery({ onError });
  const [deleteSpending] = useDeleteSpendingMutation({
    onError,
    refetchQueries: [refetchGetBalanceQuery(), refetchGetSpendingsQuery()]
  });

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <ErrorMessage errorMessage={errorMessage} />
      <Table
        title="Spendings"
        columns={[
          {
            title: 'Reward',
            field: 'reward.name'
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
            width: 200,
            defaultSort: 'desc'
          }
        ]}
        data={data?.spendings || []}
        editable={{
          onRowDelete: async (oldData) => {
            return deleteSpending({ variables: { _id: oldData._id } });
          }
        }}
      />
    </Fragment>
  );
};
