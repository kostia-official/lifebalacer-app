import React, { useMemo } from 'react';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { List, Paper, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useGetActivitiesStatisticQuery } from '../../generated/apollo';
import { Emoji } from '../../components/Emoji';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import styled from 'styled-components';
import { pluralLabel } from '../../helpers/pluralarize';
import { FlexBox } from '../../components/FlexBox';

const PrimaryText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Statistic: React.FC = React.memo(() => {
  const { errorMessage, onError, errorTime } = useApolloError();
  const { goForwardToCb } = useNavigationHelpers();

  const { data: statisticData } = useGetActivitiesStatisticQuery({ onError });

  const statistic = statisticData?.activitiesStatistic;

  return useMemo(
    () => (
      <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!statisticData}>
        <FlexBox column gap={8}>
          {/*<Paper>*/}
          {/*  <List disablePadding>*/}
          {/*    <ListItem onClick={goForwardToCb(`PointsStatistic`)} button>*/}
          {/*      <ListItemText*/}
          {/*        primary={*/}
          {/*          <FlexBox row gap={8} centerY>*/}
          {/*            <Coin size={16} />*/}

          {/*            <Typography variant="subtitle1">Balance Points</Typography>*/}
          {/*          </FlexBox>*/}
          {/*        }*/}
          {/*      />*/}
          {/*    </ListItem>*/}
          {/*  </List>*/}
          {/*</Paper>*/}

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
        </FlexBox>
      </ScreenWrapper>
    ),
    [errorMessage, errorTime, goForwardToCb, statistic, statisticData]
  );
});

export default Statistic;
