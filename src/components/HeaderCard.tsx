import React from 'react';
import { Typography, Card } from '@material-ui/core';
import styled from 'styled-components';
import { Fragment } from 'react';

export interface PageStartSectionProps {
  text: string;
  rightContent?: React.ReactElement;
}

const Wrapper = styled(Card)`
  padding: 10px 16px;
`;

const HeaderContent = styled.div`
  color: ${(props) => props.theme.palette.text.secondary};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderCard: React.FC<PageStartSectionProps> = ({ text, rightContent, children }) => {
  return (
    <Wrapper>
      <HeaderContent>
        <Typography variant="subtitle2">{text}</Typography>
        {rightContent || <Fragment />}
      </HeaderContent>

      {children}
    </Wrapper>
  );
};
