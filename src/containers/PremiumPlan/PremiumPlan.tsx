import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { ScreenWrapper } from '../App/ScreenWrapper';
import styled from 'styled-components';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { useAuth } from '../../hooks/useAuth';
import { EmptyBlock } from '../../components/EmptyBlock';
import { PriceBox } from './components/PriceBox';
import { PremiumFeature } from './components/PremiumFeature';
import { ReactComponent as StatisticsIcon } from '../../assets/statistics.svg';
import { ReactComponent as MigrationIcon } from '../../assets/migration.svg';
import { ReactComponent as SupportIcon } from '../../assets/support.svg';
import { useStoreSubscription } from '../../hooks/apollo/storeSubscription/useStoreSubscription';
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
import { useActiveSubscription } from '../../hooks/apollo/useActiveSubscription';
import { getPlatform } from '../../common/platform';
import { productsMap, yearlyProductId } from '../../common/subscriptionProducts';
import { useDeleteFieldFromCache } from '../../hooks/apollo/useDeleteFieldFromCache';

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

const ButtonStyled = styled(Button)`
  width: calc(80vw + 20px);
  max-width: 420px;
`;

const Title = styled.span`
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
`;

const ButtonSpinner = styled(CircularProgress)`
  margin: 6px 0;
`;

export const PremiumPlan: React.FC = () => {
  const { errorMessage, errorTime, onError } = useApolloError();

  const {
    isPremium,
    subscription,
    networkStatus: subscriptionQueryStatus,
    refetch: refetchSubscriptionStatus,
    loading: isSubscriptionStatusLoading
  } = useActiveSubscription({ onError, fetchPolicy: 'network-only' });

  const [selectedProductId, setSelectedProductId] = useState(
    subscription?.productId || yearlyProductId
  );

  useEffect(() => {
    if (isPremium && subscription?.productId) {
      setSelectedProductId(subscription?.productId);
    }
  }, [isPremium, subscription?.productId]);

  const { token } = useAuth();

  const deleteFromCache = useDeleteFieldFromCache();

  const {
    isSubscribed,
    isLoading: isStoreLoading,
    subscribe,
    initProducts,
    products,
    isVerifying,
    manageSubscriptions
  } = useStoreSubscription({
    token,
    productsIds: Object.keys(productsMap),
    onVerified: () => {
      refetchSubscriptionStatus();
      deleteFromCache('activityAdvancedStatistic');
    },
    isVerifiedOnBackend: isPremium,
    validator: `${config.apiUrl}/payment/mobile/store`
  });

  const isSubscribing = isVerifying || (isSubscribed && !isPremium);

  const updateSelectedProduct = useCallback(
    (id: string) => {
      if (isSubscribing || isPremium) {
        return;
      }

      setSelectedProductId(id);
    },
    [isPremium, isSubscribing]
  );

  useWatchChanges(() => {
    if (subscriptionQueryStatus === NetworkStatus.ready) {
      initProducts();
    }
  }, [subscriptionQueryStatus]);

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
      isLoading={isStoreLoading || isSubscriptionStatusLoading}
      errorMessage={errorMessage}
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

        <ButtonStyled
          variant="contained"
          color="primary"
          fullWidth
          disabled={isVerifying || isSubscribing || isPremium}
          onClick={() => {
            if (getPlatform() === 'web') {
              window.location.href =
                'https://play.google.com/store/apps/details?id=app.lifebalancer.web.twa';
            } else {
              subscribe(selectedProductId);
            }
          }}
        >
          {!isPremium && isSubscribing ? <ButtonSpinner size={12} color="inherit" /> : buttonText}
        </ButtonStyled>

        <EmptyBlock height={16} />

        {isPremium && (
          <ButtonStyled
            variant="outlined"
            color="default"
            fullWidth
            onClick={() => manageSubscriptions()}
          >
            Cancel
          </ButtonStyled>
        )}
      </Wrapper>
    </ScreenWrapper>
  );
};
