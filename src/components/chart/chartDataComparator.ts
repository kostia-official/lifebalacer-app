import { ChartData } from '../../common/types';

interface Props {
  data: ChartData[];
}

export const chartDataComparator = <T extends Props>(
  { data: prevData }: T,
  { data: nextData }: T
) => {
  // Trying to quickly understand that data changed
  if (prevData.length !== nextData.length) return false;
  if (prevData[0].yValue !== nextData[0].yValue) return false;

  // Rerender only if content was changed, otherwise don't show change transition
  return JSON.stringify(prevData) === JSON.stringify(nextData);
};
