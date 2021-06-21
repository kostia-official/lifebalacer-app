import React, { Fragment } from 'react';
import styled from 'styled-components';

export interface ShowableProps {
  isShow: boolean;
  unmountOnHide?: boolean;
}

const ShowableWrapper = styled.div<{ $isShow: boolean }>`
  display: ${(p) => (p.$isShow ? 'inherit' : 'none')};
`;

export const Showable: React.FC<ShowableProps> = ({ isShow, unmountOnHide = false, children }) => {
  if (unmountOnHide) {
    return <Fragment>{isShow ? children : null}</Fragment>;
  }

  return <ShowableWrapper $isShow={isShow}>{children}</ShowableWrapper>;
};
