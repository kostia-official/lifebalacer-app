import React from 'react';
import { Fab, Icon, FabProps, Badge } from '@material-ui/core';
import styled from 'styled-components';
import { PartialBy } from '../common/typeUtils';
import { useIsKeyboardOpen } from '../hooks/useIsKeyboardOpen';
import { Showable } from './Showable';

export interface IStyleProps {
  bottom?: string;
  right?: string;
}

export interface ISaveFabButtonProps extends FabProps {
  icon?: string;
  isShowBadge?: boolean;
  styles?: IStyleProps;
}

const Wrapper = styled.div<IStyleProps>`
  position: fixed;
  bottom: ${(props) => props.bottom || '70px'};
  right: ${(props) => props.right || '26px'};
  z-index: 200;
`;

export const EmptySpaceUnderFab = styled.div`
  height: 86px;
`;

export const FabButton: React.FC<PartialBy<ISaveFabButtonProps, 'children'>> = ({
  icon = 'add',
  isShowBadge = false,
  styles = {},
  ...fabProps
}) => {
  const isKeyboardOpen = useIsKeyboardOpen();

  return (
    <Showable isShow={!isKeyboardOpen}>
      <Wrapper {...styles}>
        <Badge
          color="secondary"
          overlap="circle"
          variant="dot"
          invisible={!isShowBadge}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <Fab color="primary" {...fabProps}>
            <Icon>{icon}</Icon>
          </Fab>
        </Badge>
      </Wrapper>
    </Showable>
  );
};
