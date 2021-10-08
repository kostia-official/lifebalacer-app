import React from 'react';
import {
  refetchGetActivitiesQuery,
  Activity,
  useArchiveActivityMutation,
  useRestoreActivityMutation
} from '../../generated/apollo';
import { Table } from '../../components/Table';
import { useApolloError } from '../../hooks/useApolloError';
import styled from 'styled-components';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useDeviceMediaQuery } from '../../hooks/useDeviceMediaQuery';
import _ from 'lodash';
import { useActivities } from '../../hooks/useActivities';
import { Greyscale } from '../../components/Greyscale';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { Emoji } from '../../components/Emoji';
import { EmptySpaceAboveFab } from '../../components/FabWrapper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/RestoreFromTrash';
import { AddActivityFab } from './components/AddActivityFab';

const ArchivedActivitiesWrapper = styled.div`
  padding-top: 10px;
`;

const TitleWrapper = styled.div`
  margin-top: -2px;
  margin-bottom: -2px;
`;

const Activities = () => {
  const { isMobile } = useDeviceMediaQuery();
  const { goForwardTo } = useNavigationHelpers();
  const { errorMessage, onError, errorTime } = useApolloError();

  const { activities, archivedActivities, allActivities } = useActivities({
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
    <ScreenWrapper
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
            icon: EditIcon,
            tooltip: 'Edit',
            onClick: (event, rowData) => {
              const activity = rowData as Activity;
              goForwardTo('ActivityEdit', { id: activity._id });
            }
          },
          {
            icon: DeleteIcon,
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
              icon: EditIcon,
              tooltip: 'Edit',
              onClick: (event, rowData) => {
                const activity = rowData as Activity;
                goForwardTo('ActivityEdit', { id: activity._id });
              }
            },
            {
              icon: RestoreIcon,
              tooltip: 'Restore',
              onClick: (event, rowData) => {
                const activity = rowData as Activity;
                return restoreActivity({ variables: { _id: activity._id } });
              }
            }
          ]}
        />
      </ArchivedActivitiesWrapper>

      <EmptySpaceAboveFab />

      <AddActivityFab />
    </ScreenWrapper>
  );
};

export default Activities;
