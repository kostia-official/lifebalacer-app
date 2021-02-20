import { teal } from '@material-ui/core/colors';

export const MainColors = {
  Primary: teal['500'],
  Secondary: '#ba4d4f',
  Background: '#303030'
};

export const ProductivityColors = {
  Productive: MainColors.Primary,
  Lazy: MainColors.Secondary,
  Regular: '#bf9e39'
};

export const ProductivityColorsExtended = {
  Lazy: ProductivityColors.Lazy,
  LessLazy: '#c16b29',
  Regular: ProductivityColors.Regular,
  LessProductive: '#47995a',
  Productive: ProductivityColors.Productive
};
