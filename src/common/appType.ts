import { Capacitor } from '@capacitor/core';

export type AppType = 'pwa' | 'cap';
export type PlatformType = 'web' | 'ios' | 'android';

export const getAppType = (): AppType => {
  if (!Capacitor) return 'pwa';

  if (Capacitor.getPlatform() === 'web') return 'pwa';

  return 'cap';
};

export const getPlatform = (): PlatformType => {
  const platformName = Capacitor.getPlatform();
  if (platformName === 'ios') return 'ios';
  if (platformName === 'android') return 'android';

  return 'web';
};
