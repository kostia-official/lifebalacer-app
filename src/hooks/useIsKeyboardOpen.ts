import { useEffect, useState } from 'react';

export const useIsKeyboardOpen = (): boolean => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const listener = () => {
      setIsOpen(window.innerHeight < windowHeight);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [windowHeight]);

  return isOpen;
};
