import { useDeviceMediaQuery } from './useDeviceMediaQuery';
import { useAuth } from './useAuth';
import { useWindowDimensions } from 'react-native';
import { useMount } from 'react-use';

export const useScreenHeight = (): string => {
  const { isDesktop } = useDeviceMediaQuery();
  const { isAuthenticated } = useAuth();
  const { height } = useWindowDimensions();

  const appBarSize = isDesktop ? 64 : 56;

  useMount(() => {
    console.info({ height, appBarSize, isAuthenticated, isDesktop });
  });

  if (!isAuthenticated || isDesktop) return `${height - appBarSize}px`;

  return `${height}px`;
};
