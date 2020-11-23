import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useHistoryPush } from '../../hooks/useHistoryPush';

export const About = () => {
  const { historyPush } = useHistoryPush();

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={historyPush('/about/privacy-policy')}>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <ListItem button onClick={historyPush('/about/terms-and-conditions')}>
          <ListItemText primary="Terms and Conditions" />
        </ListItem>
      </List>
    </div>
  );
};
