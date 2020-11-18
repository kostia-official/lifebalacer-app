import _ from 'lodash';
import { Entry, Activity, ActivityType, ActivityCategory } from '../generated/apollo';
import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as commentIcon } from '@fortawesome/free-solid-svg-icons';
import { Button, PropTypes } from '@material-ui/core';

export interface GetEntryLabelProps {
  activity: Pick<
    Activity,
    'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget' | 'category'
  >;
  entry?: Pick<Entry, 'description' | 'value'>;
  isWithEmoji?: boolean;
}

const DescriptionIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  font-size: 14px;
`;

const LabelWrapper = styled(Button)`
  margin: 6px 6px 0 0;
`;

export const EntryLabel = ({ entry, activity, isWithEmoji = true }: GetEntryLabelProps) => {
  const name =
    activity?.isWidget && entry?.description
      ? _.truncate(entry.description, {
          length: 40,
          separator: ' '
        })
      : activity?.name;

  const prefix = isWithEmoji ? `${activity?.emoji} ` : '';

  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';
  const isWithDescription = entry?.description && activity?.isWithDescription;

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
    <LabelWrapper
      size="small"
      color={getButtonColor(activity.category)}
      variant="outlined"
      disableRipple
      disableElevation
      disableFocusRipple
      disableTouchRipple
      focusRipple={false}
    >
      <span>{prefix + name + value}</span>
      {isWithDescription && <DescriptionIcon icon={commentIcon} />}
    </LabelWrapper>
  );
};
