import React, { useMemo } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { List, Paper, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useGetActivitiesStatisticQuery } from '../../generated/apollo';
import { Emoji } from '../../components/Emoji';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import styled from 'styled-components';
import { pluralLabel } from '../../helpers/pluralarize';

const PrimaryText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActivitiesStatistic: React.FC = React.memo(() => {
  const { errorMessage, onError, errorTime } = useApolloError();
  const { goForwardToCb } = useNavigationHelpers();

  const { data: statisticData } = useGetActivitiesStatisticQuery({ onError });

  const statistic = statisticData?.activitiesStatistic;

  return useMemo(
    () => (
      <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!statisticData}>
        <Paper>
          <List disablePadding>
            {statistic?.map((stat, index) => {
              const isLast = index === statistic?.length - 1;

              const primaryRightText = stat.perWeek
                ? `x${stat.perWeek} per week`
                : pluralLabel('entry', stat.total);
              const secondaryText = `Streak with activity: ${stat.streakWith.count}. Streak without: ${stat.streakWithout.count}`;

              return (
                <ListItem
                  key={stat._id}
                  onClick={goForwardToCb(`ActivityStatistic`, { id: stat._id })}
                  button
                  divider={!isLast}
                >
                  <ListItemText
                    primary={
                      <PrimaryText>
                        <Typography variant="subtitle1">
                          <Emoji>{stat.activity?.emoji}</Emoji> {stat.activity?.name}
                        </Typography>
                        <Typography>{primaryRightText}</Typography>
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
    [errorMessage, errorTime, goForwardToCb, statistic, statisticData]
  );
});

export default ActivitiesStatistic;
