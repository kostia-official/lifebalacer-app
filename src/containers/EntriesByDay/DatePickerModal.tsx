import React, { useState, Fragment } from 'react';
import { DatePicker as MaterialDatePicker } from '@material-ui/pickers';
import { DateTime } from 'luxon';
import { useDatePickerRenderDayExtremes } from '../../hooks/useDatePickerRenderDayExtremes';

export interface IDatePickerProps {
  onChange: (date: Date) => void;
  onClose: () => void;
}

export const DatePickerModal: React.FC<IDatePickerProps> = ({ onChange, onClose }) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(true);
  const { renderDay } = useDatePickerRenderDayExtremes();

  return (
    <MaterialDatePicker
      open={isShowDatePicker}
      value={DateTime.local()}
      onChange={(date) => {
        if (date) onChange(date.toJSDate());
        setIsShowDatePicker(false);
        onClose();
      }}
      renderDay={renderDay}
      onClose={() => {
        setIsShowDatePicker(false);
        onClose();
      }}
      TextFieldComponent={() => <Fragment />}
      autoOk
    />
  );
};
