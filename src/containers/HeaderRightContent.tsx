import _ from 'lodash';
import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../generated/apollo';
import { useOnEntryUpdate } from '../hooks/useOnEntryUpdate';
import { Points } from '../components/Points';

export const HeaderRightContent = () => {
  const { data: balanceData, refetch } = useGetBalanceQuery();

  useOnEntryUpdate([refetch]);

  if (_.isNil(balanceData?.balance)) return <Fragment />;

  return <Points points={balanceData?.balance} pointsSize={20} coinSize={20} />;
};
