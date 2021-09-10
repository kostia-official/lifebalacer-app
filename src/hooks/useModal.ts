import { useCallback } from 'react';
import { makeGlobalState } from './makeGlobalState';

export const makeModal = <T>() => {
  const useOpen = makeGlobalState<boolean>(false);
  const useData = makeGlobalState<T | undefined>(undefined);

  return () => {
    const [open, setOpen] = useOpen();
    const [data, setData] = useData();

    const openModal = useCallback(
      (data?: T) => {
        if (data) setData(data);

        setOpen(true);
      },
      [setData, setOpen]
    );

    const closeModal = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const toggleModal = useCallback(() => {
      setOpen((prev) => !prev);
    }, [setOpen]);

    return { openModal, toggleModal, closeModal, open, data };
  };
};
