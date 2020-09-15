import React, { Fragment } from 'react';
import {
  useGetAchievementsQuery,
  useOnAchievementCreatedSubscription,
  useDeleteAchievementMutation,
  refetchGetBalanceQuery,
  refetchGetAchievementsQuery,
  useGetProfileQuery
} from '../generated/apollo';
import { Table } from '../components/Table';
import { Spinner } from '../components/Spinner';
import { useApolloError } from '../hooks/useApolloError';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '@material-ui/core';
import { useTodoist } from '../hooks/useTodoist';
import styled from 'styled-components';
import { useDeviceDetect } from '../hooks/useIsDesktop';

const TodoistButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export const Achievements = () => {
  const { errorMessage, onError } = useApolloError();
  const { authorizeInTodoist } = useTodoist();
  const { isMobile } = useDeviceDetect();

  const {
    data: achievementsData,
    loading: isAchievementsLoading,
    refetch: refetchAchievements
  } = useGetAchievementsQuery({ onError });

  const { data: profileData, loading: isProfileLoading } = useGetProfileQuery({ onError });

  const [deleteAchievement] = useDeleteAchievementMutation({
    onError,
    refetchQueries: [refetchGetBalanceQuery(), refetchGetAchievementsQuery()]
  });

  useOnAchievementCreatedSubscription({
    onSubscriptionData: () => refetchAchievements()
  });

  if (isProfileLoading || isAchievementsLoading) return <Spinner />;

  return (
    <Fragment>
      <ErrorMessage errorMessage={errorMessage} />
      {profileData?.profile?.todoistUserId ? (
        <Table
          title="Achievements"
          columns={[
            { title: 'Name', field: 'name', type: 'string' },
            {
              title: 'Priority',
              field: 'priority',
              type: 'numeric',
              hidden: isMobile
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
              defaultSort: 'desc'
            }
          ]}
          data={achievementsData?.achievements || []}
          editable={{
            onRowDelete: async (oldData) => {
              return deleteAchievement({ variables: { _id: oldData._id } });
            }
          }}
        />
      ) : (
        <TodoistButtonContainer>
          <Button variant="contained" color="primary" onClick={authorizeInTodoist}>
            Connect Todoist tasks
          </Button>
        </TodoistButtonContainer>
      )}
    </Fragment>
  );
};
