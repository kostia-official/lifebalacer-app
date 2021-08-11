import { getPlatform, getSubscriptionPlatform } from '../../common/platform';
import { useEffect } from 'react';
import { InAppPurchase2 as store, IAPProduct } from '@ionic-native/in-app-purchase-2';
import { UseApolloErrorProps } from '../useLocalNotificationsUpdate';
import {
  useCancelSubscriptionMutation,
  refetchGetActiveSubscriptionQuery
} from '../../generated/apollo';
import { productsMap } from '../../common/subscriptionProducts';
import { useActiveSubscription } from '../useActiveSubscription';

export const useCheckStoreSubscription = ({ onError }: UseApolloErrorProps) => {
  const isWeb = getPlatform() === 'web';
  const { subscription } = useActiveSubscription({ onError });
  const isCurrentPlatform = subscription?.platform === getSubscriptionPlatform();

  const [cancelSubscription] = useCancelSubscriptionMutation({
    onError,
    update: (cache) => {
      cache.modify({
        id: `Subscription:${subscription?._id}`,
        fields(fieldValue, document) {
          return document.DELETE;
        }
      });
    },
    refetchQueries: [refetchGetActiveSubscriptionQuery()]
  });

  useEffect(() => {
    if (!subscription || !isCurrentPlatform || isWeb) return;

    const { _id } = subscription;

    // Need to go through lifecycle of all products to
    // be able use them later
    Object.keys(productsMap).forEach((productId) => {
      let isRegistered = !!store.get(productId);
      if (!isRegistered) {
        store.register({ id: productId, type: store.PAID_SUBSCRIPTION });
      }

      store
        .once(productId)
        .valid((p: IAPProduct) => {
          if (p.id !== subscription.productId) return;

          // Only way to find out that subscription is inactive,
          // wait that it's not become 'owned' or 'approved' after state sync
          setTimeout(() => {
            const { state } = store.get(productId);

            if (![store.OWNED, store.APPROVED].includes(state)) {
              cancelSubscription({ variables: { _id } });
            }
          }, 3000);
        })
        .approved((p: IAPProduct) => {
          p.verify();
        })
        .verified((p: IAPProduct) => {
          p.finish();
        });
    });

    store.refresh();
  }, [isWeb, subscription, cancelSubscription, isCurrentPlatform]);
};
