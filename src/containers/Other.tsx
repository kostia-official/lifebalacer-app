import React from 'react';
import { Icon, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useNavigationHelpers } from '../hooks/useNavigationHelpers';
import { ScreenWrapper } from './App/ScreenWrapper';
import { useAuth } from '../hooks/useAuth';
import { UserListItemContent } from '../components/UserListItemContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useIsInternalTestUser } from '../hooks/useIsInternalTestUser';
import styled from 'styled-components';

const UserListItemContentWrapper = styled.div`
  margin-left: -9px;
  display: flex;
  align-items: center;
`;

const ListItemIconStyled = styled(ListItemIcon)`
  min-width: 46px;
  margin-left: -1px;
`;

const DividerStyled = styled(Divider)`
  margin-top: 6px;
  margin-bottom: 10px;
`;

const Other = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const { user, logout } = useAuth();
  const isInternalTestUser = useIsInternalTestUser();

  return (
    <ScreenWrapper>
      <List disablePadding>
        {user && (
          <>
            <ListItem>
              <UserListItemContentWrapper>
                <UserListItemContent
                  user={{ avatar: user?.picture, email: user?.email, name: user?.username }}
                  interval={14}
                />
              </UserListItemContentWrapper>
            </ListItem>

            <DividerStyled />
          </>
        )}

        {isInternalTestUser && (
          <ListItem button onClick={goForwardToCb('PremiumPlan')}>
            <ListItemIconStyled>
              <Icon>stars</Icon>
            </ListItemIconStyled>

            <ListItemText primary="Premium Subscription" />
          </ListItem>
        )}

        <ListItem button onClick={goForwardToCb('Reminders')}>
          <ListItemIconStyled>
            <Icon>notifications</Icon>
          </ListItemIconStyled>

          <ListItemText primary="Reminders" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('About')}>
          <ListItemIconStyled>
            <Icon>info</Icon>
          </ListItemIconStyled>

          <ListItemText primary="About" />
        </ListItem>

        <ListItem button onClick={() => logout()}>
          <ListItemIconStyled>
            <ExitToAppIcon />
          </ListItemIconStyled>

          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </ScreenWrapper>
  );
};

export default Other;
