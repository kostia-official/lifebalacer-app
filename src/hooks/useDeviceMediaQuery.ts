import { useMediaQuery } from 'react-responsive';
import { breakpoint } from '../common/breakpoints';

export const useDeviceMediaQuery = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoint})` });

  return { isDesktop: !isMobile, isMobile };
};
