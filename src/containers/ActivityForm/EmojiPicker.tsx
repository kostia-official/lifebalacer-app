import React, { useCallback } from 'react';
import { MainColors } from '../../common/colors';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import styled from 'styled-components';
import useOnclickOutside from 'react-cool-onclickoutside';

const EmojiPickerWrapper = styled.div`
  z-index: 500;
`;

export interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  setIsShow: (isShow: boolean) => void;
  ignoreClassClickOutside?: string;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  setIsShow,
  ignoreClassClickOutside
}) => {
  const ref = useOnclickOutside(
    (e) => {
      setIsShow(false);
      e.stopPropagation();
    },
    ignoreClassClickOutside ? { ignoreClass: ignoreClassClickOutside } : {}
  );

  const onPick = useCallback(
    (emojiData) => {
      if ('native' in emojiData) {
        const emoji: string = emojiData.native;
        onSelect(emoji);
      }
    },
    [onSelect]
  );

  return (
    <EmojiPickerWrapper ref={ref}>
      <Picker
        title=""
        color={MainColors.Primary}
        theme="dark"
        useButton={false}
        onSelect={onPick}
        style={{ position: 'absolute' }}
      />
    </EmojiPickerWrapper>
  );
};
