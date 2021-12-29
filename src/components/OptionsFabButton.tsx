import React from 'react';
import { FabButton } from './FabButton';
import TuneIcon from '@material-ui/icons/Tune';

export interface FilterFabButtonProps {
  onClick: () => void;
  count: number;
}

export const OptionsFabButton: React.FC<FilterFabButtonProps> = ({ count, onClick }) => {
  return (
    <FabButton
      onClick={() => onClick()}
      icon={<TuneIcon />}
      isShowBadge={!!count}
      badgeProps={{
        badgeContent: count,
        variant: 'standard',
        color: 'primary'
      }}
    />
  );
};
