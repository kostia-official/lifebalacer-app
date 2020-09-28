import { useGetDaysStatisticQuery } from '../generated/apollo';
import pluralize from 'pluralize';

export const useDaysStatisticText = () => {
  const { data, loading: isStatisticLoading } = useGetDaysStatisticQuery();
  const statistic = data?.daysStatistic;

  if (!statistic) return { statisticText: '', isStatisticLoading };

  const statisticText =
    statistic?.streak > 0
      ? `Streak: ${statistic.streak} ${pluralize('day', statistic.streak)}`
      : `Missing: ${statistic.missing} ${pluralize('day', statistic.missing)}`;

  return { statisticText, isStatisticLoading };
};
