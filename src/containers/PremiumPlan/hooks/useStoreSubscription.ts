import { useCallback, useState, useMemo, useEffect } from 'react';
import {
  InAppPurchase2 as store,
  IAPProduct,
  InAppPurchase2Original
} from '@ionic-native/in-app-purchase-2';
import { sentryService } from '../../../services/sentry';
import { getPlatform } from '../../../common/appType';

export interface HookArgs {
  isVerifiedOnBackend: boolean;
  productsIds: string[];
  userId?: string | null;
  onVerified?: (p: IAPProduct) => Promise<void>;
  validator: InAppPurchase2Original['validator'];
}

export const useStoreSubscription = ({
  userId,
  productsIds,
  onVerified: onVerifiedCb,
  isVerifiedOnBackend,
  validator
}: HookArgs) => {
  const isWeb = getPlatform() === 'web';
  const [isProductsLoading, setIsProductsLoading] = useState(!isWeb);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState<IAPProduct[]>([]);

  const [listeners, setListeners] = useState<Function[]>([]);

  const listenerWrapper = useCallback((listener) => {
    setListeners((prev) => [...prev, listener]);
    return listener;
  }, []);

  useEffect(() => {
    if (!userId) return;

    store.applicationUsername = userId;

    return () => {
      listeners.forEach((listener) => {
        store.off(listener);
      });
    };
  }, [listeners, userId]);

  const initProducts = useCallback(() => {
    if (isWeb) return;

    store.validator = validator;

    if (store.products.length === productsIds.length) {
      setProducts(productsIds.map((id) => store.get(id)));
      setIsProductsLoading(false);
      return;
    }

    productsIds.forEach((id) => {
      store.register({ id, type: store.PAID_SUBSCRIPTION });

      const onApproved = listenerWrapper((p: IAPProduct) => {
        if (isVerifiedOnBackend) {
          // Skip backend verification
          p.finish();
        } else {
          // Store makes request to our server
          p.verify();
        }
      });
      const onVerified = listenerWrapper(async (p: IAPProduct) => {
        // We send appStoreReceipt to our server compare with saved one
        onVerifiedCb && (await onVerifiedCb(p));
        p.finish();
      });
      const onUpdated = listenerWrapper(() => {
        setProducts(productsIds.map((id) => store.get(id)));
        setIsProductsLoading(false);
      });

      store.once(id).approved(onApproved).verified(onVerified);
      store.when(id).updated(onUpdated);
    });

    const onError = listenerWrapper((err: any) => {
      setErrorMessage('Updating subscription info error');
      sentryService.captureException(err);
      setIsProductsLoading(false);
    });
    store.error(onError);

    store.refresh();
  }, [isVerifiedOnBackend, isWeb, listenerWrapper, onVerifiedCb, productsIds, validator]);

  const subscribe = useCallback((id) => {
    store.order(id);
  }, []);

  const isSubscribed = useMemo(() => {
    return products.some((product) => product.owned);
  }, [products]);

  const isVerifying = useMemo(() => {
    return products.some((product) => product.state === store.APPROVED);
  }, [products]);

  return {
    subscribe,
    initProducts,
    isLoading: isProductsLoading,
    isVerifying,
    isSubscribed,
    errorMessage,
    products
  };
};
