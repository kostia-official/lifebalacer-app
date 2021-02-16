import React, { useState, useCallback, useMemo } from 'react';
import { DateTime } from 'luxon';
import Select from '@material-ui/core/Select';
import { Button, Grid, MenuItem, SelectProps, Typography, Input } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import styled from 'styled-components';
import { DatePickerProps } from '@material-ui/pickers/DatePicker/DatePicker';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Spinner from 'react-spinners/ClipLoader';
import { MainColors } from '../common/colors';
import { getDayStartFromToday } from '../helpers/date';
import { isMobile } from 'react-device-detect';

interface DateRange {
  dateAfter?: DateTime;
  dateBefore?: DateTime;
}

export interface RangeDatePickerProps {
  onChange: (range: DateRange) => void;
  isLoading: boolean;
}

const Wrapper = styled.div`
  max-height: 30px;

  display: flex;
  align-items: center;
`;

const DoneButton = styled(Button)`
  margin-left: 8px;
  margin-right: -8px;
`;

const SpinnerStyled = styled(Spinner)`
  margin-left: 6px;
`;

const SelectStyled: typeof Select = styled(Select)`
  margin-left: 6px;

  & .MuiSelect-select:focus {
    background-color: transparent;
  }

  & .MuiInputBase-input {
    padding: 4px 24px 4px 0;
  }
`;

const endOfToday = DateTime.local().endOf('day');

const ranges: Record<string, { label: string; range: DateRange }> = {
  allTime: { label: 'All Time', range: {} },
  lastYear: {
    label: 'Last Year',
    range: {
      dateAfter: getDayStartFromToday({ year: 1 }),
      dateBefore: endOfToday
    }
  },
  last6Months: {
    label: 'Last 6 Months',
    range: {
      dateAfter: getDayStartFromToday({ months: 6 }),
      dateBefore: endOfToday
    }
  },
  last3Months: {
    label: 'Last 3 Months',
    range: {
      dateAfter: getDayStartFromToday({ months: 3 }),
      dateBefore: endOfToday
    }
  },
  lastMonth: {
    label: 'Last 30 Days',
    range: {
      dateAfter: getDayStartFromToday({ month: 1 }),
      dateBefore: endOfToday
    }
  }
};

export type RangeKey = keyof typeof ranges;

export const RangeDatePicker: React.FC<RangeDatePickerProps> = ({ onChange, isLoading }) => {
  const [rangeKey, setRangeKey] = useState<RangeKey>('allTime');

  const [dateAfter, setDateAfter] = useState(getDayStartFromToday({ weeks: 2 }));
  const [dateBefore, setDateBefore] = useState(endOfToday);

  const onRangeChange: SelectProps['onChange'] = useCallback(
    (e) => {
      setRangeKey(e.target.value);

      const option = ranges[e.target.value];
      option && onChange(option.range);
    },
    [onChange]
  );

  const formatMenuLabelDate = useCallback((date?: DateTime | null) => {
    if (!date) return '';
    return isMobile ? date.toFormat('d.MM.yy') : date.toLocaleString(DateTime.DATE_MED);
  }, []);

  const formatMenuItemDate = useCallback((date?: DateTime | null) => {
    if (!date) return '';
    return date.toLocaleString(DateTime.DATE_MED);
  }, []);

  const onDateChange = useCallback(
    (setter: Function) => (date: MaterialUiPickersDate) => {
      date && setter(date);
    },
    []
  );

  const onDone = useCallback(() => {
    onChange({ dateAfter: dateAfter.startOf('day'), dateBefore: dateBefore.endOf('day') });
  }, [dateAfter, dateBefore, onChange]);

  const datePickerProps: Partial<DatePickerProps> = useMemo(() => {
    return {
      variant: 'inline',
      autoOk: true,
      style: { width: '100px' },
      labelFunc: formatMenuItemDate
    };
  }, [formatMenuItemDate]);

  const renderMenuLabel = useCallback(
    (value) => {
      const key = value as RangeKey;
      const customLabel = `${formatMenuLabelDate(dateAfter)} - ${formatMenuLabelDate(dateBefore)}`;
      const label = ranges[key]?.label || customLabel;

      return <Typography>{label}</Typography>;
    },
    [dateAfter, dateBefore, formatMenuLabelDate]
  );

  return (
    <Wrapper>
      <SpinnerStyled color={MainColors.Primary} size={22} loading={isLoading} />

      <SelectStyled
        value={rangeKey}
        onChange={onRangeChange}
        renderValue={renderMenuLabel}
        input={<Input disableUnderline />}
      >
        {Object.entries(ranges).map(([key, { label }]) => {
          return (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          );
        })}
        <MenuItem key="custom" value="custom" disableRipple>
          <Grid container spacing={1} direction={'row'} onClick={(e) => e.stopPropagation()}>
            <Grid item>
              <DatePicker
                label="From"
                value={dateAfter}
                onChange={onDateChange(setDateAfter)}
                maxDate={dateBefore}
                {...datePickerProps}
              />
            </Grid>

            <Grid item>
              <DatePicker
                label="To"
                value={dateBefore}
                minDate={dateAfter}
                onChange={onDateChange(setDateBefore)}
                {...datePickerProps}
              />
            </Grid>
          </Grid>

          <DoneButton onClick={onDone}>Select</DoneButton>
        </MenuItem>
      </SelectStyled>
    </Wrapper>
  );
};
