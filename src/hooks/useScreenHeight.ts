import { useDeviceMediaQuery } from './useDeviceMediaQuery';
import { useAuth } from './useAuth';
import { useWindowDimensions } from 'react-native';

export const useScreenHeight = (): string => {
  const { isDesktop } = useDeviceMediaQuery();
  const { isAuthenticated } = useAuth();
  const { height } = useWindowDimensions();

  const appBarSize = isDesktop ? 64 : 56;

  if (!isAuthenticated || isDesktop) return `${height - appBarSize}px`;

  return `${height}px`;
};
