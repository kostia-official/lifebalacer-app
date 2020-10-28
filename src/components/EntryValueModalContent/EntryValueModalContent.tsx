import { Entry, ActivityType } from '../../generated/apollo';
import { ActivityResult } from '../../common/types';
import React, { Fragment } from 'react';
import { EntryNumberValueModalContent } from './EntryNumberValueModalContent';
import { EntryRangeValueModalContent } from './EntryRangeValueModalContent';

export interface EntryValueModalContentProps {
  onSave: (value: number) => void;
  onDelete: () => void;
  value: Entry['value'];
  activity: ActivityResult;
}

export const EntryValueModalContent: React.FC<EntryValueModalContentProps> = (props) => {
  if (!props.activity) return <Fragment />;

  return props.activity?.valueType === ActivityType.Range ? (
    <EntryRangeValueModalContent {...props} />
  ) : (
    <EntryNumberValueModalContent {...props} />
  );
};
