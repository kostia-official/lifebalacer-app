import React, { useMemo, useCallback } from 'react';
import { ChartData, Extremes } from '../../common/types';
import { KeyOf } from '../../common/typeUtils';
import { EntriesPerDateGroup } from '../../generated/apollo';
import Chart, {
  Series,
  ArgumentAxis,
  Label,
  ZoomAndPan,
  Size,
  Crosshair,
  ValueAxis,
  Animation
} from 'devextreme-react/chart';
import { ProductivityColors } from '../../common/colors';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import _ from 'lodash';

export interface Props {
  data: ChartData[];
  dateGroup: KeyOf<EntriesPerDateGroup>;
  yValueLabel: string;
}

const Wrapper = styled.div`
  min-height: 250px;
`;

const DateChart: React.FC<Props> = React.memo(({ data, dateGroup }) => {
  const extremes: Extremes = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const value = item.yValue! as number;
        const min = value < acc.min ? value : acc.min;
        const max = value > acc.max ? value : acc.max;

        return { min, max };
      },
      { min: Infinity, max: 0 }
    );
  }, [data]);

  const defaultVisualRange = useMemo(() => {
    if (!isMobile) return [];

    const startItem = data[data.length - 13];
    const endItem = data[data.length - 1];

    if (!startItem || !endItem) return [];

    return [startItem.xValue, endItem.xValue];
  }, [data]);

  const customizeXLabel = useCallback(({ value }: { value: string }) => {
    return DateTime.fromMillis(Number(value)).toFormat('LLL yy');
  }, []);

  const customizeCrosshairLabel = useCallback(
    (item: { value: string; point: { argument: string } }) => {
      if (item.value === item.point.argument) {
        return DateTime.fromMillis(Number(item.value)).toFormat('LLL yyyy');
      }

      return item.value;
    },
    []
  );

  const zoomRange = useCallback((e) => {
    if (isMobile) {
      e.cancel = _.get(e, 'range.categories.length') < 2;

      return;
    }

    e.cancel = _.get(e, 'range.categories.length') < 10;
  }, []);

  const isEmptyData = _.isEmpty(data);

  return useMemo(() => {
    return (
      <Wrapper>
        <Chart
          key={dateGroup} // for proper transition on dateGroup change
          dataSource={data}
          onZoomEnd={zoomRange}
        >
          <Animation duration={600} />

          <Size height={250} />

          <Series
            valueField="yValue"
            argumentField="xValue"
            color={ProductivityColors.Productive}
            showInLegend={false}
            type="spline"
            point={{ size: isMobile ? 14 : 12 }}
          />

          <ValueAxis
            visualRange={[extremes.min, extremes.max]}
            visible={!isEmptyData}
            tick={{ visible: !isEmptyData }}
            grid={{ visible: !isEmptyData }}
          />

          <ArgumentAxis
            defaultVisualRange={defaultVisualRange}
            discreteAxisDivisionMode="crossLabels"
          >
            <Label
              rotationAngle={-45}
              overlappingBehavior="rotate"
              alignment="center"
              wordWrap="none"
              customizeText={customizeXLabel}
            />
          </ArgumentAxis>

          <Crosshair enabled={true} dashStyle="dot" color={ProductivityColors.Lazy}>
            <Label visible={true} customizeText={customizeCrosshairLabel} />
          </Crosshair>

          <ZoomAndPan argumentAxis={'both'} valueAxis="none" />
        </Chart>
      </Wrapper>
    );
  }, [
    customizeCrosshairLabel,
    customizeXLabel,
    data,
    dateGroup,
    defaultVisualRange,
    extremes,
    isEmptyData,
    zoomRange
  ]);
});

export default DateChart;
