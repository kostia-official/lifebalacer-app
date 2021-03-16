import React, { Fragment } from 'react';
import { ListItemAvatar, Avatar } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import styled, { css } from 'styled-components';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface UserListItemProps {
  user: User;
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
  ${(p) =>
    p.interval &&
    css`
      min-width: ${40 + p.interval}px;
    `}
`;

export const UserListItemContent: React.FC<UserListItemProps> = ({ user, interval = 16 }) => {
  return (
    <Fragment>
      <ListItemAvatarStyled interval={interval}>
        {user?.avatar ? (
          <Avatar alt={user.name} src={user.avatar} />
        ) : (
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        )}
      </ListItemAvatarStyled>

      <ListItemText primary={user.name} secondary={<Email>{user.email}</Email>} />
    </Fragment>
  );
};
