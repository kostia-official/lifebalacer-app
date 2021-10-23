import React from 'react';
import { Icon } from '@iconify/react';
import outlineFilterAlt from '@iconify/icons-ic/outline-filter-alt';
import baselineFilterAlt from '@iconify/icons-ic/baseline-filter-alt';
import { FabButton } from '../../../components/FabButton';
import { useSelectGoalModal, SelectGoalModal } from './SelectGoalModal';
import { useGoalsResultsFilters } from '../hooks/useGoalsResultsFilters';

export const GoalsResultsFilters: React.FC = () => {
  const { openModal: openSelectGoalModal } = useSelectGoalModal();
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

      <SelectGoalModal />
    </>
  );
};
