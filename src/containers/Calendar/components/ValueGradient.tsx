import React, { useMemo, Fragment } from 'react';
import styled from 'styled-components';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import { getColorsOfRange } from '../../../helpers/color';
import _ from 'lodash';
import { grey } from '@material-ui/core/colors';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ActivityFragment } from '../../../generated/apollo';
import { Emoji } from '../../../components/Emoji';
import { FlexBox } from '../../../components/FlexBox';

const Wrapper = styled.div`
  position: relative;
`;

const ChartWrapper = styled.div`
  width: 300px;
  display: flex;

  justify-content: center;
  flex-direction: column;
`;

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  top: -11px;
  left: 300px;
`;

const ExtremesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Gradient = styled.div<{ colors: string[] }>`
  width: 300px;
  height: 28px;
  margin-bottom: 3px;

  background-image: linear-gradient(to right, ${(props) => props.colors.join(',')});
`;

const SwapIcon = styled(SwapHorizIcon)`
  color: ${grey[400]};
`;

export interface ValueGradientProps {
  selectedActivity?: ActivityFragment;
  min: number;
  max: number;
  isReverseColors: boolean;
  onReverseColors: (isReverseColors: boolean) => void;
}

export const ValueGradient: React.FC<ValueGradientProps> = ({
  selectedActivity,
  min,
  max,
  isReverseColors,
  onReverseColors
}) => {
  const colors = useMemo(() => {
    return getColorsOfRange(min, max, isReverseColors);
  }, [min, max, isReverseColors]);

  const isShowOnlyExtremes = max - min > 10;

  // Can't build a gradient in this case
  if (max - min < 1) return <Fragment />;

  return (
    <FlexBox column gap={4} centerX>
      {selectedActivity && (
        <Typography gutterBottom>
          <Emoji>{selectedActivity.emoji}</Emoji>
          {selectedActivity.name} values:
        </Typography>
      )}

      <Wrapper>
        <ChartWrapper>
          <Gradient colors={colors} />
          <ExtremesWrapper>
            {isShowOnlyExtremes ? (
              <Fragment>
                <Typography variant="body2">{min}</Typography>
                <Typography variant="body2">{max}</Typography>
              </Fragment>
            ) : (
              _.range(min, max + 1).map((n) => (
                <Typography variant="body2" key={n}>
                  {Math.round(n)}
                </Typography>
              ))
            )}
          </ExtremesWrapper>
        </ChartWrapper>

        <Tooltip title="Reverse colors">
          <IconButtonStyled onClick={() => onReverseColors(!isReverseColors)}>
            <SwapIcon />
          </IconButtonStyled>
        </Tooltip>
      </Wrapper>
    </FlexBox>
  );
};
