import React from 'react';
import { Modal } from '../../../../components/Modal';
import {
  CalendarFiltersModalBody,
  useCalendarFiltersModal
} from './components/CalendarFiltersModalBody';
import { useActivities } from '../../../../hooks/apollo/useActivities';
import { OptionsFabButton } from '../../../../components/OptionsFabButton';
import { useCalendarFilters } from './hooks/useCalendarFilters';

export const CalendarFilters: React.FC = () => {
  const { openModal, open, closeModal } = useCalendarFiltersModal();
  const { count } = useCalendarFilters();
  const { allActivities } = useActivities();

  return (
    <>
      <OptionsFabButton onClick={openModal} count={count} />

      <Modal onClose={closeModal} open={open}>
        {open && allActivities && <CalendarFiltersModalBody allActivities={allActivities} />}
      </Modal>
    </>
  );
};
