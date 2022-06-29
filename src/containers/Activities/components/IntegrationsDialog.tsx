import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip
} from '@material-ui/core';
import React from 'react';
import { makeModal } from '../../../hooks/makeModal';
import { Icon } from '@iconify/react';
import todoistIconColor from '@iconify/icons-logos/todoist-icon';
import googleFit from '@iconify/icons-logos/google-fit';
import styled from 'styled-components';
import { useTodoist } from '../../../hooks/apollo/useTodoist';
import { useActivities } from '../../../hooks/apollo/useActivities';
import { Spacer } from '../../../components/Spacer';

export const useAddIntegrationModal = makeModal();

const IconWrapper = styled(Avatar)`
  background-color: #75757540;
`;

export const AddIntegrationModal: React.FC = () => {
  const { open, closeModal } = useAddIntegrationModal();
  const { authorizeInTodoist } = useTodoist();
  const { todoistActivity } = useActivities();

  const isTodoistAdded = !!todoistActivity;

  return (
    <Dialog onClose={closeModal} open={open}>
      <DialogTitle>Integrations</DialogTitle>

      <List>
        <ListItem button onClick={() => authorizeInTodoist()} disabled={isTodoistAdded}>
          <ListItemAvatar>
            <IconWrapper>
              <Icon icon={todoistIconColor} />
            </IconWrapper>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Spacer flex row spacingX={8}>
                <span>Todoist</span>
                {isTodoistAdded && <Chip size="small" label="Added" />}
              </Spacer>
            }
            secondary="Earn points for completed tasks"
          />
        </ListItem>

        <ListItem button disabled>
          <ListItemAvatar>
            <IconWrapper>
              <Icon icon={googleFit} />
            </IconWrapper>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Spacer flex row spacingX={8}>
                <span>Google Fit</span>
                <Chip size="small" label="Coming Soon" />
              </Spacer>
            }
            secondary="Earn points for your daily steps"
          />
        </ListItem>
      </List>
    </Dialog>
  );
};
