import React, { Fragment } from 'react';
import { ListItemAvatar, Avatar, Tooltip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import styled, { css } from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import { Icon as Iconify } from '@iconify/react';
import baselineWorkspacePremium from '@iconify/icons-ic/baseline-workspace-premium';

export interface UserListItemData {
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
}

export interface UserListItemProps {
  user: UserListItemData;
  interval?: number;
}

const Email = styled.span`
  display: inline-block;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  vertical-align: bottom;
`;

const ListItemAvatarStyled = styled(ListItemAvatar)<{ interval: number }>`
  position: relative;

  ${(p) =>
    p.interval &&
    css`
      min-width: ${40 + p.interval}px;
    `}
`;

const PremiumIcon = styled(Iconify)`
  position: absolute;
  right: 10px;
  bottom: -2px;
`;

export const UserListItemContent: React.FC<UserListItemProps> = ({ user, interval = 16 }) => {
  return (
    <Fragment>
      <ListItemAvatarStyled interval={interval}>
        <>
          {user?.avatar ? (
            <Avatar alt={user.name} src={user.avatar} />
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
          {user.isPremium && (
            <Tooltip title="Premium user">
              <div>
                <PremiumIcon icon={baselineWorkspacePremium} width={16} />
              </div>
            </Tooltip>
          )}
        </>
      </ListItemAvatarStyled>

      <ListItemText primary={user.name} secondary={<Email>{user.email}</Email>} />
    </Fragment>
  );
};
