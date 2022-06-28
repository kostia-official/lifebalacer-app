import React from 'react';
import { isIOS, isMacOs } from 'react-device-detect';
import { Emoji as EmojiMart, getEmojiDataFromNative } from 'emoji-mart';
import data from 'emoji-mart/data/all.json';
import { EmojiProps as EmojiMartProps, EmojiSet } from 'emoji-mart/dist-es/utils/shared-props';

const isApple = isIOS || isMacOs;

export const emojiSet: EmojiSet = isApple ? 'apple' : 'google';

export type EmojiProps = Omit<EmojiMartProps, 'emoji' | 'size'> & {
  size?: number | undefined;
};

export const Emoji: React.FC<EmojiProps> = ({ children, size = 16, ...props }) => {
  const emojiData = getEmojiDataFromNative(children as string, emojiSet, data as any);

  if (!emojiData) return null;

  return (
    <EmojiMart set={emojiSet} skin={emojiData.skin || 1} size={size} {...props} emoji={emojiData} />
  );
};
