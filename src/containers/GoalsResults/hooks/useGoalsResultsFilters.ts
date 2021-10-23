import { DurationType } from '../../../generated/apollo';
import { makeLocalStorageState } from '../../../hooks/makeLocalStorageState';

export interface GoalsResultsFilters {
  duration?: DurationType;
  goalsIds: string[];
}

const useFilters = makeLocalStorageState<GoalsResultsFilters>('goalResultsFilters', {
  duration: undefined,
  goalsIds: []
});

export const useGoalsResultsFilters = () => {
  const [filters, setFilters, clearFilters] = useFilters();

  const count = filters
    ? Object.values(filters).reduce((acc, filter) => {
        if (Array.isArray(filter) && filter.length > 0) return acc + 1;
        if (!Array.isArray(filter) && filter) return acc + 1;

        return acc;
      }, 0)
    : 0;

  return { filters: { ...filters }, setFilters, clearFilters, count };
};
