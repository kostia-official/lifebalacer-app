import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import { IPage } from '../containers/App';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { ListItemAvatar, Avatar, Divider } from '@material-ui/core';
import styled from 'styled-components';

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
  items: IPage[];
  onClose: () => void;
  onItemClick: (path: string) => void;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

const Email = styled.span`
  display: inline-block;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
`;

export const Navigation: React.FC<INavigationProps> = ({
  isExpanded,
  items,
  onClose,
  onItemClick,
  user
}) => {
  const classes = useStyles();
  const { isDesktop } = useDeviceDetect();

  return (
    <>
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
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
              <ListItem className={classes.userListItem}>
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

              <Divider className={classes.divider} />
            </Fragment>
          )}

          {_.map(items, ({ icon, name, path }) => (
            <ListItem
              button
              key={name}
              onClick={() => {
                if (onItemClick) onItemClick(path);
                if (!isDesktop) onClose();
              }}
            >
              <ListItemIcon className={classes.icon}>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

Navigation.propTypes = {
  isExpanded: PropTypes.bool.isRequired
};
