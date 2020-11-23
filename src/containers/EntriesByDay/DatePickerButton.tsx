import React, { useState, Fragment } from 'react';
import { DatePicker as MaterialDatePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { Fab } from '@material-ui/core';
import { useDatePickerRenderDay } from '../../hooks/useDatePickerRenderDay';
import { DateTime } from 'luxon';

export interface IDatePickerProps {
  onChange: (date: Date) => void;
}

export const DatePickerButton: React.FC<IDatePickerProps> = ({ onChange }) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const { renderDay } = useDatePickerRenderDay();

  return (
    <Fragment>
      <Fab color="primary" onClick={() => setIsShowDatePicker(true)}>
        <EventIcon />
      </Fab>

      <MaterialDatePicker
        open={isShowDatePicker}
        value={DateTime.local()}
        onChange={(date) => {
          if (date) onChange(date.toJSDate());
          setIsShowDatePicker(false);
        }}
        renderDay={renderDay}
        onClose={() => setIsShowDatePicker(false)}
        TextFieldComponent={() => <Fragment />}
        autoOk
      />
    </Fragment>
  );
};