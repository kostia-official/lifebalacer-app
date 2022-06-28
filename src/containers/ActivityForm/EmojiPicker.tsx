import React, { useCallback, useMemo } from 'react';
import { MainColors } from '../../common/colors';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import styled from 'styled-components';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Showable } from '../../components/Showable';
import { emojiSet } from '../../components/Emoji';

const EmojiPickerWrapper = styled.div`
  z-index: 500;
`;

export interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  setIsShow: (isShow: boolean) => void;
  ignoreClassClickOutside?: string;
  isShow: boolean;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = React.memo(
  ({ onSelect, setIsShow, ignoreClassClickOutside, isShow }) => {
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

    return useMemo(() => {
      return (
        <Showable isShow={isShow}>
          <EmojiPickerWrapper ref={ref}>
            <Picker
              color={MainColors.Primary}
              theme="dark"
              useButton={false}
              onSelect={onPick}
              style={{ position: 'absolute', right: 0 }}
              set={emojiSet}
            />
          </EmojiPickerWrapper>
        </Showable>
      );
    }, [isShow, onPick, ref]);
  }
);
