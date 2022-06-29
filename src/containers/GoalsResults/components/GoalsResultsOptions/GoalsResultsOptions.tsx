import React from 'react';
import { GoalsResultsOptionsModalBody } from './components/GoalsResultsOptionsModalBody';
import { Modal } from '../../../../components/Modal';
import { OptionsFabButton } from '../../../../components/OptionsFabButton';
import { DurationType } from '../../../../generated/apollo';
import { makePersistOptions } from '../../../../hooks/makePersistOptions';
import { makeModal } from '../../../../hooks/makeModal';

export interface GoalsResultsOptionsData {
  duration?: DurationType;
  goalsIds: string[];
}

export const useGoalsResultsOptions = makePersistOptions<GoalsResultsOptionsData>(
  'goalResultsOptions',
  {
    duration: undefined,
    goalsIds: []
  }
);

export const useGoalsResultsOptionsModal = makeModal();

export const GoalsResultsOptions: React.FC = () => {
  const { openModal, open, closeModal } = useGoalsResultsOptionsModal();
  const { count } = useGoalsResultsOptions();

  return (
    <>
      <OptionsFabButton onClick={openModal} count={count} />

      <Modal onClose={closeModal} open={open}>
        {open && <GoalsResultsOptionsModalBody />}
      </Modal>
    </>
  );
};
