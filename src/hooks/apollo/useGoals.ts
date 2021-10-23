import { useGetGoalsQuery, GetGoalsQuery, GetGoalsQueryVariables } from '../../generated/apollo';
import * as Apollo from '@apollo/client';
import { useMemo } from 'react';

export const useGoals = (
  baseOptions?: Apollo.QueryHookOptions<GetGoalsQuery, GetGoalsQueryVariables>
) => {
  const { data } = useGetGoalsQuery(baseOptions);
  const allGoals = data?.goals;

  const archivedGoals = useMemo(() => {
    return allGoals?.filter(({ isArchived }) => isArchived);
  }, [allGoals]);

  const goals = useMemo(() => {
    return allGoals?.filter(({ isArchived }) => !isArchived);
  }, [allGoals]);

  return { goals, archivedGoals, allGoals };
};
