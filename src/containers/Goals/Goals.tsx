import React from 'react';
import { useApolloError } from '../../hooks/useApolloError';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { FabWrapper } from '../../components/FabWrapper';
import { FabButton } from '../../components/FabButton';
import AddIcon from '@material-ui/icons/Add';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { useGetGoalsQuery } from '../../generated/apollo';
import { Emoji } from '../../components/Emoji';
import { conditionTypeTextMap, durationTypeTextMap } from '../../common/goals';

const Goals = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const { errorMessage, errorTime, onError } = useApolloError();

  const { data } = useGetGoalsQuery({ onError });
  const goals = data?.goals;

  return (
    <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!goals}>
      <Paper>
        <List disablePadding>
          {goals?.map((goal, index) => {
            const isLast = index === goals?.length - 1;

            const additionalText = `${conditionTypeTextMap[goal.conditionType]} ${
              goal.timesPerDuration
            } per ${durationTypeTextMap[goal.durationType]}`;

            return (
              <ListItem
                key={goal._id}
                onClick={goForwardToCb(`GoalEdit`, { id: goal._id })}
                button
                divider={!isLast}
              >
                <ListItemText
                  primary={
                    <span>
                      <Emoji>{goal.activity?.emoji}</Emoji> {goal.activity.name}
                    </span>
                  }
                  secondary={additionalText}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <FabWrapper>
        <FabButton icon={<AddIcon />} onClick={goForwardToCb('GoalCreate')} />
      </FabWrapper>
    </ScreenWrapper>
  );
};

export default Goals;
