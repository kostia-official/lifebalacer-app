import React, { useCallback } from 'react';
import { Typography, Button } from '@material-ui/core';
import { getEntryLabel } from '../helpers/getEntryLabel';
import styled from 'styled-components';
import { SelectedEntry, ActivityResult } from '../common/types';

const ButtonStyled: typeof Button = styled(Button)`
  height: 40px;
  margin: 8px 8px 0 0;
`;

export interface EntryPickButtonProps {
  entry?: SelectedEntry;
  activity: ActivityResult;
  toggleSelection: (activity: ActivityResult, entry?: SelectedEntry) => any;
}

export const EntryPickButton: React.FC<EntryPickButtonProps> = ({
  entry,
  activity,
  toggleSelection
}) => {
  const isSelected = !!entry;

  const onClick = useCallback(() => {
    toggleSelection(activity, entry);
  }, [activity, entry, toggleSelection]);

  return (
    <ButtonStyled
      variant={isSelected ? 'contained' : 'outlined'}
      color="primary"
      size="small"
      onClick={onClick}
      startIcon={<Typography variant="h5">{activity.emoji}</Typography>}
      disableRipple
      disableElevation
    >
      {getEntryLabel({ entry, activity, isWithEmoji: false })}
    </ButtonStyled>
  );
};
