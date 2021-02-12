import React, { useState, Fragment, useCallback } from 'react';
import EventIcon from '@material-ui/icons/Event';
import { Fab } from '@material-ui/core';
import { DatePickerModal } from './DatePickerModal';

export interface IDatePickerProps {
  onChange: (date: Date) => void;
}

export const DatePickerButton: React.FC<IDatePickerProps> = ({ onChange }) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const onClose = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsShowDatePicker(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Fragment>
      <Fab color="primary" onClick={() => setIsShowDatePicker(true)}>
        <EventIcon />
      </Fab>

      {isShowDatePicker && <DatePickerModal onChange={onChange} onClose={onClose} />}
    </Fragment>
  );
};
