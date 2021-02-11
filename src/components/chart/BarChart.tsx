import React, { Fragment } from 'react';
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

const BarChart: React.FC<BarChartProps> = ({ data, customizePoint }) => {
  if (!data) return <Fragment />;

  const optionalCustomizePoint = customizePoint ? { customizePoint } : {};

  return (
    <ChartWrapper>
      <Chart dataSource={data} {...optionalCustomizePoint}>
        <Animation duration={600} easing="easeOutCubic" />

        <Size height={140} />

        <ArgumentAxis />
        <ValueAxis visible={false} tick={{ visible: false }} grid={{ visible: false }}>
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
};

export default BarChart;
