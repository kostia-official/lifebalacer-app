import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

export const waitForTextZoom = async (expectedTextZoom: number, retries = 5) => {
  const result = await MobileAccessibility.getTextZoom();
  if (result === expectedTextZoom) return;
  if (retries === 0) return;

  await waitForTextZoom(expectedTextZoom, retries - 1);
};
