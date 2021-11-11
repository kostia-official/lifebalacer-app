import React from 'react';
import styled from 'styled-components';
import { Emoji } from '../Emoji';
import _ from 'lodash';
import { Activity } from '../../generated/apollo';
import { DescriptionIcon } from './DescriptionIcon';
import { GoalsResultsIcons } from './GoalsResultsIcons';
import { SelectedEntry } from '../../common/types';
import { EmptyBlock } from '../EmptyBlock';

export interface EntryLabelProps {
  activity?: Pick<Activity, 'name' | 'emoji'>;
  entry?: SelectedEntry;
  isAddComa?: boolean;
}

const Label = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const TextWrapper = styled.div`
  display: inline-block;
`;

const Coma = styled.span`
  margin-right: 5px;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 4px;
`;

const EmojiStyled = styled(Emoji)`
  position: relative;
  top: -1px;
`;

export const EntryLabel = ({ entry, activity, isAddComa = false }: EntryLabelProps) => {
  const text = entry?.name || activity?.name;
  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';

  const hasIcons = entry?.description || !!entry?.goalResults.length;

  return (
    <Label>
      <EmojiStyled>{activity?.emoji}</EmojiStyled>
      <EmptyBlock width={2} />

      <TextWrapper>
        {text}
        {value}
      </TextWrapper>

      {hasIcons && (
        <IconsWrapper>
          <DescriptionIcon entry={entry} />

          <GoalsResultsIcons goalResults={entry?.goalResults} />
        </IconsWrapper>
      )}

      {isAddComa && <Coma>, </Coma>}
    </Label>
  );
};
