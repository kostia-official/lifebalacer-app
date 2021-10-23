import React, { useMemo } from 'react';
import { GoalResultFragment } from '../../../generated/apollo';
import { Card, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { FlexBox } from '../../../components/FlexBox';
import { GoalResult } from './GoalResult';
import _ from 'lodash';

export interface GoalsResultsGroupCardProps {
  dateRange: string;
  goalsResults: GoalResultFragment[];
}

const CardStyled = styled(Card)`
  padding: 12px 16px;
  margin-bottom: 8px;

  :last-child {
    margin-bottom: 0;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const GoalsResultsGroupCard: React.FC<GoalsResultsGroupCardProps> = ({
  goalsResults,
  dateRange
}) => {
  const sortedGoalsResults = useMemo(() => {
    return _.sortBy(goalsResults, ['goal.activity.name']);
  }, [goalsResults]);

  return (
    <CardStyled>
      <HeaderWrapper>
        <Typography>{dateRange}</Typography>
      </HeaderWrapper>

      <FlexBox column>
        {sortedGoalsResults.map((goalResult) => (
          <GoalResult key={goalResult._id} goalResult={goalResult} />
        ))}
      </FlexBox>
    </CardStyled>
  );
};
