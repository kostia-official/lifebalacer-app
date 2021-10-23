import { Typography, Card, CardActionArea } from '@material-ui/core';
import React from 'react';
import { useGetCurrentGoalsResultsQuery } from '../../generated/apollo';
import { GoalResult } from '../GoalsResults/components/GoalResult';
import styled from 'styled-components';
import { FlexBox } from '../../components/FlexBox';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { useDeleteFieldFromCache } from '../../hooks/apollo/useDeleteFieldFromCache';
import { useWatchChanges } from '../../hooks/useWatchChange';

const CardActionAreaStyled = styled(CardActionArea)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 12px 16px;
`;

export const CurrentGoalsResults: React.FC = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const deleteFieldFromCache = useDeleteFieldFromCache();

  const { data, previousData } = useGetCurrentGoalsResultsQuery();
  const goalsResults = data?.currentGoalsResults;

  useWatchChanges(() => {
    data?.currentGoalsResults.forEach((goalResult) => {
      const prevGoalResult = previousData?.currentGoalsResults.find(
        ({ _id }) => _id === goalResult._id
      );
      if (!prevGoalResult) return;

      if (goalResult.points !== prevGoalResult.points) {
        deleteFieldFromCache('balance');
      }
    });
  }, [data, previousData]);

  if (!goalsResults?.length) return null;

  return (
    <Card onClick={goForwardToCb('GoalsResults')}>
      <CardActionAreaStyled>
        <Typography variant="subtitle2" color="textSecondary">
          Goals:
        </Typography>

        <FlexBox column>
          {goalsResults?.map((goalResult) => (
            <GoalResult key={goalResult._id} goalResult={goalResult} />
          ))}
        </FlexBox>
      </CardActionAreaStyled>
    </Card>
  );
};
