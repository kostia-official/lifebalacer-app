export const yearlyProductId = '3456456456546';
export const monthlyProductId = '12312313123123';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
export const testProductId = '99999999999';

export interface DraftProduct {
  name: string;
  price: number;
  period: 'year' | 'month' | 'week';
  isBestValue: boolean;
}

export const productsMap: Record<string, DraftProduct> = {
  [yearlyProductId]: { isBestValue: true, name: 'Yearly', price: 39.99, period: 'year' },
  [monthlyProductId]: { isBestValue: false, name: 'Monthly', price: 3.99, period: 'month' }
};
