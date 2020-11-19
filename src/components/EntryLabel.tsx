import _ from 'lodash';
import { Entry, Activity } from '../generated/apollo';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as commentIcon } from '@fortawesome/free-solid-svg-icons';

export interface GetEntryLabelProps {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: Pick<Entry, 'description' | 'value'>;
  isWithEmoji?: boolean;
}

const Label = styled.span`
  white-space: nowrap;
`;

const DescriptionIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  margin-right: 1px;
  font-size: 14px;
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

  return (
    <Fragment>
      <Label>{prefix + name + value}</Label>
      {isWithDescription && <DescriptionIcon icon={commentIcon} />}
    </Fragment>
  );
};
