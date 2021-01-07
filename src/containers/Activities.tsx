import React from 'react';
import {
  refetchGetActivitiesQuery,
  Activity,
  useArchiveActivityMutation,
  useRestoreActivityMutation
} from '../generated/apollo';
import { Table } from '../components/Table';
import { useApolloError } from '../hooks/useApolloError';
import styled from 'styled-components';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '@material-ui/core';
import { useTodoist } from '../hooks/useTodoist';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import _ from 'lodash';
import { useActivities } from '../hooks/useActivities';
import { EmptySpaceUnderFab, FabButton } from '../components/FabButton';
import { Greyscale } from '../components/Greyscale';
import { useHistoryNavigation } from '../hooks/useHistoryNavigation';
import { Emoji } from '../components/Emoji';

const ConnectTodoistButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const ArchivedActivitiesWrapper = styled.div`
  padding-top: 10px;
`;

const TitleWrapper = styled.div`
  margin-top: -2px;
  margin-bottom: -2px;
`;

const Activities = () => {
  const { isMobile } = useDeviceDetect();
  const { goForwardToCb, goForwardTo } = useHistoryNavigation();
  const { errorMessage, onError, errorTime } = useApolloError();
  const { authorizeInTodoist } = useTodoist();

  const { todoistActivity, activities, archivedActivities, allActivities } = useActivities({
    onError
  });
  const [archiveActivity] = useArchiveActivityMutation({
    onError,
    refetchQueries: [refetchGetActivitiesQuery()]
  });
  const [restoreActivity] = useRestoreActivityMutation({
    onError,
    refetchQueries: [refetchGetActivitiesQuery()]
  });

  return (
    <PageWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={_.isNil(allActivities)}
    >
      <Table
        title="Activities"
        columns={[
          {
            title: 'Name',
            render: (rowData) => (
              <TitleWrapper>
                <Emoji>{rowData?.emoji}</Emoji> {rowData.name}
              </TitleWrapper>
            )
          },
          {
            title: 'Value type',
            field: 'valueType',
            hidden: isMobile
          },
          {
            title: 'Points',
            field: 'points',
            width: 30,
            defaultSort: 'desc'
          }
        ]}
        data={activities!}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => {
              const activity = rowData as Activity;
              goForwardTo(`/activities/edit/${activity._id}`);
            }
          },
          {
            icon: 'delete',
            tooltip: 'Archive',
            onClick: (event, rowData) => {
              const activity = rowData as Activity;
              return archiveActivity({ variables: { _id: activity._id } });
            }
          }
        ]}
      />

      <ArchivedActivitiesWrapper>
        <Table
          title="Archived activities"
          columns={[
            {
              title: 'Name',
              render: (rowData) => (
                <Greyscale>
                  <TitleWrapper>
                    <Emoji>{rowData?.emoji}</Emoji> {rowData.name}
                  </TitleWrapper>
                </Greyscale>
              )
            },
            {
              title: 'Value type',
              field: 'valueType',
              hidden: isMobile
            },
            {
              title: 'Points',
              field: 'points',
              defaultSort: 'desc',
              width: 30
            }
          ]}
          data={archivedActivities!}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => {
                const activity = rowData as Activity;
                goForwardTo(`/activities/edit/${activity._id}`);
              }
            },
            {
              icon: 'restore_from_trash',
              tooltip: 'Restore',
              onClick: (event, rowData) => {
                const activity = rowData as Activity;
                return restoreActivity({ variables: { _id: activity._id } });
              }
            }
          ]}
        />
      </ArchivedActivitiesWrapper>

      {!todoistActivity && (
        <ConnectTodoistButtonWrapper>
          <Button variant="contained" color="primary" onClick={authorizeInTodoist}>
            Connect Todoist
          </Button>
        </ConnectTodoistButtonWrapper>
      )}

      <EmptySpaceUnderFab />

      <FabButton onClick={goForwardToCb('/activities/create')} />
    </PageWrapper>
  );
};

export default Activities;
