import React from 'react';
import styled from 'styled-components';
import { Emoji } from './Emoji';
import _ from 'lodash';
import { Activity, Entry } from '../generated/apollo';
import { DescriptionIcon } from './DescriptionIcon';

export interface GetEntryLabelProps {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: Pick<Entry, 'description' | 'value'>;
}

const Label = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 72vw;
`;

export const EntryLabelTruncate = ({ entry, activity }: GetEntryLabelProps) => {
  const text = activity?.isWidget && entry?.description ? entry.description : activity?.name;
  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';

  return (
    <Label>
      <Emoji>{activity?.emoji}</Emoji>
      <TextWrapper>{text}</TextWrapper>
      {value}
      <DescriptionIcon entry={entry} activity={activity} />
    </Label>
  );
};
