import React from 'react';
import { Icon } from '@iconify/react';
import outlineFilterAlt from '@iconify/icons-ic/outline-filter-alt';
import baselineFilterAlt from '@iconify/icons-ic/baseline-filter-alt';
import { FabButton } from '../../../components/FabButton';
import { useSelectGoalModal, SelectGoalModalBody } from './SelectGoalModalBody';
import { useGoalsResultsFilters } from '../hooks/useGoalsResultsFilters';
import { Dialog } from '@material-ui/core';

export const GoalsResultsFilters: React.FC = () => {
  const { openModal: openSelectGoalModal, open, closeModal } = useSelectGoalModal();
  const { count } = useGoalsResultsFilters();

  return (
    <>
      <FabButton
        onClick={() => openSelectGoalModal()}
        icon={<Icon icon={count ? baselineFilterAlt : outlineFilterAlt} width={24} />}
        isShowBadge={!!count}
        badgeProps={{
          badgeContent: count,
          variant: 'standard',
          color: 'primary'
        }}
      />

      <Dialog onClose={closeModal} open={open}>
        {open && <SelectGoalModalBody />}
      </Dialog>
    </>
  );
};
