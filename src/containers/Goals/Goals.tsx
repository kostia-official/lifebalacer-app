import React from 'react';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { FabWrapper } from '../../components/FabWrapper';
import { FabButton } from '../../components/FabButton';
import AddIcon from '@material-ui/icons/Add';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { List, Paper, Collapse } from '@material-ui/core';
import { useGoals } from '../../hooks/apollo/useGoals';
import { GoalListItem } from './components/GoalListItem';
import { ExpandableCard } from '../../components/ExpandableCard';
import { TransitionGroup } from 'react-transition-group';
import { FlexBox } from '../../components/FlexBox';

const collapseTimeout = {
  enter: 400,
  exit: 300
};

const Goals = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const { errorMessage, errorTime, onError } = useApolloError();

  const { goals, archivedGoals } = useGoals({ onError });

  const goalsExists = !!goals?.length;

  return (
    <ScreenWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={!goals}
      unmountOnHide
    >
      <FlexBox column gap={12}>
        {goalsExists && (
          <Paper>
            <List disablePadding>
              <TransitionGroup>
                {goals?.map((goal, index) => (
                  <Collapse key={goal._id} timeout={collapseTimeout}>
                    <div>
                      <GoalListItem goal={goal} isLast={index === goals?.length - 1} />
                    </div>
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </Paper>
        )}

        {!!archivedGoals?.length && (
          <ExpandableCard
            title="Archived goals"
            defaultExpanded={!goalsExists}
            shouldExpand={!goalsExists}
          >
            <List disablePadding>
              <TransitionGroup>
                {archivedGoals?.map((goal, index) => (
                  <Collapse key={goal._id} timeout={collapseTimeout}>
                    <div>
                      <GoalListItem goal={goal} isLast={index === archivedGoals?.length - 1} />
                    </div>
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </ExpandableCard>
        )}
      </FlexBox>

      <FabWrapper>
        <FabButton icon={<AddIcon />} onClick={goForwardToCb('GoalCreate')} />
      </FabWrapper>
    </ScreenWrapper>
  );
};

export default Goals;
