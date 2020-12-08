import LogRocket from 'logrocket';
import { config } from '../common/config';

class LogSender {
  init() {
    if (config.isDev) return;

    LogRocket.init('ofbhya/lifebalancer', {
      dom: { isEnabled: false }
    });
  }

  setUserId(userId: string) {
    LogRocket.identify(userId);
  }
}

export const logSender = new LogSender();
