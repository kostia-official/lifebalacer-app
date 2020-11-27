// @ts-ignore
import generateGradient from 'gradient-color';
import { ProductivityColorsExtended } from '../common/colors';
import _ from 'lodash';

const { Lazy, LessLazy, Regular, LessProductive, Productive } = ProductivityColorsExtended;

export function getColorFromPoints(points: number) {
  if (points > 300) return Productive;
  if (points < -300) return Lazy;

  return Regular;
}

export function getColorInGradient(
  value: number,
  min: number,
  max: number,
  isReverseColors: boolean
): string {
  let colors = getColorsOfRange(min, max, isReverseColors);

  if (value < min) return _.first(colors)!;
  if (value > max) return _.last(colors)!;

  const inRange = value - min;
  return colors[Math.round(inRange)];
}

export function getColorsOfRange(min: number, max: number, isReverseColors = false): string[] {
  const n = Math.round(max - min + 1);

  const colors: string[] = (() => {
    if (n < 2) return [Productive];
    if (n === 2) return [Lazy, Productive];
    if (n === 3) return [Lazy, Regular, Productive];
    if (n === 4) return [Lazy, Regular, LessProductive, Productive];
    if (n === 5) return [Lazy, LessLazy, Regular, LessProductive, Productive];

    return generateGradient([Lazy, LessLazy, Regular, LessProductive, Productive], n);
  })();

  return isReverseColors ? colors.reverse() : colors;
}
