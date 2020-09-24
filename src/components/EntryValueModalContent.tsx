import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react';
import { CardContent, CardActions, Button } from '@material-ui/core';
import { TextField } from './TextField';
import { Entry, ActivityType } from '../generated/apollo';
import { ActivityResult } from '../types';

export interface EntryValueModalContentProps {
  onSave: (value: number) => void;
  onDelete: () => void;
  value: Entry['value'];
  activity?: ActivityResult;
}

export const EntryValueModalContent: React.FC<EntryValueModalContentProps> = ({
  onSave,
  onDelete,
  activity,
  value: valueProp
}) => {
  const [value, setValue] = useState<string>('');

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      const resultValue = Number(value);

      if (!Number.isNaN(resultValue)) {
        onSave(resultValue);
      }

      e.preventDefault();
    },
    [value, onSave]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setValue(valueProp ? String(valueProp) : '');
  }, [valueProp]);

  const inputProps =
    activity?.valueType === ActivityType.Range
      ? {
          min: activity.rangeMeta?.from,
          max: activity.rangeMeta?.to
        }
      : {};

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <TextField
          required
          fullWidth
          autoFocus={true}
          label="Value"
          type="number"
          value={value}
          InputProps={{ inputProps }}
          onChange={onChange}
        />
      </CardContent>
      <CardActions>
        <Button type="submit">Save</Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardActions>
    </form>
  );
};
