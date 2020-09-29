import React, { useCallback } from 'react';
import {
  useGetActivitiesQuery,
  useDeleteActivityMutation,
  refetchGetActivitiesQuery,
  refetchGetEntriesQuery,
  Activity
} from '../generated/apollo';
import { Table } from '../components/Table';
import { useApolloError } from '../hooks/useApolloError';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AddFabButton } from '../components/AddFabButton';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '@material-ui/core';
import { useTodoist } from '../hooks/useTodoist';
import { useGetTodoistActivity } from '../hooks/useGetTodoistActivity';
import { useDeviceDetect } from '../hooks/useDeviceDetect';

const AddFabButtonWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

const ConnectTodoistButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export const Activities = () => {
  const { isMobile } = useDeviceDetect();
  const history = useHistory();
  const { errorMessage, onError, errorTime } = useApolloError();
  const { authorizeInTodoist } = useTodoist();

  const { todoistActivity } = useGetTodoistActivity({ onError });
  const { data, loading } = useGetActivitiesQuery({ onError });
  const [deleteActivity] = useDeleteActivityMutation({
    onError,
    refetchQueries: [refetchGetActivitiesQuery(), refetchGetEntriesQuery()]
  });

  const onActivityCreateClick = useCallback(() => {
    history.push('/activities/create');
  }, [history]);

  const activities =
    data?.activities.map((activity) => {
      return {
        ...activity,
        name: `${activity.emoji}  ${activity.name}`
      };
    }) || [];

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={loading}>
      <Table
        title="Activities"
        columns={[
          {
            title: 'Name',
            field: 'name'
          },
          {
            title: 'Value type',
            field: 'valueType',
            hidden: isMobile
          },
          {
            title: 'Points',
            field: 'points',
            defaultSort: 'desc'
          }
        ]}
        data={activities}
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

      {!todoistActivity && (
        <ConnectTodoistButtonWrapper>
          <Button variant="contained" color="primary" onClick={authorizeInTodoist}>
            Connect Todoist
          </Button>
        </ConnectTodoistButtonWrapper>
      )}

      <AddFabButtonWrapper>
        <AddFabButton onClick={onActivityCreateClick} />
      </AddFabButtonWrapper>
    </PageWrapper>
  );
};
