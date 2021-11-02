import React, { useCallback } from 'react';
import { Button, PropTypes, BadgeTypeMap, Badge } from '@material-ui/core';
import styled from 'styled-components';
import { SelectedEntry, ActivityResult } from '../../../common/types';
import { ActivityCategory, Activity } from '../../../generated/apollo';
import { useLongPress } from 'use-long-press';
import { EntryLabelTruncate } from '../../../components/EntryLabelTruncate';

const ButtonWrapper = styled.div`
  display: inline-block;
  margin: 4px 8px 4px 0;
`;

const BadgeStyled: typeof Badge = styled(Badge)`
  .MuiBadge-anchorOriginTopRightRectangle {
    right: 8px;
  }
`;

const ButtonStyled: typeof Button = styled(Button)`
  height: 40px;
`;

export interface EntryPickButtonProps {
  entry?: SelectedEntry;
  activity: ActivityResult;
  toggleSelection: (activity: ActivityResult, entry?: SelectedEntry) => any;
  onLongPress: (entry?: SelectedEntry) => any;

  badgeColor?: BadgeTypeMap['props']['color'];
  isShowBadge?: boolean;
}

export const EntryPickButton: React.FC<EntryPickButtonProps> = ({
  entry,
  activity,
  toggleSelection,
  onLongPress,
  badgeColor = 'default',
  isShowBadge = false
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
    <ButtonWrapper>
      <BadgeStyled
        key={activity._id}
        color={badgeColor}
        variant="dot"
        overlap="rectangle"
        invisible={!isShowBadge}
      >
        <ButtonStyled
          variant={isSelected ? 'contained' : 'outlined'}
          color={getButtonColor(activity.category)}
          size="small"
          onClick={onClick}
          disableRipple
          disableElevation
          {...longPressEvent}
        >
          <EntryLabelTruncate entry={entry} activity={activity} />
        </ButtonStyled>
      </BadgeStyled>
    </ButtonWrapper>
  );
};
