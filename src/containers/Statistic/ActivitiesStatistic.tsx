import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { List, Paper, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useGetActivitiesStatisticQuery } from '../../generated/apollo';
import { useActivities } from '../../hooks/useActivities';
import { Emoji } from '../../components/Emoji';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import styled from 'styled-components';

const PrimaryText = styled.span`
  display: flex;
  justify-content: space-between;
`;

export const ActivitiesStatistic: React.FC = () => {
  const { errorMessage, onError, errorTime } = useApolloError();
  const { goForwardToCb } = useHistoryNavigation();

  const { getActivityById, activities } = useActivities({ onError });
  const { data: statisticData } = useGetActivitiesStatisticQuery({ onError });
  const statistic = statisticData?.activitiesStatistic;

  return (
    <PageWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={!statisticData || !activities}
    >
      <Paper>
        <List>
          {statistic?.map((stat) => {
            const activity = getActivityById(stat._id);

            const secondaryText = `Streak with: ${stat.streakWith.count}. Streak without: ${stat.streakWithout.count}`;

            return (
              <ListItem onClick={goForwardToCb(`/statistic/activity/${stat._id}`)} button>
                <ListItemText
                  primary={
                    <PrimaryText>
                      <Typography variant="subtitle1">
                        <Emoji>{activity?.emoji}</Emoji> {activity?.name}
                      </Typography>
                      <Typography>x{stat.perWeek} per week</Typography>
                    </PrimaryText>
                  }
                  secondary={secondaryText}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </PageWrapper>
  );
};
