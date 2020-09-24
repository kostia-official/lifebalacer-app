import React, { Fragment } from 'react';
import { useGetBalanceQuery, useGetDaysStatisticQuery } from '../generated/apollo';

export const HeaderRightContent = () => {
  const { data: balanceData, loading: isBalanceLoading } = useGetBalanceQuery();
  const { data: statisticData, loading: isStatisticLoading } = useGetDaysStatisticQuery();
  const statistic = statisticData?.daysStatistic;

  const isLoading = isBalanceLoading || isStatisticLoading;

  if (isLoading || !statistic || !balanceData?.balance) return <Fragment />;

  const statisticText =
    statistic?.streak > 0 ? `Streak: ${statistic?.streak}` : `Missing: ${statistic.missing}`;

  return <Fragment>{`${statisticText}, Balance: ${balanceData?.balance}`}</Fragment>;
};
