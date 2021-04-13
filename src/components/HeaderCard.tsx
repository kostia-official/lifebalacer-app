import React from 'react';
import { Typography, Card } from '@material-ui/core';
import styled from 'styled-components';
import { Fragment } from 'react';

export interface PageStartSectionProps {
  content: React.ReactNode;
  rightContent?: React.ReactNode;
}

const Wrapper = styled(Card)`
  margin-bottom: 8px;
`;

const HeaderContent = styled.div`
  margin: 10px 16px;
  color: ${(props) => props.theme.palette.text.secondary};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderCard: React.FC<PageStartSectionProps> = ({ content, rightContent }) => {
  return (
    <Wrapper key="stats">
      <HeaderContent>
        <Typography variant="subtitle2">{content}</Typography>
        {rightContent || <Fragment />}
      </HeaderContent>
    </Wrapper>
  );
};
