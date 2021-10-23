import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useNavigationHelpers } from '../hooks/useNavigationHelpers';
import { ScreenWrapper } from './App/ScreenWrapper';
import { useAuth } from '../hooks/useAuth';
import { UserListItemContent } from '../components/UserListItem/UserListItemContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useIsInternalTestUser } from '../hooks/useIsInternalTestUser';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import outlineWorkspacePremium from '@iconify/icons-ic/outline-workspace-premium';
import { useActiveSubscription } from '../hooks/apollo/useActiveSubscription';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InfoIcon from '@material-ui/icons/Info';
import goalIcon from '@iconify/icons-fluent/target-arrow-20-filled';

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

const GoalIconContainer = styled(Icon)`
  position: relative;
  left: -1px;
`;

const Other = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const { user, logout } = useAuth();
  const isInternalTestUser = useIsInternalTestUser();

  const { isPremium } = useActiveSubscription({ withSyncedCachePolicy: true });

  return (
    <ScreenWrapper>
      <List disablePadding>
        {user && (
          <>
            <ListItem>
              <UserListItemContentWrapper>
                <UserListItemContent
                  user={{
                    avatar: user?.picture,
                    email: user?.email,
                    name: user?.username,
                    isPremium
                  }}
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
              <Icon icon={outlineWorkspacePremium} width={26} />
            </ListItemIconStyled>

            <ListItemText primary="Premium Subscription" />
          </ListItem>
        )}

        <ListItem button onClick={goForwardToCb('Reminders')}>
          <ListItemIconStyled>
            <NotificationsIcon />
          </ListItemIconStyled>

          <ListItemText primary="Reminders" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('Goals')}>
          <ListItemIconStyled>
            <GoalIconContainer icon={goalIcon} width={26} />
          </ListItemIconStyled>

          <ListItemText primary="Goals" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('About')}>
          <ListItemIconStyled>
            <InfoIcon />
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
