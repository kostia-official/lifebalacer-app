import styled from 'styled-components';

export interface EmptyBlockProps {
  height?: number;
  width?: number;
}

export const EmptyBlock = styled.div<EmptyBlockProps>`
  min-height: ${(props) => props.height || 0}px;
  min-width: ${(props) => props.width || 0}px;
`;
