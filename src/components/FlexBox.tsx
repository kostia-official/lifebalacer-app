import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box/Box';
import styled, { css } from 'styled-components';

export interface FlexBoxProps extends BoxProps {
  gap?: number;
  gapX?: number;
  gapY?: number;
  centerX?: boolean;
  centerY?: boolean;
  column?: boolean;
  row?: boolean;
}

const StyledBox = styled(Box)<{
  $gap?: number;
  $gapX?: number;
  $gapY?: number;
}>`
  ${(p) =>
    p.$gap &&
    css`
      gap: ${p.$gap}px;
    `};

  ${(p) =>
    p.$gapX &&
    css`
      column-gap: ${p.$gapX}px;
    `};

  ${(p) =>
    p.$gapY &&
    css`
      row-gap: ${p.$gapY}px;
    `};
`;

export const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  gap,
  gapX,
  gapY,
  centerX,
  centerY,
  column,
  row,
  ...boxProps
}) => {
  const flexDirectionProp = useMemo(() => {
    if (column) return { flexDirection: 'column' };
    if (row) return { flexDirection: 'row' };

    return {};
  }, [column, row]);

  const centeringProps = useMemo(() => {
    const props: BoxProps = {};

    if ((row && centerX) || (column && centerY)) {
      props.justifyContent = 'center';
    }
    if ((row && centerY) || (column && centerX)) {
      props.alignItems = 'center';
    }

    return props;
  }, [centerX, centerY, column, row]);

  return (
    <StyledBox
      display="flex"
      {...flexDirectionProp}
      {...centeringProps}
      {...boxProps}
      $gap={gap}
      $gapX={gapX}
      $gapY={gapY}
    >
      {children}
    </StyledBox>
  );
};
