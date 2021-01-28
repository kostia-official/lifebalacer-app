import styled from 'styled-components';

export interface EmptyBlockProps {
  height?: number;
  width?: number;
}

export const EmptyBlock = styled.div<EmptyBlockProps>`
  height: ${(props) => props.height || 0}px;
  width: ${(props) => props.width || 0}px;
`;
