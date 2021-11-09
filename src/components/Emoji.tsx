import React from 'react';
import styled from 'styled-components';
import { isIOS, isMacOs } from 'react-device-detect';

const isApple = isIOS || isMacOs;

// Try make emojis look the same on all devices
const Wrapper = styled.span`
  margin: ${isApple ? '0' : '4px'} ${isMacOs ? '1px' : '4px'} ${isApple ? '0' : '4px'} 0;
  display: inline-block;
`;

const Span = styled.span`
  font-size: 16px;
  color: white;
`;

export const Emoji: React.FC = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Span>{children}</Span>
    </Wrapper>
  );
};
