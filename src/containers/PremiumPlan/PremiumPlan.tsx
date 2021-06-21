import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { ScreenWrapper } from '../App/ScreenWrapper';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/useApolloError';
import { useAuth } from '../../hooks/useAuth';
import { EmptyBlock } from '../../components/EmptyBlock';
import { PriceBox } from './PriceBox';
import { PremiumFeature } from './PremiumFeature';
import { ReactComponent as StatisticsIcon } from '../../assets/statistics.svg';
import { ReactComponent as MigrationIcon } from '../../assets/migration.svg';
import { ReactComponent as SupportIcon } from '../../assets/support.svg';
import { useStoreSubscription } from './hooks/useStoreSubscription';
import {
  useGetSubscriptionQuery,
  SubscriptionStatus,
  refetchGetSubscriptionQuery
} from '../../generated/apollo';
import { NetworkStatus } from '@apollo/client';
import { useWatchChanges } from '../../hooks/useWatchChange';
import { pluralLabel } from '../../helpers/pluralarize';
import { config } from '../../common/config';
import {
  getPriceText,
  getPriceTextSize,
  getMonthPriceText,
  getPeriod
} from '../../helpers/productPrice';
import { useApproveStoreSubscription } from './hooks/useApproveStoreSubscription';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SubscribeButton = styled(Button)`
  width: calc(80vw + 20px);
  max-width: 420px;
`;

const Title = styled.span`
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
`;

const Spinner = styled(CircularProgress)`
  margin: 6px 0;
`;

const yearlyProductId = '3456456456546';
const monthlyProductId = '12312313123123';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
const testProductId = '99999999999';

export interface DraftProduct {
  name: string;
  price: number;
  period: 'year' | 'month' | 'week';
  isBestValue: boolean;
}

const productsMap: Record<string, DraftProduct> = {
  [yearlyProductId]: { isBestValue: true, name: 'Yearly', price: 39.99, period: 'year' },
  [monthlyProductId]: { isBestValue: false, name: 'Monthly', price: 3.99, period: 'month' }
};

export const PremiumPlan: React.FC = () => {
  const { errorMessage, errorTime, onError } = useApolloError();
  const { userId } = useAuth();

  const { approve } = useApproveStoreSubscription({
    onError,
    refetchQueries: [refetchGetSubscriptionQuery()]
  });

  const {
    data: subscriptionData,
    loading: isSubscriptionStatusLoading,
    networkStatus: subscriptionQueryStatus
  } = useGetSubscriptionQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onError
  });
  const subscription = subscriptionData?.subscription;
  const isPremium = subscription?.status === SubscriptionStatus.Subscribed;

  const [selectedProductId, setSelectedProductId] = useState(
    subscription?.productId || yearlyProductId
  );

  useEffect(() => {
    if (isPremium && subscription?.productId) {
      setSelectedProductId(subscription?.productId);
    }
  }, [isPremium, subscription?.productId]);

  const {
    isSubscribed,
    isLoading,
    subscribe,
    initProducts,
    errorMessage: nativeError,
    products,
    isVerifying
  } = useStoreSubscription({
    userId,
    productsIds: Object.keys(productsMap),
    onVerified: approve,
    isVerifiedOnBackend: isPremium,
    validator: `${config.apiUrl}/payment/mobile/store`
  });

  const updateSelectedProduct = useCallback(
    (id: string) => {
      if (
        subscription?.status === SubscriptionStatus.Subscribed ||
        subscription?.status === SubscriptionStatus.Pending ||
        isVerifying
      ) {
        return;
      }

      setSelectedProductId(id);
    },
    [isVerifying, subscription?.status]
  );

  useWatchChanges(() => {
    if (subscriptionQueryStatus === NetworkStatus.ready) {
      initProducts();
    }
  }, [subscriptionQueryStatus]);

  const isSubscribing = isVerifying || (isSubscribed && !isPremium);

  const buttonText = isPremium ? 'Subscribed' : 'Subscribe';

  const selectedProductData: any = products?.find((p) => p.id === selectedProductId);

  const introPricePeriodUnit: string = selectedProductData?.introPricePeriodUnit || 'week';
  const introPricePeriod: number = selectedProductData?.introPricePeriod || 2;

  const freeTrialText = `Start with ${pluralLabel(
    introPricePeriodUnit,
    introPricePeriod
  ).toLowerCase()} free trial`;

  return (
    <ScreenWrapper
      isLoading={isLoading || isSubscriptionStatusLoading}
      errorMessage={errorMessage || nativeError}
      errorTime={errorTime}
      unmountOnHide
    >
      <Wrapper>
        <Title>Life Balancer Premium Subscription</Title>

        <div>
          <PremiumFeature
            icon={StatisticsIcon}
            title="Advanced statistics"
            subTitle="Get insides in your life with interactive diagrams and detailed statistic"
          />
          <PremiumFeature
            icon={MigrationIcon}
            title="Migrating your data"
            subTitle="We can help with migrating here your data from another application"
          />
          <PremiumFeature
            icon={SupportIcon}
            title="Support us"
            subTitle="Your subscription support the development of Life Balancer"
          />
        </div>

        <EmptyBlock height={18} />

        <CardsWrapper>
          {Object.entries(productsMap).map(([id, draftProduct], index) => {
            const storeProduct = products.find((p) => p.id === id);

            const price = getPriceText(storeProduct, draftProduct);
            const period = getPeriod(storeProduct, draftProduct);
            const monthPriceText = getMonthPriceText(storeProduct, draftProduct);

            const priceTextSize = getPriceTextSize(
              getPriceText(
                products.find((p) => p.id === yearlyProductId),
                productsMap[yearlyProductId]
              )
            );

            const isSelected = id === selectedProductId;

            return (
              <Fragment key={id}>
                <PriceBox
                  id={id}
                  title={draftProduct.name}
                  priceText={price}
                  priceSubText={`per ${period}`}
                  priceTextSize={priceTextSize}
                  bottomText={period === 'year' ? monthPriceText : undefined}
                  selected={isSelected}
                  subscribed={isSelected && isPremium}
                  bestValue={draftProduct.isBestValue}
                  onClick={updateSelectedProduct}
                />
                {index === 0 && <EmptyBlock width={20} />}
              </Fragment>
            );
          })}
        </CardsWrapper>

        <EmptyBlock height={12} />

        {!isPremium && <Typography variant="body1">{freeTrialText}</Typography>}

        <EmptyBlock height={10} />

        <SubscribeButton
          variant="contained"
          color="primary"
          fullWidth
          disabled={isVerifying || isSubscribing || isPremium}
          onClick={() => subscribe(selectedProductId)}
        >
          {!isPremium && isSubscribing ? <Spinner size={12} color="inherit" /> : buttonText}
        </SubscribeButton>
      </Wrapper>
    </ScreenWrapper>
  );
};
