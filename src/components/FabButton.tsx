import React from 'react';
import { Fab, FabProps, Badge } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PartialBy } from '../common/typeUtils';
import { BadgeProps } from '@material-ui/core/Badge/Badge';

export interface ISaveFabButtonProps extends FabProps {
  icon?: React.ReactNode;
  isShowBadge?: boolean;
  badgeProps?: BadgeProps;
}

export const FabButton: React.FC<PartialBy<ISaveFabButtonProps, 'children'>> = ({
  icon = <AddIcon />,
  isShowBadge = false,
  badgeProps,
  ...fabProps
}) => {
  return (
    <Badge
      color="secondary"
      overlap="circle"
      variant="dot"
      invisible={!isShowBadge}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      {...badgeProps}
    >
      <Fab color="primary" {...fabProps}>
        <>{icon}</>
      </Fab>
    </Badge>
  );
};
