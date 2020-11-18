import _ from 'lodash';
import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../generated/apollo';

export const HeaderRightContent = () => {
  const { data: balanceData } = useGetBalanceQuery();

  if (_.isNil(balanceData?.balance)) return <Fragment />;

  return <Fragment>{`Points: ${balanceData?.balance}`}</Fragment>;
};
