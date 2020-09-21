import React, { useState } from 'react';
import { CardContent, CardActions, Button } from '@material-ui/core';
import { TextField } from './TextField';

export interface EntryValueModalContentProps {
  onSave: (value: number) => void;
}

export const EntryValueModalContent: React.FC<EntryValueModalContentProps> = ({ onSave }) => {
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        onSave(Number(value));
        e.preventDefault();
      }}
    >
      <CardContent>
        <TextField
          autoFocus={true}
          label="Value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button type="submit">Save</Button>
      </CardActions>
    </form>
  );
};
