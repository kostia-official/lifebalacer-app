import _ from 'lodash';
import { Entry, Activity, ActivityType } from '../generated/apollo';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as commentIcon } from '@fortawesome/free-solid-svg-icons';

export interface GetEntryLabelProps {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: Pick<Entry, 'description' | 'value'>;
  isWithEmoji?: boolean;
}

const DescriptionIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  font-size: 14px;
`;

export const EntryLabel = ({ entry, activity, isWithEmoji = true }: GetEntryLabelProps) => {
  const name =
    activity?.isWidget && entry?.description
      ? _.truncate(entry.description, {
          length: 30,
          separator: ' '
        })
      : activity?.name;

  const prefix = isWithEmoji ? `${activity?.emoji} ` : '';

  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';
  const isWithDescription = entry?.description && activity?.isWithDescription;

  return (
    <Fragment>
      <span>{prefix + name + value}</span>
      {isWithDescription && <DescriptionIcon icon={commentIcon} />}
    </Fragment>
  );
};
