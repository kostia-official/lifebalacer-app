import React from 'react';
import { Icon } from '@iconify/react';
import bxsLock from '@iconify/icons-bx/bxs-lock';
import { Box, Button } from '@material-ui/core';
import { useNavigationHelpers } from '../../../hooks/useNavigationHelpers';
import styled from 'styled-components';

type Size = 'medium' | 'small';

export interface LockedFeatureProps {
  size?: Size;
}

const Block = styled.div<{ $size: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const boxSize: Record<Size, number> = {
  small: 106,
  medium: 140
};

const mapIconSize: Record<Size, number> = {
  small: 60,
  medium: 90
};

export const LockedFeature: React.FC<LockedFeatureProps> = ({ size = 'medium' }) => {
  const { goForwardToCb } = useNavigationHelpers();

  return (
    <Block $size={boxSize[size]}>
      <Icon icon={bxsLock} width={mapIconSize[size]} />

      <Box marginTop={0.5}>
        <Button size="small" onClick={goForwardToCb('PremiumPlan')}>
          Unlock
        </Button>
      </Box>
    </Block>
  );
};
