import React from 'react';
import { Plugins, SplashScreen } from '@capacitor/core';
import { useMount } from 'react-use';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

const { App } = Plugins;

App.addListener('appUrlOpen', async ({ url }) => {
  if (url) {
    try {
      await Plugins.Browser.close();
    } catch (e) {}

    window.location.href = url;
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
