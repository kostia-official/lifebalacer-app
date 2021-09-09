import React, { FunctionComponent } from 'react';
import styled, { SimpleInterpolation } from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export interface LogoContentProps {
  text?: string;
  logoStyles?: SimpleInterpolation;
  textVariant?: TypographyProps['variant'];
  logo: FunctionComponent;
}

const LogoWrapper = styled.div<{ $logoStyles: SimpleInterpolation }>`
  max-width: 500px;
  width: 60vw;

  height: auto;
  margin-top: 40px;
  margin-bottom: 40px;

  ${(props) => props.$logoStyles}
`;

export const LogoContent: React.FC<LogoContentProps> = ({
  logo,
  logoStyles,
  text,
  textVariant = 'h6'
}) => {
  return (
    <ContentWrapper>
      <LogoWrapper as={logo} $logoStyles={logoStyles} />
      {text && <Typography variant={textVariant}>{text}</Typography>}
    </ContentWrapper>
  );
};
