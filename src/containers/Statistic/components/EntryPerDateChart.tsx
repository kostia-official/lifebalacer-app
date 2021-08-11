import React, { useState, useCallback, useMemo, Fragment } from 'react';
import { EntryPerDate, EntriesPerDateGroup } from '../../../generated/apollo';
import _ from 'lodash';
import { MenuItem, Typography, SelectProps, Paper } from '@material-ui/core';
import { SelectInline } from '../../../components/SelectInline';
import styled from 'styled-components';
import { ChartData } from '../../../common/types';
import { KeyOf } from '../../../common/typeUtils';
import { EmptyStateWrapper } from '../../../components/EmptyStateWrapper';
import DateChart from '../../../components/chart/DateChart';
import { entriesPerDateGroupChartDataStub } from '../../../stub/chartStub';
import { LockedFeature } from './LockedFeature';
import { LockedFeatureWrapper } from './LockedFeatureWrapper';

export interface EntryPerDateChartProps {
  data?: EntriesPerDateGroup;
  isWithValue: boolean;
  isLocked: boolean;
}

const Wrapper = styled(Paper)`
  padding: 15px;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;

  margin-bottom: 2px;
`;

type ValueField = keyof Omit<EntryPerDate, '__typename' | 'completedAt'>;

const ValueFieldMapper: Record<ValueField, string> = {
  averageValue: 'Average value',
  valueSum: 'Value sum',
  count: 'Entries count'
};

export const EntryPerDateChart: React.FC<EntryPerDateChartProps> = ({
  data,
  isWithValue,
  isLocked
}) => {
  const [valueField, setValueField] = useState<ValueField>(isWithValue ? 'averageValue' : 'count');
  const [dateGroup] = useState<KeyOf<EntriesPerDateGroup>>('month');

  const onValueFieldChange: SelectProps['onChange'] = useCallback((e) => {
    setValueField(e.target.value);
  }, []);

  // const onDateGroupChange: SelectProps['onChange'] = useCallback((e) => {
  //   setDateGroup(e.target.value);
  // }, []);

  const finalData: ChartData[] | undefined = useMemo(() => {
    if (isLocked) return entriesPerDateGroupChartDataStub;
    if (!data) return undefined;

    const items = data[dateGroup];

    return items?.map((item) => {
      const yValue = item[valueField] ?? 0;

      return { xValue: item.completedAt, yValue: _.round(yValue, 1) };
    });
  }, [data, isLocked, dateGroup, valueField]);

  if (!finalData) return <Fragment />;

  return (
    <Wrapper>
      {isLocked && (
        <LockedFeatureWrapper>
          <LockedFeature size="medium" />
        </LockedFeatureWrapper>
      )}

      <EmptyStateWrapper isEmpty={finalData?.length === 0}>
        <TitleWrapper>
          {isWithValue ? (
            <SelectInline value={valueField} onChange={onValueFieldChange}>
              {Object.entries(ValueFieldMapper).map(([value, label]) => {
                return (
                  <MenuItem key={value} value={value} disabled={isLocked}>
                    {label}
                  </MenuItem>
                );
              })}
            </SelectInline>
          ) : (
            <Typography variant="body1" gutterBottom>
              Entries count
            </Typography>
          )}

          <Typography variant="body1" gutterBottom>
            &nbsp;per month
          </Typography>

          {/*<SelectInline value={dateGroup} onChange={onDateGroupChange}>*/}
          {/*  <MenuItem value="month">month</MenuItem>*/}
          {/*  <MenuItem value="week">week</MenuItem>*/}
          {/*</SelectInline>*/}
        </TitleWrapper>

        {finalData && (
          <DateChart
            data={finalData || []}
            dateGroup={dateGroup}
            yValueLabel={ValueFieldMapper[valueField]}
          />
        )}
      </EmptyStateWrapper>
    </Wrapper>
  );
};
