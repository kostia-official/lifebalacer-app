import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box/Box';
import { EmptyBlock } from './EmptyBlock';

export interface SpacerProps extends BoxProps {
  spacingX?: number;
  spacingY?: number;
  flex?: boolean;
  column?: boolean;
  row?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({
  children,
  spacingX,
  spacingY,
  flex,
  column,
  row,
  ...boxProps
}) => {
  const childrenArr = useMemo(() => {
    return React.Children.toArray(children).filter((child: unknown) => {
      // Filter out "null" children
      return !!child;
    });
  }, [children]);

  const flexDirectionProp = useMemo(() => {
    if (column) return { flexDirection: 'column' };
    if (row) return { flexDirection: 'row' };

    return {};
  }, [column, row]);

  return (
    <Box display={flex ? 'flex' : 'block'} {...flexDirectionProp} {...boxProps}>
      {childrenArr.map((child, idx, arr) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={idx}>
            {child}
            {(spacingX || spacingY) && idx < arr.length - 1 && (
              <EmptyBlock width={spacingX} height={spacingY} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
