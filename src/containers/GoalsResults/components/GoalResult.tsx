import React from 'react';
import { GoalResultFragment } from '../../../generated/apollo';
import { GoalSteps } from '../../../components/GoalSteps/GoalSteps';
import { Emoji } from '../../../components/Emoji';
import styled from 'styled-components';
import { Points } from '../../../components/Points';
import { Box } from '@material-ui/core';

export interface CurrentGoalResultProps {
  goalResult: GoalResultFragment;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
`;

export const GoalResult: React.FC<CurrentGoalResultProps> = ({ goalResult }) => {
  const {
    goal: { activity },
    points
  } = goalResult;

  return (
    <Wrapper>
      <div>
        <Emoji>{activity.emoji}</Emoji>
      </div>

      <GoalSteps goalResult={goalResult} />

      {points !== 0 && (
        <Box marginLeft={0.6}>
          <Points points={points} pointsSize={16} coinSize={17} />
        </Box>
      )}
    </Wrapper>
  );
};
