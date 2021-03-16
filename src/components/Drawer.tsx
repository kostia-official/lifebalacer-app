import React, { Fragment } from 'react';
import MaterialDrawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import { Divider } from '@material-ui/core';
import { User } from './UserListItemContent';
import { UserListItem } from './UserListItem';

export const drawerWidth = '250px';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    zIndex: 100
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1
  },
  list: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      paddingTop: '70px'
    }
  },
  icon: {
    paddingLeft: theme.spacing(1)
  },
  userListItem: {
    marginBottom: theme.spacing(1),
    height: '80px',
    [theme.breakpoints.up('sm')]: {
      height: '70px'
    }
  },
  divider: {
    marginBottom: '16px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(1)
    }
  }
}));

export interface INavigationProps {
  isExpanded: boolean;
  items: {
    name: string;
    icon: string;
    screen: string;
  }[];
  onClose?: () => void;
  onItemClick: (path: string) => void;
  user?: User;
  onLogout: () => void;
}

export const Drawer: React.FC<INavigationProps> = ({
  isExpanded,
  items,
  onClose = () => {},
  onItemClick,
  onLogout,
  user
}) => {
  const classes = useStyles();

  return (
    <MaterialDrawer
      variant="permanent"
      className={clsx({
        [classes.drawerOpen]: isExpanded,
        [classes.drawerClose]: !isExpanded
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: isExpanded,
          [classes.drawerClose]: !isExpanded
        })
      }}
      onClose={onClose}
      open={isExpanded}
    >
      <List className={classes.list}>
        {user && (
          <Fragment>
            <div className={classes.userListItem}>
              <UserListItem user={user} onLogout={onLogout} />
            </div>

            <Divider className={classes.divider} />
          </Fragment>
        )}

        {_.map(items, ({ icon, name, screen }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              if (onItemClick) onItemClick(screen);
            }}
          >
            <ListItemIcon className={classes.icon}>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </MaterialDrawer>
  );
};
