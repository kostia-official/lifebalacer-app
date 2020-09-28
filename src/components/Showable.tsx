import React from 'react';
import styled from 'styled-components';

export interface ShowableProps {
  isShow: boolean;
}

const ShowableWrapper = styled.div<ShowableProps>`
  display: ${(props: ShowableProps) => (props.isShow ? 'inherit' : 'none')};
`;

export const Showable: React.FC<ShowableProps> = ({ isShow, children }) => {
  return <ShowableWrapper isShow={isShow}>{children}</ShowableWrapper>;
};
