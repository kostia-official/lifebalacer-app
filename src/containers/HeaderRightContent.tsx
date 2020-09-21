import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../generated/apollo';
import _ from 'lodash';

export const HeaderRightContent = () => {
  const { data, loading } = useGetBalanceQuery();

  const isLoaded = !loading && !_.isNil(data?.balance);

  return <Fragment>{isLoaded ? `Balance: ${data?.balance}` : ''}</Fragment>;
};
