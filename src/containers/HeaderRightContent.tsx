import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../generated/apollo';

export const HeaderRightContent = () => {
  const { data: balanceData, loading: isBalanceLoading } = useGetBalanceQuery();

  if (isBalanceLoading || !balanceData?.balance) return <Fragment />;

  return <Fragment>{`Balance: ${balanceData?.balance}`}</Fragment>;
};
