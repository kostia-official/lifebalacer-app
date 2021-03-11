import { useState, useCallback } from 'react';
import { DateTime, DateTimeFormatOptions } from 'luxon';
import { BasePickerProps } from '@material-ui/pickers/typings/BasePicker';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface HookProps {
  dateFormat?: DateTimeFormatOptions;
  onDateChange?: (date: DateTime) => void;
}

export const useDatePicker = ({
  dateFormat = DateTime.DATE_MED_WITH_WEEKDAY,
  onDateChange
}: HookProps = {}) => {
  const [date, setDate] = useState(DateTime.local());

  const formatDateLabel: BasePickerProps['labelFunc'] = useCallback(
    (dateArg: MaterialUiPickersDate) => {
      const date = dateArg || DateTime.local();
      return date.toLocaleString(dateFormat);
    },
    [dateFormat]
  );

  const changeDate: BasePickerProps['onChange'] = useCallback(
    (date) => {
      if (!date) return;

      setDate(date);
      onDateChange && onDateChange(date);
    },
    [onDateChange]
  );

  return { formatDateLabel, date, setDate, changeDate };
};
