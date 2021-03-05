import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDialIcon } from '@material-ui/lab';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useDeviceMediaQuery } from '../hooks/useDeviceMediaQuery';

const useStyles = makeStyles((theme) => ({
  toolbarGutters: {
    paddingLeft: '23px',
    paddingRight: '23px'
  },
  appBar: { zIndex: 1000 },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  appBarBottomMargin: theme.mixins.toolbar // use the same height as Toolbar
}));

export interface IHeaderProps {
  title: string;
  onMenuClick: (event: MouseEvent) => void;
  onBackClick: (event: MouseEvent) => void;
  isShowBack?: boolean;
  rightContent?: React.ReactElement;
}

export const Header: React.FC<IHeaderProps> = ({
  onMenuClick,
  onBackClick,
  isShowBack = false,
  title,
  rightContent
}) => {
  const classes = useStyles();
  const { isDesktop } = useDeviceMediaQuery();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          classes={{
            gutters: classes.toolbarGutters
          }}
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={isShowBack ? onBackClick : onMenuClick}
          >
            <SpeedDialIcon
              icon={isDesktop ? <MenuIcon /> : <AllInclusiveIcon />}
              openIcon={<ChevronLeftIcon />}
              open={isShowBack}
            />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {rightContent && <Typography variant="h6">{rightContent}</Typography>}
        </Toolbar>
      </AppBar>

      {/* Toolbar is fixed. Use empty div with Toolbar height to show content below it properly */}
      <div className={classes.appBarBottomMargin} />
    </div>
  );
};
