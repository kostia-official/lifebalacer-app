import { useState, useEffect } from 'react';
import { persistCache } from '../apollo/cache';

export const useLoadCache = () => {
  const [isCacheLoaded, setIsCacheLoaded] = useState(persistCache.isLoaded);

  useEffect(() => {
    (async () => {
      if (persistCache.isLoaded) {
        return setIsCacheLoaded(true);
      }

      await persistCache.load();
      setIsCacheLoaded(true);
    })();
  }, []);

  return { isCacheLoaded };
};
