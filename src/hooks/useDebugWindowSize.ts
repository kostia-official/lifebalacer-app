import { useEffect, useCallback } from 'react';

export const useDebugWindowSize = () => {
  const logSize = useCallback(() => {
    console.log('window.screen.height', window.screen.height);
    console.log('window.screen.availHeight', window.screen.availHeight);
    console.log('window.innerHeight', window.innerHeight);
    console.log('window.outerHeight', window.outerHeight);
    console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
    console.log('document.documentElement.clientHeight', document.documentElement.clientHeight);
    console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight);
  }, []);

  useEffect(() => {
    logSize();

    if (document.documentElement.clientHeight < document.documentElement.scrollHeight) {
      window.location.reload();
    }
  }, [logSize]);

  return { logSize };
};
