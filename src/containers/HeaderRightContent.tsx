import React, { Fragment } from 'react';
import { useGetBalanceQuery, useOnAchievementCreatedSubscription } from '../generated/apollo';
import _ from 'lodash';

export const HeaderRightContent = () => {
  const { data, loading, refetch } = useGetBalanceQuery();
  useOnAchievementCreatedSubscription({
    onSubscriptionData: () => refetch()
  });

  const isLoaded = !loading && !_.isNil(data?.balance);

  return <Fragment>{isLoaded ? `Balance: ${data?.balance}` : ''}</Fragment>;
};
