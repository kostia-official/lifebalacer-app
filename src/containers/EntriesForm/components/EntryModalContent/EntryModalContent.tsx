import { ActivityType, Entry } from '../../../../generated/apollo';
import { ActivityResult, EntryResult } from '../../../../common/types';
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
  FormControl,
  InputLabel
} from '@material-ui/core';
import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';
import _ from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
import { DescriptionCKEditor } from './components/DescriptionCKEditor';
import { FlexBox } from '../../../../components/FlexBox';
import { sanitizeHtml } from '../../../../helpers/sanitizeHtml';

export type EntryModalData = Pick<
  Entry,
  '_id' | 'activityId' | 'completedAt' | 'value' | 'description' | 'points'
>;

export interface EntryValueModalContentProps {
  onUpdate: (toUpdate: Partial<EntryResult>, isAutoSave: boolean) => Promise<void>;
  onDone: () => void;
  onDelete: () => void;
  entry: EntryModalData;
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
  gap: 20px;
  width: 80vw;
  max-width: 500px;
  padding: 8px 16px 16px 16px;
`;

const SliderLabel = styled(FormLabel)`
  margin-bottom: 16px;
`;

const SliderWrapper = styled.div`
  margin-right: 4px;
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
      onUpdate({ ...getValueOptional(), description }, false).then();
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

          await onUpdate(
            {
              ...getValueOptional(),
              description: sanitizeHtml(description)
            },
            true
          );
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
  const isSimpleActivity = activity.valueType === ActivityType.Simple;
  const valueLabel = activity.valueLabel || activity.name;
  const descriptionLabel = isSimpleActivity ? activity.name : 'Description';

  if (!activity) return <Fragment />;

  return (
    <form onSubmit={onSubmit}>
      <CardContentStyled>
        {isWithValue && (
          <FlexBox column>
            <InputLabel>{valueLabel}</InputLabel>
            <TextField
              required
              fullWidth
              autoFocus
              type="text"
              value={value || ''}
              InputProps={{
                inputProps: {
                  inputMode: 'numeric'
                }
              }}
              onChange={onValueChange}
            />
          </FlexBox>
        )}

        {activity.valueType === ActivityType.Range && (
          <FormControl>
            <SliderLabel>{valueLabel}</SliderLabel>
            <SliderWrapper>
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
            </SliderWrapper>
          </FormControl>
        )}

        {isWithDescription && (
          <DescriptionCKEditor
            label={descriptionLabel}
            value={description}
            onChange={onDescriptionChange}
            isFocusDescription={isSimpleActivity}
            isLoading={isLoading}
          />
        )}
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
