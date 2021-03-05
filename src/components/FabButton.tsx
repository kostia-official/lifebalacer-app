import React from 'react';
import { Fab, Icon, FabProps, Badge } from '@material-ui/core';
import { PartialBy } from '../common/typeUtils';

export interface ISaveFabButtonProps extends FabProps {
  icon?: string;
  isShowBadge?: boolean;
}

export const FabButton: React.FC<PartialBy<ISaveFabButtonProps, 'children'>> = ({
  icon = 'add',
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
        <Icon>{icon}</Icon>
      </Fab>
    </Badge>
  );
};
