import React from 'react';
import { Icon, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useNavigationHelpers } from '../hooks/useNavigationHelpers';
import { ScreenWrapper } from './App/ScreenWrapper';
import { useAuth } from '../hooks/useAuth';
import { UserListItem } from '../components/UserListItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Other = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const { user, logout } = useAuth();

  return (
    <ScreenWrapper>
      <List disablePadding>
        {user && (
          <>
            <UserListItem
              user={{ avatar: user?.picture, email: user?.email, name: user?.username }}
              onLogout={logout}
            />

            <Divider />
          </>
        )}

        <ListItem button onClick={goForwardToCb('Reminders')}>
          <ListItemIcon>
            <Icon>notifications</Icon>
          </ListItemIcon>

          <ListItemText primary="Reminders" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('About')}>
          <ListItemIcon>
            <Icon>info</Icon>
          </ListItemIcon>

          <ListItemText primary="About" />
        </ListItem>

        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </ScreenWrapper>
  );
};

export default Other;