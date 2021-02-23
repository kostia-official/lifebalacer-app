import React from 'react';
import styled, { SimpleInterpolation } from 'styled-components';
import { Icon } from '@iconify/react';

import baselineDateRange from '@iconify-icons/ic/baseline-date-range';

export interface TabBarIconProps {
  color: string;
  icon: typeof baselineDateRange;
  iconInactive?: typeof baselineDateRange;
  isActive?: boolean;
  inactiveStyle?: SimpleInterpolation;
}
const IconWrapper = styled.div<{ $iconColor: string; $extraStyle?: SimpleInterpolation }>`
  color: ${(p) => p.$iconColor};
  margin-bottom: -4px;

  ${(p) => p.$extraStyle}
`;

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  color,
  icon = baselineDateRange,
  iconInactive,
  isActive,
  inactiveStyle
}) => {
  return (
    <IconWrapper $iconColor={color} $extraStyle={isActive ? '' : inactiveStyle}>
      <Icon icon={!isActive && iconInactive ? iconInactive : icon} height={24} width={24} />
    </IconWrapper>
  );
};
