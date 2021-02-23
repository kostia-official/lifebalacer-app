import { useEffect, useState } from 'react';

export const useIsKeyboardOpen = (): boolean => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const listener = () => {
      const inShrinked = window.innerHeight < windowHeight;

      if (inShrinked) {
        if (
          document.getElementsByClassName('Mui-focused')?.length > 0 ||
          document.querySelectorAll('[data-focusvisible-polyfill="true"]')?.length > 0
        ) {
          setIsOpen(true);
        }
      } else {
        setIsOpen(false);
      }

      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [windowHeight]);

  return isOpen;
};
