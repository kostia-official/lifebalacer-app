import React from 'react';
import { Typography } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { mobileStyles } from '../../common/breakpoints';

export interface ValueBlockProps {
  value?: number | string | null;
  text: string;
  subText?: string;
  icon?: React.ReactElement;
  valueInterval?: number;
}

const NumberBlockPaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 60px;
  min-width: 150px;
`;

const ValueWrapper = styled.div<{ valueInterval?: number }>`
  display: flex;
  align-items: center;

  margin-bottom: ${(p) => p.valueInterval || 5}px;
`;

const IconWrapper = styled.span`
  margin-left: 4px;
  font-size: 30px;
  line-height: 0.8;
`;

const Text: typeof Typography = styled(Typography)`
  line-height: 1.5;
  text-align: center;

  ${mobileStyles(css`
    width: 150px;
  `)}
`;

const SubText = styled(Typography)`
  font-size: 0.68rem;
  line-height: 1.5;
  text-align: center;
  margin-top: 6px;

  @media (max-width: 380px) {
    font-size: 0.6rem;
  }
`;

export const ValueBlock: React.FC<ValueBlockProps> = ({
  value = 0,
  text,
  subText,
  icon,
  valueInterval
}) => {
  return (
    <NumberBlockPaper>
      <ValueWrapper valueInterval={valueInterval}>
        <Typography variant="h5">{value ?? '—'}</Typography>
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </ValueWrapper>
      <Text variant="overline">{text}</Text>
      {subText && <SubText variant="overline">{subText}</SubText>}
    </NumberBlockPaper>
  );
};
