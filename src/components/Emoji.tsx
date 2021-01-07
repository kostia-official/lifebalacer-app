import React from 'react';
import styled from 'styled-components';
import { isIOS, isMacOs } from 'react-device-detect';

const isApple = isIOS || isMacOs;

// Try make emojis look the same on all devices
const Wrapper = styled.div`
  margin: ${isApple ? '0' : '2px'} ${isMacOs ? '0' : '4px'} ${isApple ? '0' : '2px'} 0;
  display: inline-block;
`;

const Span = styled.span`
  font-size: 16px;
`;

export const Emoji: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Span>{children}</Span>
    </Wrapper>
  );
};
