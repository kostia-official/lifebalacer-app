import { useCallback, useState, useMemo } from 'react';
import {
  InAppPurchase2 as store,
  IAPProduct,
  InAppPurchase2Original
} from '@ionic-native/in-app-purchase-2';
import { sentryService } from '../../services/sentry';
import { getPlatform } from '../../common/platform';
import _ from 'lodash';

export interface HookArgs {
  isVerifiedOnBackend: boolean;
  productsIds: string[];
  token?: string | null;
  onVerified?: (p: IAPProduct) => void;
  validator: InAppPurchase2Original['validator'];
}

export const useStoreSubscription = ({
  token,
  productsIds,
  onVerified: onVerifiedCb,
  isVerifiedOnBackend,
  validator
}: HookArgs) => {
  const isWeb = getPlatform() === 'web';
  const [errorMessage, setErrorMessage] = useState('');

  const [products, setProducts] = useState<Record<string, IAPProduct>>({});
  const updateProduct = useCallback((product: IAPProduct) => {
    setProducts((prev) => ({ ...prev, [product.id]: _.cloneDeep(product) }));
  }, []);
  const productsArray = useMemo(() => Object.values(products), [products]);

  const initProducts = useCallback(() => {
    if (isWeb || !token) return;

    store.validator = validator;
    store.applicationUsername = token;

    productsIds.forEach((id) => {
      let registered = store.get(id);

      if (!registered) {
        store.register({ id, type: store.PAID_SUBSCRIPTION });
        registered = store.get(id);
      }

      updateProduct(registered);

      const onApproved = (p: IAPProduct) => {
        if (isVerifiedOnBackend) {
          // Skip backend verification
          p.finish();
        } else {
          // Store makes request to our server
          p.verify();
        }
      };
      const onVerified = async (p: IAPProduct) => {
        onVerifiedCb && onVerifiedCb(p);
        p.finish();
      };
      const onUpdated = (p: IAPProduct) => {
        updateProduct(p);
      };

      store.once(id).approved(onApproved).verified(onVerified);
      store.when(id).updated(onUpdated);
    });

    const onError = (err: any) => {
      setErrorMessage('Updating subscription info error');
      sentryService.captureException(err);
    };
    store.error(onError);

    store.refresh();
  }, [isWeb, token, validator, productsIds, updateProduct, isVerifiedOnBackend, onVerifiedCb]);

  const subscribe = useCallback((id) => {
    store.order(id);
  }, []);

  const manageSubscriptions = useCallback(() => {
    store.manageSubscriptions();
  }, []);

  const isVerifying = useMemo(() => {
    return productsArray.some((product) =>
      [store.APPROVED, store.FINISHED].includes(product.state)
    );
  }, [productsArray]);

  const isSubscribed = useMemo(() => {
    return productsArray.some((product) => product.owned);
  }, [productsArray]);

  const isProductsLoaded = productsArray.every((p) => p.loaded);
  const isAllProductsUpdated = productsArray.length === productsIds.length;
  const isLoadingProducts = !isProductsLoaded || !isAllProductsUpdated;
  const isLoading = isLoadingProducts && !errorMessage && !isWeb;

  return {
    subscribe,
    initProducts,
    isLoading,
    isVerifying,
    isSubscribed,
    errorMessage,
    products: productsArray,
    manageSubscriptions
  };
};
