import _ from 'lodash';
import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../generated/apollo';
import { useOnEntryUpdate } from '../hooks/useOnEntryUpdate';

export const HeaderRightContent = () => {
  const { data: balanceData, refetch } = useGetBalanceQuery();

  useOnEntryUpdate([refetch]);

  if (_.isNil(balanceData?.balance)) return <Fragment />;

  return <Fragment>{`Points: ${balanceData?.balance}`}</Fragment>;
};
