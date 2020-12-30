import { useEffect, useCallback, useState } from 'react';
import { pubsub } from '../services/pubsub';
import { authService } from '../services/auth0';
// @ts-ignore
import { usePageVisibility } from 'react-page-visibility';

export type PromiseFn = () => Promise<unknown>;

export const useOnUpdate = (channelPrefix: string, toCall: PromiseFn[] = []) => {
  const userId = authService.getUserId();
  const [isRefetching, setIsRefetching] = useState(false);

  const onUpdate = useCallback(async () => {
    try {
      setIsRefetching(true);

      await Promise.all(toCall.map(async (fn) => await fn()));
    } finally {
      setIsRefetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...toCall]);

  const isVisible = usePageVisibility();

  useEffect(() => {
    if (isVisible) onUpdate();
  }, [isVisible, onUpdate]);

  useEffect(() => {
    if (!userId) return;

    const channelName = `${channelPrefix}_${userId}`;

    pubsub.subscribe(channelName, () => onUpdate());

    return () => {
      pubsub.unsubscribe(channelName);
    };
  }, [channelPrefix, onUpdate, userId]);

  return { isRefetching };
};
