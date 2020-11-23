import { useGetDaysStatisticQuery } from '../generated/apollo';
import pluralize from 'pluralize';
import { OnErrorParams } from './useApolloError';

export const useDaysStatisticText = ({ onError }: OnErrorParams = {}) => {
  const { data, loading: isStatisticLoading, refetch } = useGetDaysStatisticQuery({
    onError
  });
  const statistic = data?.daysStatistic;

  if (!statistic) return { statisticText: 'Loading...', isStatisticLoading, refetch };

  const statisticText =
    statistic?.streak > 0
      ? `Streak: ${statistic.streak} ${pluralize('day', statistic.streak)}`
      : `Missing: ${statistic.missing} ${pluralize('day', statistic.missing)}`;

  return { statisticText, isStatisticLoading, refetch };
};
