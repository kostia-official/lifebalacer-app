import {
  useApproveStoreSubscriptionMutation,
  ApproveStoreSubscriptionMutation,
  ApproveStoreSubscriptionMutationVariables,
  SubscriptionPlatform
} from '../../../generated/apollo';
import * as Apollo from '@apollo/client';
import { useCallback } from 'react';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';

export const useApproveStoreSubscription = (
  baseOptions?: Apollo.MutationHookOptions<
    ApproveStoreSubscriptionMutation,
    ApproveStoreSubscriptionMutationVariables
  >
) => {
  const [approveStoreSubscription] = useApproveStoreSubscriptionMutation(baseOptions);

  const getMutationVariables = useCallback((transaction: IAPProduct['transaction']):
    | ApproveStoreSubscriptionMutationVariables
    | undefined => {
    if (transaction?.type === 'ios-appstore') {
      return {
        platform: SubscriptionPlatform.AppStore,
        storeReceipt: transaction.appStoreReceipt
      };
    }

    if (transaction?.type === 'android-playstore') {
      return {
        platform: SubscriptionPlatform.GooglePlay,
        storeReceipt: transaction.receipt
      };
    }
  }, []);

  const approve = useCallback(
    async (product: IAPProduct) => {
      const transaction = product?.transaction;
      if (!transaction) return;

      await approveStoreSubscription({
        variables: getMutationVariables(transaction)
      });
    },
    [approveStoreSubscription, getMutationVariables]
  );

  return { approve };
};
