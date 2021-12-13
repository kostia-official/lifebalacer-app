import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ConditionType, GoalResultStatus, GoalResultFragment } from '../../generated/apollo';
import { MainColors, WhiteColor, BackgroundColor } from '../../common/colors';
import { DoneIcon } from '../../assets/done';
import { ReactComponent as FailIcon } from '../../assets/failed.svg';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { toLuxon, getTimezone } from '../../helpers/date';
import { getGoalDurationDates } from '../../helpers/goal';

export interface GoalStepsProps {
  goalResult: GoalResultFragment;
}

enum GoalEmptyStepStatus {
  Empty = 'Empty',
  EmptyCompleted = 'EmptyCompleted',
  EmptyFailed = 'EmptyFailed'
}

type GoalStepStatus = GoalResultStatus | GoalEmptyStepStatus;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompletedStep = styled(DoneIcon)`
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 50%;
  background-color: ${MainColors.Primary};
  color: ${BackgroundColor.Light};
`;

const PendingStep = styled(DoubleArrowIcon)`
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 50%;
  background-color: ${MainColors.Yellow};
  color: ${BackgroundColor.Light};
`;

const FailedStep = styled(FailIcon)`
  width: 20px;
  height: 20px;
  padding: 4px;
  border-radius: 50%;
  background-color: ${MainColors.Secondary};
  color: ${BackgroundColor.Light};
`;

const EmptyFailedStep = styled(FailIcon)`
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 3px solid ${MainColors.White};
  border-radius: 50%;
  color: ${WhiteColor.Dim};
`;

const EmptyCompletedStep = styled(DoneIcon)`
  width: 20px;
  height: 20px;
  padding: 1px;
  border: 3px solid ${MainColors.White};
  border-radius: 50%;
  color: ${WhiteColor.Dim};
`;

const EmptyStep = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid ${MainColors.White};
`;

const stepConnectorColorMap: Record<GoalStepStatus, string> = {
  [GoalResultStatus.Completed]: `${MainColors.Primary}99`,
  [GoalResultStatus.Failed]: `${MainColors.Secondary}99`,
  [GoalResultStatus.Pending]: `${MainColors.Yellow}99`,
  [GoalEmptyStepStatus.Empty]: WhiteColor.Dim,
  [GoalEmptyStepStatus.EmptyCompleted]: WhiteColor.Dim,
  [GoalEmptyStepStatus.EmptyFailed]: WhiteColor.Dim
};

const Connector = styled.div<{ $statusBefore: GoalStepStatus; $statusAfter: GoalStepStatus }>`
  width: 8px;
  height: 4px;
  background-image: linear-gradient(
    to right,
    ${(p) => `${stepConnectorColorMap[p.$statusBefore]},${stepConnectorColorMap[p.$statusAfter]}`}
  );
`;

export const GoalSteps: React.FC<GoalStepsProps> = ({ goalResult }) => {
  const {
    goal: { conditionType, durationType },
    status,
    entries,
    timesPerDuration,
    recordedAt
  } = goalResult;

  const isInCurrentDuration = useMemo(() => {
    const currentDuration = getGoalDurationDates({
      durationType,
      recordedAt: new Date().toISOString(),
      timezone: getTimezone()
    });
    const recordedAtDateTime = toLuxon(recordedAt);

    return (
      currentDuration.startDateTime <= recordedAtDateTime &&
      recordedAtDateTime <= currentDuration.endDateTime
    );
  }, [durationType, recordedAt]);

  const entriesCount = entries.length;

  let total = Math.max(timesPerDuration, entriesCount);

  if (
    isInCurrentDuration &&
    conditionType === ConditionType.LessOrEqual &&
    status !== GoalResultStatus.Failed
  ) {
    total += 1;
  }

  const getStepStatus = useCallback(
    (stepIndex: number): GoalStepStatus => {
      const stepNumber = stepIndex + 1;

      if (
        isInCurrentDuration &&
        conditionType === ConditionType.LessOrEqual &&
        stepNumber === timesPerDuration + 1 &&
        entriesCount < timesPerDuration + 1
      ) {
        return GoalEmptyStepStatus.EmptyFailed;
      }

      if (
        isInCurrentDuration &&
        conditionType === ConditionType.GreaterOrEqual &&
        stepNumber === timesPerDuration &&
        entriesCount < timesPerDuration
      ) {
        return GoalEmptyStepStatus.EmptyCompleted;
      }

      return stepNumber > entriesCount ? GoalEmptyStepStatus.Empty : status;
    },
    [conditionType, entriesCount, isInCurrentDuration, status, timesPerDuration]
  );

  const getStepComponent = useCallback((status: GoalStepStatus) => {
    switch (status) {
      case GoalResultStatus.Completed:
        return <CompletedStep />;
      case GoalResultStatus.Pending:
        return <PendingStep />;
      case GoalResultStatus.Failed:
        return <FailedStep />;
      case GoalEmptyStepStatus.EmptyFailed:
        return <EmptyFailedStep />;
      case GoalEmptyStepStatus.EmptyCompleted:
        return <EmptyCompletedStep />;
      default:
        return <EmptyStep />;
    }
  }, []);

  return (
    <Wrapper>
      {_.times(total, (index) => {
        const isLast = index === total - 1;
        const stepStatus = getStepStatus(index);
        const nextStepStatus = getStepStatus(index + 1);

        return (
          <Wrapper key={index}>
            {getStepComponent(stepStatus)}
            {!isLast && <Connector $statusBefore={stepStatus} $statusAfter={nextStepStatus} />}
          </Wrapper>
        );
      })}
    </Wrapper>
  );
};
