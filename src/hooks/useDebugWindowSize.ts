import { useEffect, useCallback } from 'react';

export const useDebugWindowSize = () => {
  const logSize = useCallback(() => {
    console.info('window.screen.height', window.screen.height);
    console.info('window.screen.availHeight', window.screen.availHeight);
    console.info('window.innerHeight', window.innerHeight);
    console.info('window.outerHeight', window.outerHeight);
    console.info('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
    console.info('document.documentElement.clientHeight', document.documentElement.clientHeight);
    console.info('document.documentElement.scrollHeight', document.documentElement.scrollHeight);
  }, []);

  useEffect(() => {
    logSize();

    if (document.documentElement.clientHeight < document.documentElement.scrollHeight) {
      window.location.reload();
    }
  }, [logSize]);

  return { logSize };
};
