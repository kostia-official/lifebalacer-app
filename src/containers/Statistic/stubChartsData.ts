import _ from 'lodash';
import { ChartData } from '../../common/types';

export const stubCountPerValueData: ChartData[] = Array.from({ length: 10 }, (item, index) => {
  return { xValue: index, yValue: _.random(5, 20) };
});
