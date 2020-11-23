import { useEffect } from 'react';
import { pubsub } from '../services/pubsub';

export interface HookParams {
  onEvent: () => void;
  userId: string;
}

export const useOnEntryUpdated = ({ onEvent, userId }: HookParams) => {
  useEffect(() => {
    if (!userId) return;

    const channelName = `ENTRY_UPDATED_${userId}`;

    pubsub.subscribe(channelName, onEvent);

    return () => {
      pubsub.unsubscribe(channelName);
    };
  }, [onEvent, userId]);
};
