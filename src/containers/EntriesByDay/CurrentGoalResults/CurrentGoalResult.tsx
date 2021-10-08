import React from 'react';
import { GetCurrentGoalsResultsQuery } from '../../../generated/apollo';
import { GoalSteps } from '../../../components/GoalSteps/GoalSteps';
import { Emoji } from '../../../components/Emoji';
import styled from 'styled-components';
import { Points } from '../../../components/Points';
import { Box } from '@material-ui/core';

export interface CurrentGoalResultProps {
  goalResult: GetCurrentGoalsResultsQuery['currentGoalsResults'][number];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CurrentGoalResult: React.FC<CurrentGoalResultProps> = ({ goalResult }) => {
  const {
    goal: { timesPerDuration, conditionType, activity },
    status,
    entries,
    points
  } = goalResult;

  return (
    <Wrapper>
      <div>
        <Emoji>{activity.emoji}</Emoji>
      </div>

      <GoalSteps
        conditionType={conditionType}
        timesPerDuration={timesPerDuration}
        entriesCount={entries.length}
        status={status}
      />

      {points !== 0 && (
        <Box marginLeft={0.6}>
          <Points points={points} pointsSize={16} coinSize={17} />
        </Box>
      )}
    </Wrapper>
  );
};
