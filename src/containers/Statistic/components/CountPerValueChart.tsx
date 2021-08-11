import React, { useMemo, useCallback } from 'react';
import { CountPerValue } from '../../../generated/apollo';
import { ChartData } from '../../../common/types';
import { getColorsOfRange } from '../../../helpers/color';
import BarChart, { BarChartProps } from '../../../components/chart/BarChart';
import styled from 'styled-components';
import { Center } from '../../../components/Center';
import { Typography } from '@material-ui/core';
import { EmptyStateWrapper } from '../../../components/EmptyStateWrapper';
import { countPerValueChartDataStub } from '../../../stub/chartStub';
import { LockedFeatureWrapper } from './LockedFeatureWrapper';
import { LockedFeature } from './LockedFeature';

export interface CountPerValueChartProps {
  data?: Pick<CountPerValue, 'count' | 'value'>[] | null;
  isReverseColors: boolean;
  isLocked: boolean;
}

const ChartTitle: typeof Typography = styled(Typography)`
  margin-bottom: 8px;
`;

export const CountPerValueChart: React.FC<CountPerValueChartProps> = ({
  data,
  isReverseColors,
  isLocked
}) => {
  const finalData: ChartData[] = useMemo(() => {
    if (isLocked || !data) return countPerValueChartDataStub;

    return data?.map(({ value, count }) => {
      return { xValue: String(value), yValue: count };
    });
  }, [data, isLocked]);

  const colors = useMemo(() => getColorsOfRange(1, finalData.length, isReverseColors), [
    finalData.length,
    isReverseColors
  ]);

  const customizePoints: BarChartProps['customizePoint'] = useCallback(
    (point) => {
      return { color: colors[point.index] };
    },
    [colors]
  );

  return (
    <EmptyStateWrapper isEmpty={data?.length === 0}>
      {isLocked && (
        <LockedFeatureWrapper>
          <LockedFeature size="small" />
        </LockedFeatureWrapper>
      )}

      <Center>
        <ChartTitle variant="body1" gutterBottom>
          Count per value
        </ChartTitle>
      </Center>

      <BarChart data={finalData} customizePoint={customizePoints} />
    </EmptyStateWrapper>
  );
};
