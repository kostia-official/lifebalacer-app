import React from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export interface ISaveFabButtonProps {
  onClick: (event: React.MouseEvent) => void;
}

export const AddFabButton: React.FC<ISaveFabButtonProps> = ({ onClick }) => {
  return (
    <Fab color="primary" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};
