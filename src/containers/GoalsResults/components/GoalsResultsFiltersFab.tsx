import React from 'react';
import { useSelectGoalModal, SelectGoalModalBody } from './SelectGoalModalBody';
import { Modal } from '../../../components/Modal';
import { OptionsFabButton } from '../../../components/OptionsFabButton';
import { DurationType } from '../../../generated/apollo';
import { makePersistFilters } from '../../../hooks/makePersistFilters';

export interface GoalsResultsFilters {
  duration?: DurationType;
  goalsIds: string[];
}

export const useGoalsResultsFilters = makePersistFilters<GoalsResultsFilters>(
  'goalResultsFilters',
  {
    duration: undefined,
    goalsIds: []
  }
);

export const GoalsResultsFiltersFab: React.FC = () => {
  const { openModal, open, closeModal } = useSelectGoalModal();
  const { count } = useGoalsResultsFilters();

  return (
    <>
      <OptionsFabButton onClick={openModal} count={count} />

      <Modal onClose={closeModal} open={open}>
        {open && <SelectGoalModalBody />}
      </Modal>
    </>
  );
};
