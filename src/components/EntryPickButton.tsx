import React from 'react';
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
  unselectEntry?: (entry: SelectedEntry) => void;
  selectEntry: (activity: ActivityResult) => void;
}

export const EntryPickButton: React.FC<EntryPickButtonProps> = ({
  entry,
  activity,
  unselectEntry,
  selectEntry
}) => {
  return (
    <ButtonStyled
      variant={entry ? 'contained' : 'outlined'}
      color="primary"
      size="small"
      onClick={() => (entry ? unselectEntry && unselectEntry(entry) : selectEntry(activity))}
      startIcon={<Typography variant="h5">{activity.emoji}</Typography>}
      disableRipple
      disableElevation
    >
      {getEntryLabel({ entry, activity, isWithEmoji: false })}
    </ButtonStyled>
  );
};
