import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Emoji } from './Emoji';
import _ from 'lodash';
import { Activity, Entry } from '../generated/apollo';
import { DescriptionIcon } from './DescriptionIcon';
import { Points } from './Points';

export interface GetEntryLabelProps {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: Pick<Entry, 'description' | 'value' | 'points'>;
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
  max-width: 70vw;
`;

const PointsWrapper = styled.div`
  margin-left: 6px;
`;

export const EntryLabelTruncate = ({ entry, activity }: GetEntryLabelProps) => {
  const text = activity?.isWidget && entry?.description ? entry.description : activity?.name;
  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';
  const points = entry?.points && entry?.points > 0 ? `+${entry?.points}` : entry?.points;

  return (
    <Label>
      <Emoji>{activity?.emoji}</Emoji>
      <TextWrapper>{text}</TextWrapper>
      {value}
      <DescriptionIcon entry={entry} activity={activity} />
      {entry?.points ? (
        <PointsWrapper>
          <Points
            points={points}
            pointsSize={13}
            coinSize={15}
            coinStyle="position: relative;"
            interval={2}
          />
        </PointsWrapper>
      ) : (
        <Fragment />
      )}
    </Label>
  );
};
