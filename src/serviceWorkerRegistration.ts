// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

import { Workbox } from 'workbox-window';
import { history } from './index';
import { isShowAppUpdateDialogVar } from "./reactiveState";
import { config } from "./common/config";

navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.url) {
    history.push(event.data.url);
  }
});

export const register = () => {
  if (!config.isDev && 'serviceWorker' in navigator) {
    const wb = new Workbox('service-worker.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        isShowAppUpdateDialogVar(true);
      }
    });

    wb.register();
  }
};