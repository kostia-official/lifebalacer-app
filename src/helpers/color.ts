import { ProductivityColors } from '../common/colors';

export function getColorFromPoints(points: number) {
  if (points > 300) return ProductivityColors.Productive;
  if (points < -300) return ProductivityColors.Lazy;

  return ProductivityColors.Regular;
}
