import * as Ably from 'ably';
import { config } from '../common/config';

export interface CommonData {
  _id: string;
  userId: string;
  appInstanceId?: string;
}

class Pubsub {
  private ably: Ably.Realtime;

  constructor() {
    this.ably = new Ably.Realtime(config.ably.apiKey);
  }

  subscribe(channelName: string, cb: (payload: { data: CommonData }) => void) {
    const channel = this.ably.channels.get(channelName);

    channel.subscribe(cb);
  }

  unsubscribe(channelName: string) {
    const channel = this.ably.channels.get(channelName);

    channel.unsubscribe();
  }
}

export const pubsub = new Pubsub();
