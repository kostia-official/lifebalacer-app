import React, { Fragment } from 'react';
import { Activity, Entry } from '../generated/apollo';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';

export interface DescriptionIconProps {
  activity?: Pick<Activity, 'isWidget'>;
  entry?: Pick<Entry, 'description'>;
}

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  margin-left: 4px;
  margin-right: 1px;
  font-size: 14px;
`;

export const DescriptionIcon: React.FC<DescriptionIconProps> = ({ entry, activity }) => {
  const isWithDescription = entry?.description && !activity?.isWidget;

  if (isWithDescription) return <FontAwesomeIconStyled icon={faComment} />;

  return <Fragment />;
};
