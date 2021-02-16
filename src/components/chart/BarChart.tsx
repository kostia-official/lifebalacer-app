import React, { useMemo } from 'react';
import Chart, {
  Series,
  ArgumentAxis,
  Size,
  ValueAxis,
  Label,
  Animation
} from 'devextreme-react/chart';
import styled from 'styled-components';
import { ChartData } from '../../common/types';
import { useExtremes } from '../../hooks/useExtremes';
import { chartDataComparator } from './chartDataComparator';

export interface BarChartProps {
  data: ChartData[];
  customizePoint?: (point: ChartPoint) => { color: string };
}

const ChartWrapper = styled.div`
  margin-top: 10px;
`;

export interface ChartPoint {
  index: number;
  data: ChartData;
}

const BarChart: React.FC<BarChartProps> = React.memo(({ data, customizePoint }) => {
  const extremes = useExtremes(data, 'yValue');

  return useMemo(() => {
    const optionalCustomizePoint = customizePoint ? { customizePoint } : {};

    return (
      <ChartWrapper>
        <Chart dataSource={data} {...optionalCustomizePoint}>
          <Animation duration={600} easing="easeOutCubic" />

          <Size height={140} />

          <ArgumentAxis />
          <ValueAxis
            // defaultVisualRange={yDefaultVisualRange}
            inverted={extremes.max < 0}
            visible={false}
            tick={{ visible: false }}
            grid={{ visible: false }}
          >
            <Label visible={false} />
          </ValueAxis>

          <Series valueField="yValue" argumentField="xValue" type="bar" showInLegend={false}>
            <Label
              visible={true}
              backgroundColor="transparent"
              verticalOffset={8}
              border={{ visible: false }}
            />
          </Series>
        </Chart>
      </ChartWrapper>
    );
  }, [customizePoint, data, extremes.max]);
}, chartDataComparator);

export default BarChart;
