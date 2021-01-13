import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import { useAuth } from '../../hooks/useAuth';

export const About = () => {
  const { goForwardToCb } = useHistoryNavigation();
  const { user } = useAuth();

  const isEnableDevTools = user?.email === 'kozzztya@gmail.com';

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={goForwardToCb('/about/privacy-policy')}>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <ListItem button onClick={goForwardToCb('/about/terms-and-conditions')}>
          <ListItemText primary="Terms and Conditions" />
        </ListItem>
        {isEnableDevTools && (
          <ListItem button onClick={goForwardToCb('/about/dev-tools')}>
            <ListItemText primary="Dev Tools" />
          </ListItem>
        )}
      </List>
    </div>
  );
};
