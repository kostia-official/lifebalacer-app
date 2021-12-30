import React from 'react';
import { Modal } from '../../../../components/Modal';
import {
  CalendarOptionsModalBody,
  useCalendarFiltersModal
} from './components/CalendarOptionsModalBody';
import { useActivities } from '../../../../hooks/apollo/useActivities';
import { OptionsFabButton } from '../../../../components/OptionsFabButton';
import { useCalendarOptions } from './hooks/useCalendarOptions';

export const CalendarOptions: React.FC = () => {
  const { openModal, open, closeModal } = useCalendarFiltersModal();
  const { count } = useCalendarOptions();
  const { allActivities } = useActivities();

  return (
    <>
      <OptionsFabButton onClick={openModal} count={count} />

      <Modal onClose={closeModal} open={open}>
        {open && allActivities && <CalendarOptionsModalBody allActivities={allActivities} />}
      </Modal>
    </>
  );
};
