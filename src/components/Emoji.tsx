import React from 'react';
import styled from 'styled-components';
import { isIOS, isMacOs } from 'react-device-detect';
import { toRem } from '../helpers/toRem';
import image from '../assets/pig-face_1f437.png';

interface EmojiProps {
  size?: number;
}

const isApple = isIOS || isMacOs;

// Try make emojis look the same on all devices
const Wrapper = styled.span`
  margin: 4px 4px 4px 0;
  display: inline-block;
`;

const Span = styled.span<EmojiProps>`
  font-size: ${(p) => p.size || 20}px;
`;

export const Emoji: React.FC<EmojiProps> = ({ children, size }) => {
  return (
    <Wrapper>
      <Span>{children}</Span>
    </Wrapper>
  );
};
