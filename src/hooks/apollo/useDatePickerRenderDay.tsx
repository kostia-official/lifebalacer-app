import React, { useCallback } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ExtendButtonBase } from '@material-ui/core/ButtonBase';
import { IconButtonTypeMap } from '@material-ui/core/IconButton/IconButton';
import { DateTime } from 'luxon';
import { transparentize } from 'polished';
import { Spinner } from '../../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { FlexBox } from '../../components/FlexBox';
import { DayPayload } from './useDatePickerRenderDayExtremes';
import { Icon } from '@iconify/react';
import playCircle from '@iconify/icons-fa/play-circle';

export interface UseDatePickerRenderDayProps {
  onRenderDay: (
    date: DateTime,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => DayPayload;
  isLoading: boolean;
}

interface DayButtonProps extends ExtendButtonBase<IconButtonTypeMap> {
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $markColor?: string;
  $imageSrc?: string | null;
  $withShadow?: boolean;
}

const DayButton = styled(IconButton)<DayButtonProps>`
  width: 36px;
  height: 36px;
  margin: 1px 2px;
  color: ${(p) => (p.$isCurrentMonth ? 'inherit' : '#5b5b5b')};
  background-color: ${(p) => (p.$isToday && p.$isCurrentMonth ? 'darkslategrey' : 'inherit')};

  ::after {
    content: ' ';
    border-radius: 50%;
    background-size: cover;
    background-image: ${(p) => (p.$imageSrc ? `url("${p.$imageSrc}")` : 'none')};
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: ${(p) => (p.$isCurrentMonth ? '100%' : '20%')};
  }

  text-shadow: ${(p) => (p.$withShadow ? '1px 1px 1px black, 0 0 1px black' : 'none')};

  svg {
    filter: ${(p) =>
      p.$withShadow ? `drop-shadow(1px 1px 1px #4e4e4e) drop-shadow(0 0 1px black)` : 'none'};
  }

  border: 2px solid
    ${(p) => transparentize(p.$isCurrentMonth ? 0 : 0.8, p.$markColor || 'transparent')};
  border-radius: 50%;
`;

const DayText = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;

const SpinnerWrapper = styled.div`
  position: absolute;

  top: 100px;

  left: 50%;
  transform: translate(-50%, -50%);
`;

const DescriptionIconStyled = styled(FontAwesomeIcon)`
  margin-top: 1px;
  font-size: 9px;
`;

const VideoIcon = styled(Icon)`
  max-height: 9px;
  max-width: 9px;
`;

export const useDatePickerRenderDay = ({ onRenderDay, isLoading }: UseDatePickerRenderDayProps) => {
  const renderDay = useCallback(
    (
      date: MaterialUiPickersDate,
      selectedDate: MaterialUiPickersDate,
      dayInCurrentMonth: boolean,
      dayComponent: JSX.Element
    ) => {
      if (isLoading) {
        return (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        );
      }

      if (!date) return dayComponent;

      const { color, highlightResults, imageSrc } = onRenderDay(
        date,
        selectedDate,
        dayInCurrentMonth,
        dayComponent
      );

      const { isHighlightWithDescription, isHighlightWithVideo, isHighlightWithImage } =
        highlightResults || {};
      const withShadow = dayInCurrentMonth && isHighlightWithImage && !!imageSrc;

      return (
        <DayButton
          $isCurrentMonth={dayInCurrentMonth}
          $isToday={dayComponent.props.current}
          $markColor={color}
          $imageSrc={imageSrc}
          $withShadow={withShadow}
          name=""
        >
          <FlexBox column centerX centerY>
            <DayText> {date.get('day')} </DayText>

            <FlexBox row centerY centerX gap={2}>
              {isHighlightWithVideo && <VideoIcon icon={playCircle} />}
              {isHighlightWithDescription && <DescriptionIconStyled icon={faComment} />}
            </FlexBox>
          </FlexBox>
        </DayButton>
      );
    },
    [isLoading, onRenderDay]
  );

  return { renderDay };
};
