import React from 'react';
import styled from 'styled-components';

export interface CenterProps {
  margin?: string;
}

const Wrapper = styled.div<CenterProps>`
  display: flex;
  justify-content: center;
  width: 100%;

  text-align: center;

  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
`;

export const Center: React.FC<CenterProps> = ({ children, margin }) => {
  return <Wrapper margin={margin}>{children}</Wrapper>;
};
