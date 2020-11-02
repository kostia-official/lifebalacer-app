import React from 'react';
import { Fab, Icon, FabProps } from '@material-ui/core';
import styled from 'styled-components';
import { PartialBy } from '../common/typeUtils';

export interface IStyleProps {
  bottom?: string;
  right?: string;
}

export interface ISaveFabButtonProps extends FabProps {
  icon?: string;
  styles?: IStyleProps;
}

const Wrapper = styled.div<IStyleProps>`
  position: fixed;
  bottom: ${(props) => props.bottom || '20px'};
  right: ${(props) => props.right || '20px'};
`;

export const FabButton: React.FC<PartialBy<ISaveFabButtonProps, 'children'>> = ({
  icon = 'add',
  styles = {},
  ...fabProps
}) => {
  return (
    <Wrapper {...styles}>
      <Fab color="primary" {...fabProps}>
        <Icon>{icon}</Icon>
      </Fab>
    </Wrapper>
  );
};
