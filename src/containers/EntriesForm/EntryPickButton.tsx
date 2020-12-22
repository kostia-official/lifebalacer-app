import React, { useCallback } from 'react';
import { Typography, Button, PropTypes } from '@material-ui/core';
import styled from 'styled-components';
import { SelectedEntry, ActivityResult } from '../../common/types';
import { EntryLabel } from '../../components/EntryLabel';
import { ActivityCategory, Activity } from '../../generated/apollo';
import { useLongPress } from 'react-use';

const ButtonStyled: typeof Button = styled(Button)`
  height: 40px;
  margin: 8px 8px 0 0;
`;

export interface EntryPickButtonProps {
  entry?: SelectedEntry;
  activity: ActivityResult;
  toggleSelection: (activity: ActivityResult, entry?: SelectedEntry) => any;
  onLongPress: (entry?: SelectedEntry) => any;
}

export const EntryPickButton: React.FC<EntryPickButtonProps> = ({
  entry,
  activity,
  toggleSelection,
  onLongPress
}) => {
  const isSelected = !!entry;

  const longPressEvent = useLongPress(() =>
    onLongPress(entry || ({ activityId: activity._id } as SelectedEntry))
  );

  const onClick = useCallback(() => {
    toggleSelection(activity, entry);
  }, [activity, entry, toggleSelection]);

  const getButtonColor = useCallback((category: Activity['category']): PropTypes.Color => {
    switch (category) {
      case ActivityCategory.Negative:
        return 'secondary';
      case ActivityCategory.Positive:
        return 'primary';
      default:
        return 'default';
    }
  }, []);

  return (
    <ButtonStyled
      variant={isSelected ? 'contained' : 'outlined'}
      color={getButtonColor(activity.category)}
      size="small"
      onClick={onClick}
      startIcon={<Typography variant="h5">{activity.emoji}</Typography>}
      disableRipple
      disableElevation
      {...longPressEvent}
    >
      <EntryLabel entry={entry} activity={activity} isWithEmoji={false} />
    </ButtonStyled>
  );
};
