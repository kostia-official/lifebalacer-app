import React, { useMemo } from 'react';
import { ActivityFragment } from '../generated/apollo';
import { MenuItem, Select } from '@material-ui/core';
import { Greyscale } from './Greyscale';

export interface ActivitySelectProps {
  activities: ActivityFragment[];
  onSelect: (activityId: string | undefined) => void;
  value: string | undefined;
}

export interface ActivityItem {
  label: string;
  isArchived?: boolean;
  activityId?: string;
}

export const ActivitySelect: React.FC<ActivitySelectProps> = ({ activities, onSelect, value }) => {
  const activitiesItems: ActivityItem[] = useMemo(() => {
    return [
      { label: 'All' },
      ...activities.map(({ _id, emoji, name, isArchived }) => ({
        isArchived,
        activityId: _id,
        label: `${emoji} ${name}`
      }))
    ];
  }, [activities]);

  return (
    <Select value={value} displayEmpty fullWidth variant="outlined">
      {activitiesItems?.map(({ activityId, label, isArchived }, i) => (
        <MenuItem key={i} value={activityId} onClick={() => onSelect(activityId)}>
          <Greyscale isEnable={isArchived}>{label}</Greyscale>
        </MenuItem>
      ))}
    </Select>
  );
};
