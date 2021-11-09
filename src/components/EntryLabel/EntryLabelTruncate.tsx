import React from 'react';
import styled from 'styled-components';
import { Emoji } from '../Emoji';
import _ from 'lodash';
import { Activity } from '../../generated/apollo';
import { DescriptionIcon } from './DescriptionIcon';
import { Points } from '../Points';
import { SelectedEntry } from '../../common/types';
import { GoalsResultsIcons } from './GoalsResultsIcons';

export interface GetEntryLabelProps {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: SelectedEntry;
}

const Label = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const TextWrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 55vw; // TODO: Tech debt: It's suggestion how much percent of screen a text will take
`;

const PointsWrapper = styled.div`
  margin-left: 2px;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  position: relative;
  top: -1px;
`;

const EmojiStyled = styled(Emoji)`
  margin-left: 2px;
`;

export const EntryLabelTruncate = ({ entry, activity }: GetEntryLabelProps) => {
  const text = activity?.isWidget && entry?.description ? entry.description : activity?.name;
  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';
  const points = entry?.points && entry?.points > 0 ? `+${entry?.points}` : entry?.points;

  return (
    <Label>
      <EmojiStyled>{activity?.emoji}</EmojiStyled>
      <TextWrapper>
        {text}
        {value}
      </TextWrapper>

      <IconsWrapper>
        <DescriptionIcon entry={entry} activity={activity} />

        <GoalsResultsIcons goalResults={entry?.goalResults} />
      </IconsWrapper>

      {!!entry?.points && (
        <PointsWrapper>
          <Points
            points={points}
            pointsSize={13}
            coinSize={15}
            coinStyle="position: relative;"
            interval={2}
          />
        </PointsWrapper>
      )}
    </Label>
  );
};
