import { ActivityType } from '../../generated/apollo';
import { ActivityResult, EntryResult } from '../../common/types';
import React, {
  useState,
  useCallback,
  SyntheticEvent,
  ChangeEvent,
  useEffect,
  useMemo,
  Fragment
} from 'react';
import styled from 'styled-components';
import {
  CardActions,
  CardContent,
  Slider,
  TextField,
  Button,
  FormLabel,
  FormControl
} from '@material-ui/core';
import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';
import _ from 'lodash';

export interface EntryValueModalContentProps {
  onSave: (toUpdate: Partial<EntryResult>) => void;
  onDelete: () => void;
  entry: EntryResult;
  activity: ActivityResult;
}

const CardActionsStyled = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

const CardContentStyled = styled(CardContent)`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 500px;
`;

const SliderLabel = styled(FormLabel)`
  margin-bottom: 18px;
`;

export const EntryValueModalContent: React.FC<EntryValueModalContentProps> = ({
  onSave,
  onDelete,
  entry,
  activity
}) => {
  const min = activity?.rangeMeta?.from!;
  const max = activity?.rangeMeta?.to!;
  const averageValue = Math.ceil((max + min) / 2);

  const [value, setValue] = useState(
    activity.valueType === ActivityType.Range ? entry.value || averageValue : entry.value
  );
  const [description, setDescription] = useState<string>(entry.description || '');

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      const valueProperty = _.isNil(value) ? {} : { value: Number(value) };
      onSave({ ...valueProperty, description });

      e.preventDefault();
    },
    [value, description, onSave]
  );

  const onValueChange: StandardInputProps['onChange'] = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onRangeChange = useCallback((event: ChangeEvent<{}>, value: number | number[]) => {
    setValue(Array.isArray(value) ? value[0] : value);
  }, []);

  const onDescriptionChange: StandardInputProps['onChange'] = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  useEffect(() => {
    if (entry.value) setValue(entry.value);
  }, [entry]);

  const marks = useMemo(() => {
    return _.range(min, max + 1).map((n) => {
      return {
        value: n,
        label: n
      };
    });
  }, [min, max]);

  const isWithValue = [ActivityType.Value, ActivityType.Todoist].includes(activity.valueType);
  const isWithDescription = activity.isWithDescription || entry.description;
  const valueLabel = activity.valueLabel || 'Value';

  if (!activity) return <Fragment />;

  return (
    <form onSubmit={onSubmit}>
      <CardContentStyled>
        {isWithValue && (
          <TextField
            required
            fullWidth
            autoFocus={true}
            label={valueLabel}
            type="text"
            value={value || ''}
            InputProps={{
              inputProps: {
                inputMode: 'numeric'
              }
            }}
            onChange={onValueChange}
          />
        )}

        {activity.valueType === ActivityType.Range && (
          <FormControl margin="dense">
            <SliderLabel>{valueLabel}</SliderLabel>
            <Slider
              value={value || averageValue}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              onChange={onRangeChange}
              min={min}
              max={max}
            />
          </FormControl>
        )}

        {isWithDescription && (
          <TextField
            margin="normal"
            label="Description"
            type="text"
            value={description}
            onChange={onDescriptionChange}
            multiline
          />
        )}
      </CardContentStyled>

      <CardActionsStyled>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardActionsStyled>
    </form>
  );
};
