import React, { useState } from 'react';
import { DatePicker as MaterialDatePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { Fab } from '@material-ui/core';

interface IDatePickerProps {
  onChange: (date: Date) => void;
}

export const DatePickerButton: React.FC<IDatePickerProps> = ({ onChange }) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  return (
    <>
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
        onClose={() => setIsShowDatePicker(false)}
        TextFieldComponent={() => <React.Fragment />}
        autoOk
      />
    </>
  );
};
