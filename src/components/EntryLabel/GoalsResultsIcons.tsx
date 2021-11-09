import React from 'react';
import { EntriesByDayResultFragment, GoalResultStatus } from '../../generated/apollo';
import { useMountedState } from 'react-use';
import { Zoom } from '@material-ui/core';
import { Icon } from '@iconify/react';
import goalIcon from '@iconify/icons-fluent/target-arrow-20-filled';

export interface GoalsResultsIconsProps {
  goalResults?: EntriesByDayResultFragment['entries'][0]['goalResults'];
}

export const GoalsResultsIcons: React.FC<GoalsResultsIconsProps> = ({ goalResults }) => {
  const isMounted = useMountedState();

  return (
    <>
      {goalResults?.map(({ status }) =>
        status === GoalResultStatus.Completed ? (
          <Zoom in appear={isMounted()}>
            <Icon icon={goalIcon} width={16} />
          </Zoom>
        ) : null
      )}
    </>
  );
};
