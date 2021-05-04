import { useEffect } from 'react';

export const useDebugTabBarJump = () => {
  const printTop = (tabParent?: HTMLElement | null, name?: string) => {
    if (!tabParent) return;

    const { offsetTop, clientTop, scrollTop } = tabParent;
    console.info(`${name} style`, { offsetTop, clientTop, scrollTop });
  };

  useEffect(() => {
    const tab = document.querySelector('[data-testid="lb-tab-bar"]');
    const tabParent = tab?.parentElement;

    printTop(tabParent, 'tabParent');
    printTop(tabParent?.parentElement, 'tabBar');
  }, []);
};
