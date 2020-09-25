import React, { useState, Fragment } from 'react';
import { DatePicker as MaterialDatePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { Fab } from '@material-ui/core';
import { RenderDayResult } from '../types';
import { useDatePickerRenderDay } from '../hooks/useDatePickerRenderDay';

export interface IDatePickerProps {
  onChange: (date: Date) => void;
  onRenderDay?: (date: Date) => RenderDayResult;
}

export const DatePickerButton: React.FC<IDatePickerProps> = ({ onChange, onRenderDay }) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const { renderDay } = useDatePickerRenderDay({ onDay: onRenderDay });

  return (
    <Fragment>
      <Fab color="primary" onClick={() => setIsShowDatePicker(true)}>
        <EventIcon />
      </Fab>
      <MaterialDatePicker
        open={isShowDatePicker}
        value={new Date()}
        onChange={(date) => {
          if (date) onChange(date);
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
