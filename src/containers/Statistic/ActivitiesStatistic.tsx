import React, { useMemo } from 'react';
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
  align-items: center;
`;

const ActivitiesStatistic: React.FC = React.memo(() => {
  const { errorMessage, onError, errorTime } = useApolloError();
  const { goForwardToCb } = useHistoryNavigation();

  const { getActivityById, activities } = useActivities({ onError, fetchPolicy: 'cache-first' });
  const { data: statisticData } = useGetActivitiesStatisticQuery({ onError });
  const statistic = statisticData?.activitiesStatistic;

  return useMemo(
    () => (
      <PageWrapper
        errorMessage={errorMessage}
        errorTime={errorTime}
        isLoading={!statisticData || !activities}
      >
        <Paper>
          <List disablePadding>
            {statistic?.map((stat) => {
              const activity = getActivityById(stat._id);

              const secondaryText = `Streak with activity: ${stat.streakWith.count}. Streak without: ${stat.streakWithout.count}`;

              return (
                <ListItem
                  key={stat._id}
                  onClick={goForwardToCb(`/statistic/activity/${stat._id}`)}
                  button
                  divider
                >
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
    ),
    [activities, errorMessage, errorTime, getActivityById, goForwardToCb, statistic, statisticData]
  );
});

export default ActivitiesStatistic;
