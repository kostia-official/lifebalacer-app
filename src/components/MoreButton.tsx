import React from 'react';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import { toRem } from '../helpers/toRem';

const IconButtonWrapper = styled.div`
  margin: ${toRem(-3)} ${toRem(-2)};
`;

export const MoreButton: typeof IconButton = (props: unknown) => {
  return (
    <IconButtonWrapper>
      <IconButton size="small" {...props}>
        <MoreVertIcon />
      </IconButton>
    </IconButtonWrapper>
  );
};
