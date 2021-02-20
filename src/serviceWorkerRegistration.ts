import { Workbox } from 'workbox-window';
import { history } from './index';
import { isShowAppUpdateDialogVar } from './reactiveState';
import { config } from './common/config';

navigator?.serviceWorker?.addEventListener('message', (event) => {
  if (event.data.url) {
    history.push(event.data.url, { isPush: true });
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
