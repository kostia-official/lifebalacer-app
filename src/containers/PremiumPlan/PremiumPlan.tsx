import { Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useGetPaymentUrlQuery, useGetSubscriptionQuery } from '../../generated/apollo';
import { ScreenWrapper } from '../App/ScreenWrapper';
import styled, { css } from 'styled-components';
import { Center } from '../../components/Center';
import { mobileStyles } from '../../common/breakpoints';
import { EmptyBlock } from '../../components/EmptyBlock';
import { useApolloError } from '../../hooks/useApolloError';
import { PlanCard } from './PlanCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${mobileStyles(css`
    flex-direction: column-reverse;
  `)};
`;

export const PremiumPlan: React.FC = () => {
  const { errorMessage, errorTime, onError } = useApolloError();

  const { data: paymentUrlData } = useGetPaymentUrlQuery({
    variables: { callbackUrl: window.location.href },
    onError
  });
  const url = paymentUrlData?.paymentUrl;

  const { data: subscriptionData } = useGetSubscriptionQuery({ pollInterval: 600, onError });
  const isPremium = subscriptionData?.subscription?.isPremium;

  const onPurchaseClick = useCallback(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  return (
    <ScreenWrapper isLoading={!url} errorMessage={errorMessage} errorTime={errorTime}>
      <Wrapper>
        <PlanCard title="Free Plan" isFreePlan isPremiumActive={!!isPremium}>
          <ul>
            <li>
              <Typography>All functionality for tracking your life</Typography>
            </li>
            <li>
              <Typography>No ads</Typography>
            </li>
            <li>
              <Typography>Basic statistics</Typography>
            </li>
          </ul>
        </PlanCard>

        <EmptyBlock width={30} height={8} />

        <PlanCard
          title="Premium Plan"
          isFreePlan={false}
          isPremiumActive={!!isPremium}
          onPurchaseClick={onPurchaseClick}
        >
          <ul>
            <li>
              <Typography>All functionality for tracking your life</Typography>
            </li>
            <li>
              <Typography>No ads</Typography>
            </li>
            <li>
              <Typography>
                <b>Advanced statistics</b>
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Help with migrating data from another application</b>
              </Typography>
            </li>
          </ul>

          <Center>
            <Typography>4 USD / month</Typography>
          </Center>
        </PlanCard>
      </Wrapper>
    </ScreenWrapper>
  );
};
