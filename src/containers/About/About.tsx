import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';

export const About = () => {
  const { goForwardToCb } = useHistoryNavigation();

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={goForwardToCb('/about/privacy-policy')}>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <ListItem button onClick={goForwardToCb('/about/terms-and-conditions')}>
          <ListItemText primary="Terms and Conditions" />
        </ListItem>
      </List>
    </div>
  );
};
