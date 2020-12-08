import LogRocket from 'logrocket';
import { config } from '../common/config';

class LogSender {
  init() {
    if (config.isDev) return;

    LogRocket.init('ofbhya/lifebalancer', {
      dom: {
        isEnabled: false
      }
    });
  }
}

export const logSender = new LogSender();
