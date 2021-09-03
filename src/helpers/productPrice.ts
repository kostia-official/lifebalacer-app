import { IAPProduct } from '@ionic-native/in-app-purchase-2';
import { round } from './round';
import { DraftProduct } from '../common/subscriptionProducts';

export const getPriceText = (product: IAPProduct | undefined, draftProduct: DraftProduct) => {
  return product?.price || `$${draftProduct.price}`;
};

export const getPeriod = (product: IAPProduct | undefined, draftProduct: DraftProduct) => {
  return product?.billingPeriodUnit ? product.billingPeriodUnit.toLowerCase() : draftProduct.period;
};

export const getMonthPriceText = (product: IAPProduct | undefined, draftProduct: DraftProduct) => {
  const currency = product?.currency || 'USD';
  const priceNumber = product ? product.priceMicros / 1000000 : draftProduct.price;
  const monthPriceNumber = round(priceNumber / 12);
  const monthPrice =
    currency === 'USD' ? `$${monthPriceNumber}` : `${currency} ${monthPriceNumber}`;

  return `${monthPrice} / month`;
};

export const getPriceTextSize = (yearlyProductPrice: string) => {
  const size = 220 / yearlyProductPrice.length;

  if (size > 28) return 26;
  if (size < 12) return 12;

  return size;
};
