import { Typography, Card } from '@material-ui/core';
import React from 'react';
import { useGetCurrentGoalsResultsQuery } from '../../../generated/apollo';
import { CurrentGoalResult } from './CurrentGoalResult';
import styled from 'styled-components';
import { FlexBox } from '../../../components/FlexBox';

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 16px;
`;

export const CurrentGoalsResults: React.FC = () => {
  const { data } = useGetCurrentGoalsResultsQuery();
  const goalsResults = data?.currentGoalsResults;

  if (!goalsResults?.length) return null;

  return (
    <Wrapper>
      <Typography variant="subtitle2" color="textSecondary">
        Goals:
      </Typography>

      <FlexBox column gap={4}>
        {goalsResults?.map((goalResult) => (
          <CurrentGoalResult key={goalResult._id} goalResult={goalResult} />
        ))}
      </FlexBox>
    </Wrapper>
  );
};
