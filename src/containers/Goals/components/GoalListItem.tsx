import React from 'react';
import {
  GoalFragment,
  useArchiveGoalMutation,
  useRestoreGoalMutation
} from '../../../generated/apollo';
import { conditionTypeTextMap, durationTypeTextMap } from '../../../common/goals';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon
} from '@material-ui/core';
import { Emoji } from '../../../components/Emoji';
import { useNavigationHelpers } from '../../../hooks/useNavigationHelpers';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAnchorEl } from '../../../hooks/useAnchorEl';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/RestoreFromTrash';
import styled from 'styled-components';
import { gql, ApolloCache } from '@apollo/client';
import { Greyscale } from '../../../components/Greyscale';
import { useDeleteFieldFromCache } from '../../../hooks/apollo/useDeleteFieldFromCache';

export interface GoalListItemProps {
  goal: GoalFragment;
  isLast: boolean;
}

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 34px;
`;

export const GoalListItem: React.FC<GoalListItemProps> = ({ goal, isLast }) => {
  const { goForwardToCb } = useNavigationHelpers();
  const { anchorEl, open, handleClick, handleClose } = useAnchorEl();

  const { _id, conditionType, timesPerDuration, durationType, isArchived } = goal;

  const updateGoalIsArchived = (isArchived: boolean) => (cache: ApolloCache<unknown>) => {
    cache.writeFragment({
      id: `Goal:${_id}`,
      fragment: gql`
        fragment GoalIsArchived on Goal {
          isArchived
        }
      `,
      data: { isArchived }
    });
  };

  const deleteFromCache = useDeleteFieldFromCache();

  const commonMutationOptions = {
    onCompleted: () => {
      deleteFromCache('currentGoalsResults');
      deleteFromCache('goalsResults');
    }
  };

  const [archiveGoalMutation] = useArchiveGoalMutation({
    ...commonMutationOptions,
    update: updateGoalIsArchived(true)
  });

  const [restoreGoalMutation] = useRestoreGoalMutation({
    ...commonMutationOptions,
    update: updateGoalIsArchived(false)
  });

  const additionalText = `${conditionTypeTextMap[conditionType]} ${timesPerDuration} per ${durationTypeTextMap[durationType]}`;

  return (
    <ListItem
      key={goal._id}
      onClick={goForwardToCb(`GoalEdit`, { id: _id })}
      button
      divider={!isLast}
    >
      <ListItemText
        primary={
          <Greyscale isEnable={isArchived}>
            <Emoji>{goal.activity?.emoji}</Emoji> {goal.activity.name}
          </Greyscale>
        }
        secondary={additionalText}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="more" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {isArchived ? (
            <MenuItem
              onClick={() => {
                handleClose();
                restoreGoalMutation({ variables: { _id } });
              }}
            >
              <StyledListItemIcon>
                <RestoreIcon fontSize="small" />
              </StyledListItemIcon>
              <ListItemText primary="Restore" />
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                handleClose();
                archiveGoalMutation({ variables: { _id } });
              }}
            >
              <StyledListItemIcon>
                <DeleteIcon fontSize="small" />
              </StyledListItemIcon>
              <ListItemText primary="Archive" />
            </MenuItem>
          )}
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
