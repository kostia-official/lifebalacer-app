import React from 'react';
import { Plugins } from '@capacitor/core';
import { useMount } from 'react-use';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

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

document.addEventListener(
  'deviceready',
  async () => {
    await MobileAccessibility.setTextZoom(100);
  },
  false
);

export const CapacitorProvider: React.FC = ({ children }) => {
  useMount(() => {
    (async () => {
      await SplashScreen.hide();
    })();
  });

  return <>{children}</>;
};
