import React, { Fragment } from 'react';
import {
  useGetActivitiesQuery,
  useDeleteActivityMutation,
  refetchGetActivitiesQuery,
  refetchGetEntriesQuery,
  Activity
} from '../generated/apollo';
import { Table } from '../components/Table';
import { Spinner } from '../components/Spinner';
import { useApolloError } from '../hooks/useApolloError';
import { ErrorMessage } from '../components/ErrorMessage';
import { useHistory } from 'react-router-dom';

export const Activities = () => {
  const history = useHistory();
  const { errorMessage, onError, errorTime } = useApolloError();

  const { data, loading } = useGetActivitiesQuery({ onError });
  const [deleteActivity] = useDeleteActivityMutation({
    onError,
    refetchQueries: [refetchGetActivitiesQuery(), refetchGetEntriesQuery()]
  });

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime}/>
      <Table
        title="Activities"
        columns={[
          {
            title: 'Name',
            field: 'name'
          },
          {
            title: 'Value type',
            field: 'valueType'
          },
          {
            title: 'Points',
            field: 'points'
          }
        ]}
        data={data?.activities || []}
        actions={[
          {
            icon: 'edit',
            onClick: (event, rowData) => {
              const activity = rowData as Activity;
              history.push(`/activities/edit/${activity._id}`);
            }
          }
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            return deleteActivity({ variables: { _id: oldData._id } });
          }
        }}
      />
    </Fragment>
  );
};
