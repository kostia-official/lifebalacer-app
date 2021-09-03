import React from 'react';
import { Fab, FabProps, Badge } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PartialBy } from '../common/typeUtils';

export interface ISaveFabButtonProps extends FabProps {
  icon?: React.ReactNode;
  isShowBadge?: boolean;
}

export const FabButton: React.FC<PartialBy<ISaveFabButtonProps, 'children'>> = ({
  icon = <AddIcon />,
  isShowBadge = false,
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
    >
      <Fab color="primary" {...fabProps}>
        <>{icon}</>
      </Fab>
    </Badge>
  );
};
