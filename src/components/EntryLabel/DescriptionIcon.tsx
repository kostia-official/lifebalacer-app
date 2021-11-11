import React from 'react';
import { Entry } from '../../generated/apollo';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';

export interface DescriptionIconProps {
  entry?: Pick<Entry, 'description'>;
  className?: string;
}

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  margin-left: 2px;
  font-size: 14px;
`;

export const DescriptionIcon: React.FC<DescriptionIconProps> = ({ entry, className }) => {
  if (!entry?.description) return null;

  return <FontAwesomeIconStyled className={className} icon={faComment} />;
};
