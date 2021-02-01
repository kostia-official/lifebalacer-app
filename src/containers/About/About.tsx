import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import { useAuth } from '../../hooks/useAuth';
import { LastUpdatedAt } from './LastUpdatedAt';
import { Center } from '../../components/Center';

export const About = () => {
  // const { goForwardToCb } = useHistoryNavigation();
  const { user } = useAuth();

  const isEnableDevTools = user?.email === 'kozzztya@gmail.com';

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Terms and Conditions" />
        </ListItem>

        <Center margin="4px 0">
          <LastUpdatedAt />
        </Center>
      </List>
    </div>
  );
};
