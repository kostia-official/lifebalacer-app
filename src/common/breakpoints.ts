import { SimpleInterpolation } from 'styled-components';

export const breakpoint = '600px';

export const desktopStyles = (content: SimpleInterpolation) => `
  @media (min-width: ${breakpoint}) {
    ${content}
  }
`;

export const mobileStyles = (content: SimpleInterpolation) => `
  @media (max-width: ${breakpoint}) {
    ${content}
  }
`;
