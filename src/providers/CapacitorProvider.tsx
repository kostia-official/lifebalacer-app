import React from 'react';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

App.addListener('appUrlOpen', async ({ url }) => {
  if (url) {
    try {
      await Browser.close();
    } catch (e) {}

    const { origin } = new URL(url);

    window.window.location.href = url.replace(origin, '');
  }
});

const configureBrowser = async () => {
  window.open = (url) => {
    if (url) Browser.open({ url });

    return window;
  };
};

document.addEventListener(
  'deviceready',
  async () => {
    await configureBrowser();
  },
  false
);

export const CapacitorProvider: React.FC = ({ children }) => {
  return <>{children}</>;
};
