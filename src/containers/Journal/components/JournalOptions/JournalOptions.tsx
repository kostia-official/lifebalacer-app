import React from 'react';
import { makePersistOptions } from '../../../../hooks/makePersistOptions';
import { OptionsFabButton } from '../../../../components/OptionsFabButton';
import { Modal } from '../../../../components/Modal';
import { JournalOptionsModalBody } from './components/JournalOptionsModalBody';
import { makeModal } from '../../../../hooks/makeModal';
import { useActivities } from '../../../../hooks/apollo/useActivities';

export interface JournalMediaOptionsData {
  isWithImages: boolean;
  isWithVideos: boolean;
}

export interface JournalOptionsData extends JournalMediaOptionsData {
  activityId: string | undefined;
}

export const useJournalOptions = makePersistOptions<JournalOptionsData>('journalOptions', {
  activityId: undefined,
  isWithImages: false,
  isWithVideos: false
});

export const useJournalOptionsModal = makeModal();

export const JournalOptions: React.FC = () => {
  const { openModal, open, closeModal } = useJournalOptionsModal();
  const { count } = useJournalOptions();
  const { allActivities } = useActivities();

  return (
    <>
      <OptionsFabButton onClick={openModal} count={count} />

      <Modal onClose={closeModal} open={open}>
        {open && <JournalOptionsModalBody allActivities={allActivities} />}
      </Modal>
    </>
  );
};
