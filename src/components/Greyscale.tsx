import styled from 'styled-components';

export const Greyscale = styled.div<{ isEnable?: boolean }>`
  ${({ isEnable = true }) => (isEnable ? 'filter: grayscale(100%);' : '')}
`;
