import { ActivityType } from '../../generated/apollo';
import { ActivityResult, EntryResult, SelectedEntry } from '../../common/types';
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
import { useDebouncedCallback } from 'use-debounce';
import { DescriptionCKEditor } from './DescriptionCKEditor';
import { useIsInternalTestUser } from '../../hooks/useIsInternalTestUser';
import { DescriptionTextField } from './DescriptionTextField';

export interface EntryValueModalContentProps {
  onUpdate: (toUpdate: Partial<EntryResult>) => Promise<void>;
  onDone: () => void;
  onDelete: () => void;
  entry: SelectedEntry;
  activity: ActivityResult;
  isForceDescription: boolean;
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
  padding: 0 16px 16px 16px;
`;

const SliderLabel = styled(FormLabel)`
  margin-bottom: 16px;
`;

export const EntryModalContent: React.FC<EntryValueModalContentProps> = ({
  onDone,
  onUpdate,
  onDelete,
  entry,
  activity,
  isForceDescription
}) => {
  const min = activity?.rangeMeta?.from!;
  const max = activity?.rangeMeta?.to!;
  const averageValue = Math.ceil((max + min) / 2);

  const [value, setValue] = useState(
    activity.valueType === ActivityType.Range ? entry.value || averageValue : entry.value
  );
  const getValueOptional = useCallback(() => {
    return _.isNil(value) ? {} : { value: Number(value) };
  }, [value]);

  const [description, setDescription] = useState<string>(entry.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      onUpdate({ ...getValueOptional(), description }).then();
      onDone();

      e.preventDefault();
    },
    [onUpdate, getValueOptional, description, onDone]
  );

  const onValueChange: StandardInputProps['onChange'] = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onRangeChange = useCallback((event: ChangeEvent<{}>, value: number | number[]) => {
    setValue(Array.isArray(value) ? value[0] : value);
  }, []);

  const debouncedAutoSave = useDebouncedCallback(
    useCallback(
      async (description: string) => {
        try {
          setIsLoading(true);

          await onUpdate({ ...getValueOptional(), description });
        } finally {
          setIsLoading(false);
        }
      },
      [getValueOptional, onUpdate]
    ),
    1000
  );

  const onDescriptionChange = useCallback(
    (description: string) => {
      setDescription(description);
      debouncedAutoSave.callback(description);
    },
    [debouncedAutoSave]
  );

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
  const isWithDescription = isForceDescription || activity.isWithDescription || entry.description;
  const isFocusDescription = activity.valueType === ActivityType.Simple;
  const valueLabel = activity.valueLabel || activity.name;

  const isInternalTestUser = useIsInternalTestUser();

  if (!activity) return <Fragment />;

  return (
    <form onSubmit={onSubmit}>
      <CardContentStyled>
        {isWithValue && (
          <TextField
            required
            fullWidth
            autoFocus
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

        {isWithDescription &&
          (isInternalTestUser ? (
            <DescriptionCKEditor value={description} onChange={onDescriptionChange} />
          ) : (
            <DescriptionTextField
              value={description}
              onChange={onDescriptionChange}
              isFocusDescription={isFocusDescription}
              isLoading={isLoading}
            />
          ))}
      </CardContentStyled>

      <CardActionsStyled>
        <Button onClick={onDelete}>Delete</Button>
        <Button type="submit" variant="contained" color="primary">
          Done
        </Button>
      </CardActionsStyled>
    </form>
  );
};
