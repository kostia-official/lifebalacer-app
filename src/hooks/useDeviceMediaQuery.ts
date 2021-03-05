import { useMediaQuery } from 'react-responsive';

export const useDeviceMediaQuery = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

  return { isDesktop: !isMobile, isMobile };
};
