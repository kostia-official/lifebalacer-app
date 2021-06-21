import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';
import * as React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/src/types';
import { Link } from '@react-navigation/native';

const ButtonTab = styled(ButtonBase)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const TabBarButton: React.FC<BottomTabBarButtonProps> = ({
  children,
  style,
  onPress,
  to,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      to={to || '/'}
      style={[style]}
      onPress={(e: any) => {
        if (
          !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
          (e.button == null || e.button === 0) // ignore everything but left clicks
        ) {
          e.preventDefault();
          onPress?.(e);
        }
      }}
    >
      <ButtonTab>{children}</ButtonTab>
    </Link>
  );
};
