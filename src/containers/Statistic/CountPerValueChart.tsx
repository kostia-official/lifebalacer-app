import React, { useMemo, useCallback } from 'react';
import { CountPerValue } from '../../generated/apollo';
import { ChartData } from '../../common/types';
import { getColorsOfRange } from '../../helpers/color';
import { BarChartProps } from '../../components/chart/BarChart';
import { BarChartLoadable } from '../../components/chart/BarChartLoadable';
import styled from 'styled-components';
import { Center } from '../../components/Center';
import { Typography } from '@material-ui/core';
import { EmptyStateWrapper } from '../../components/EmptyStateWrapper';

export interface CountPerValueChartProps {
  data: Pick<CountPerValue, 'count' | 'value'>[];
  isReverseColors: boolean;
}

const ChartTitle: typeof Typography = styled(Typography)`
  margin-bottom: 8px;
`;

export const CountPerValueChart: React.FC<CountPerValueChartProps> = ({
  data,
  isReverseColors
}) => {
  const countPerValueChartData: ChartData[] = useMemo(() => {
    return data.map(({ value, count }) => {
      return { xValue: String(value), yValue: count };
    });
  }, [data]);

  const colors = useMemo(
    () => getColorsOfRange(1, countPerValueChartData.length, isReverseColors),
    [countPerValueChartData.length, isReverseColors]
  );

  const customizePoints: BarChartProps['customizePoint'] = useCallback(
    (point) => {
      return { color: colors[point.index] };
    },
    [colors]
  );

  return (
    <EmptyStateWrapper isEmpty={data.length === 0}>
      <Center>
        <ChartTitle variant="body1" gutterBottom>
          Count per value
        </ChartTitle>
      </Center>

      <BarChartLoadable data={countPerValueChartData} customizePoint={customizePoints} />
    </EmptyStateWrapper>
  );
};
