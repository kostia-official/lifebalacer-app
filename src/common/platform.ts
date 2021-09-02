import { Capacitor } from '@capacitor/core';
import { SubscriptionPlatform } from '../generated/apollo';

export type Platform = 'pwa' | 'cap';
export type PlatformType = 'web' | 'ios' | 'android';

export const subscriptionPlatformMap: Record<PlatformType, SubscriptionPlatform> = {
  web: SubscriptionPlatform.Fondy,
  ios: SubscriptionPlatform.AppStore,
  android: SubscriptionPlatform.GooglePlay
};

export const getAppType = (): Platform => {
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

export const isWeb = (): boolean => {
  return getPlatform() === 'web';
};

export const isNative = (): boolean => {
  return getPlatform() !== 'web';
};

export const getSubscriptionPlatform = (): SubscriptionPlatform => {
  return subscriptionPlatformMap[getPlatform()];
};
