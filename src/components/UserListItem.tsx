import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ListItemAvatar, Avatar } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface UserListItemProps {
  user?: User;
  onLogout: () => void;
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

export const UserListItem: React.FC<UserListItemProps> = ({ user, onLogout }) => {
  if (!user) return <Fragment />;

  return (
    <Fragment>
      <ListItem button>
        <ListItemAvatar>
          {user?.avatar ? (
            <Avatar alt={user?.name} src={user?.avatar} />
          ) : (
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={user?.name} secondary={<Email>{user.email}</Email>} />
      </ListItem>
    </Fragment>
  );
};
