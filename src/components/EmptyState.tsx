import React from 'react';
import { ReactComponent as EmptyDataLogo } from '../assets/emptyState.svg';
import { LogoContent, LogoContentProps } from './LogoContent';
import { css } from 'styled-components';

const emptyLogoStyles = css`
  max-width: 400px;
  width: 60vw;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const EmptyState: React.FC<Partial<LogoContentProps>> = (props) => {
  return (
    <LogoContent
      logo={EmptyDataLogo}
      text="So far no data..."
      textVariant="subtitle1"
      logoStyles={emptyLogoStyles}
      {...props}
    />
  );
};
