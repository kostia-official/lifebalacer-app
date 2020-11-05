import React, { FunctionComponent } from 'react';
import styled, { SimpleInterpolation } from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export interface LogoContentProps {
  text: string;
  logoStyles?: SimpleInterpolation;
  textVariant?: TypographyProps['variant'];
  logo: FunctionComponent;
}

const LogoWrapper = styled.div<{ $logoStyles: SimpleInterpolation }>`
  max-width: 500px;
  width: 60vw;

  height: auto;
  margin-top: 40px;
  
  ${props => props.$logoStyles}
`;

const TypographyStyled = styled(Typography)`
  margin-top: 40px;
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
      <TypographyStyled variant={textVariant}>{text}</TypographyStyled>
    </ContentWrapper>
  );
};
