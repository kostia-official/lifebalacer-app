import React, { useMemo, Fragment } from 'react';
import styled from 'styled-components';
import { Typography, IconButton, Icon, Tooltip } from '@material-ui/core';
import { getColorsOfRange } from '../../helpers/color';
import _ from 'lodash';
import { grey } from '@material-ui/core/colors';

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

const IconStyled = styled(Icon)`
  color: ${grey[400]};
`;

export interface ValueGradientProps {
  min: number;
  max: number;
  isReverseColors: boolean;
  onReverseColors: (isReverseColors: boolean) => void;
}

export const ValueGradient: React.FC<ValueGradientProps> = ({
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
          <IconStyled>swap_horiz</IconStyled>
        </IconButtonStyled>
      </Tooltip>
    </Wrapper>
  );
};
