import React from 'react';
import { Plugins } from '@capacitor/core';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { waitForTextZoom } from '../helpers/waitForTextZoom';

const { App, SplashScreen } = Plugins;

App.addListener('appUrlOpen', async ({ url }) => {
  if (url) {
    try {
      await Plugins.Browser.close();
    } catch (e) {}

    const { origin } = new URL(url);

    window.window.location.href = url.replace(origin, '');
  }
});

const configureBrowser = async () => {
  window.open = (url) => {
    if (url) Plugins.Browser.open({ url });

    return window;
  };
};

document.addEventListener(
  'deviceready',
  async () => {
    setTimeout(SplashScreen.hide, 3000); // fallback

    await configureBrowser();

    await MobileAccessibility.setTextZoom(100);
    await waitForTextZoom(100);

    // Give plugin time to apply text zoom
    process.nextTick(SplashScreen.hide);
  },
  false
);

export const CapacitorProvider: React.FC = ({ children }) => {
  return <>{children}</>;
};
