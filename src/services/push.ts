import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported as getIsSupported } from 'firebase/messaging';

import { config } from '../common/config';
import { Messaging } from 'firebase/messaging';

class Push {
  private readonly messaging: Messaging;

  constructor(config: object) {
    const app = initializeApp(config);

    this.messaging = getMessaging(app);
  }

  async getToken(): Promise<string | null> {
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );
    const isSupported = await getIsSupported();
    if (!this.messaging || !isSupported) return null;

    try {
      return await getToken(this.messaging, {
        vapidKey: config.firebase.vapidKey,
        serviceWorkerRegistration
      });
    } catch (err) {
      return null;
    }
  }
}

export const pushService = new Push(config.firebase.config);
