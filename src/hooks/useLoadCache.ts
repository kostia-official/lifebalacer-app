import { useState, useEffect } from 'react';
import { loadCache } from '../apollo';

export const useLoadCache = () => {
  const [isCacheLoading, setIsCacheLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await loadCache();
      setIsCacheLoading(false);
    })();
  }, []);

  return { isCacheLoading };
};
