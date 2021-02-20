import React from 'react';
import { Icon, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { LastUpdatedAt } from './LastUpdatedAt';
import { Center } from '../../components/Center';
import { PageWrapper } from '../../components/PageWrapper';
import { useAuth } from '../../hooks/useAuth';
import { UserListItem } from '../../components/UserListItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Other = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const { user, logout } = useAuth();

  const isEnableDevTools = user?.email === 'kozzztya@gmail.com';

  return (
    <PageWrapper>
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

        <ListItem button onClick={goForwardToCb('Activities')}>
          <ListItemIcon>
            <Icon>assignment_turned_in</Icon>
          </ListItemIcon>

          <ListItemText primary="Activities" />
        </ListItem>

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

        {isEnableDevTools && (
          <ListItem button onClick={goForwardToCb('DevTools')}>
            <ListItemIcon>
              <Icon>construction</Icon>
            </ListItemIcon>

            <ListItemText primary="Dev Tools" />
          </ListItem>
        )}

        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItem>
      </List>

      <Center margin="14px 0">
        <LastUpdatedAt />
      </Center>
    </PageWrapper>
  );
};

export default Other;
