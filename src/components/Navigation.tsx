import PropTypes from 'prop-types';
import React from 'react';
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
import { useDeviceDetect } from '../hooks/useIsDesktop';

export const drawerWidth = '240px';

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
  }
}));

export interface INavigationProps {
  isExpanded: boolean;
  items: IPage[];
  onClose: () => void;
  onItemClick: (path: string) => void;
}

export const Navigation: React.FC<INavigationProps> = ({
  isExpanded,
  items,
  onClose,
  onItemClick
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
