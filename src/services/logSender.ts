import LogRocket from 'logrocket';
import { config } from '../common/config';

class LogSender {
  private isUserIdSet: boolean = false;

  init() {
    if (config.isDev) return;

    LogRocket.init('ofbhya/lifebalancer', {
      dom: { isEnabled: false }
    });
  }

  setUserId(userId: string) {
    if (this.isUserIdSet) return;

    LogRocket.identify(userId);
    this.isUserIdSet = true;
  }
}

export const logSender = new LogSender();
