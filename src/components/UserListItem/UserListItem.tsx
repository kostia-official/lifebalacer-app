import React, { Fragment, useCallback, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { Menu, MenuItem } from '@material-ui/core';
import { UserListItemContent, UserListItemData } from './UserListItemContent';

export interface UserListItemProps {
  user?: UserListItemData;
  onLogout: () => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user, onLogout }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleClick = useCallback((event) => {
    setMenuAnchor(event.currentTarget);
  }, []);

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const logout = useCallback(() => {
    onLogout();
    setMenuAnchor(null);
  }, [onLogout]);

  if (!user) return <Fragment />;

  return (
    <Fragment>
      <ListItem onClick={handleClick} button>
        <UserListItemContent user={user} />
      </ListItem>

      <Menu
        anchorEl={menuAnchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};
