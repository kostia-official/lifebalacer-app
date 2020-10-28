import { useState, useEffect } from 'react';
import { apolloPersistCache } from '../services/ApolloPersistCache';

export const useLoadCache = () => {
  const [isCacheLoaded, setIsCacheLoaded] = useState(apolloPersistCache.isLoaded);

  useEffect(() => {
    (async () => {
      if (apolloPersistCache.isLoaded) {
        return setIsCacheLoaded(true);
      }

      await apolloPersistCache.load();
      setIsCacheLoaded(true);
    })();
  }, []);

  return { isCacheLoaded };
};
