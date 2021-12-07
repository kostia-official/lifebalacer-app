import { teal } from '@material-ui/core/colors';

export const MainColors = {
  Primary: teal['500'],
  Secondary: '#ba4d4f',
  Background: '#303030',
  Yellow: '#e7c73a',
  White: '#ffffffb3'
};

export const BackgroundColor = {
  Main: MainColors.Background,
  Light: '#424242',
  Lighter: '#555555'
};

export const WhiteColor = {
  Main: MainColors.White,
  Dim: 'rgba(255,255,255,0.47)'
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
