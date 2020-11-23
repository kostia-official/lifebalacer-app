import firebase from 'firebase/app';

import 'firebase/messaging';
import { config } from '../common/config';

class Push {
  private readonly messaging: firebase.messaging.Messaging | undefined;
  public readonly isSupported;

  constructor(config: object) {
    firebase.initializeApp(config);

    this.isSupported = firebase.messaging.isSupported();

    if (this.isSupported) {
      this.messaging = firebase.messaging();
    }
  }

  async getToken(): Promise<string | null> {
    if (!this.isSupported || !this.messaging) return null;

    try {
      return await this.messaging.getToken({ vapidKey: config.firebase.vapidKey });
    } catch (err) {
      return null;
    }
  }
}

export const pushService = new Push(config.firebase.config);
