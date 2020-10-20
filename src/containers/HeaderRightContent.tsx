import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../generated/apollo';

export const HeaderRightContent = () => {
  const { data: balanceData } = useGetBalanceQuery({
    fetchPolicy: 'cache-and-network'
  });

  if (!balanceData?.balance) return <Fragment />;

  return <Fragment>{`Balance: ${balanceData?.balance}`}</Fragment>;
};
