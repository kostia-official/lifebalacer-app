import React from 'react';
import MeterialTextField, { TextFieldProps } from '@material-ui/core/TextField';

export const TextField = (props: TextFieldProps) => {
  return (
    <MeterialTextField
      margin="dense"
      InputLabelProps={{
        shrink: true
      }}
      {...props}
    />
  );
};
