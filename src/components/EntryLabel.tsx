import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as commentIcon } from '@fortawesome/free-solid-svg-icons';
import { GetEntryLabelArgs, getEntryLabel } from '../helpers/entryLabel';

export interface GetEntryLabelProps extends GetEntryLabelArgs {
  isAddComa?: boolean;
}

const Label = styled.span`
  white-space: nowrap;
`;

const DescriptionIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  margin-right: 1px;
  font-size: 14px;
`;

export const EntryLabel = ({
  entry,
  activity,
  isWithEmoji = true,
  isAddComa = false
}: GetEntryLabelProps) => {
  const isWithDescription = entry?.description && activity?.isWithDescription;

  return (
    <Fragment>
      <Label>{getEntryLabel({ entry, activity, isWithEmoji })}</Label>
      {isWithDescription && <DescriptionIcon icon={commentIcon} />}
      {isAddComa && <span>, </span>}
    </Fragment>
  );
};
