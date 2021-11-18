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
import { DescriptionCKEditor } from '../../../../components/DescriptionCKEditor/DescriptionCKEditor';
import { FlexBox } from '../../../../components/FlexBox';
import { sanitizeHtml } from '../../../../helpers/sanitizeHtml';
import { TextEditField } from './components/TextEditField';
import { useReactiveVar } from '@apollo/client';
import { isUploadingVar } from '../../../../reactiveState';

export type EntryModalData = Pick<
  Entry,
  '_id' | 'activityId' | 'completedAt' | 'value' | 'description' | 'points' | 'name'
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
  const [description, setDescription] = useState<string>(entry.description || '');
  const [name, setName] = useState<string>(entry.name || '');
  const [isLoading, setIsLoading] = useState(false);

  const getValueOptional = useCallback((value?: number | null) => {
    return value != null ? { value: Number(value) } : {};
  }, []);
  const getDescriptionOptional = useCallback((description?: string) => {
    return description != null ? { description: sanitizeHtml(description) } : {};
  }, []);
  const getNameOptional = useCallback((name?: string) => {
    return name != null ? { name: sanitizeHtml(name) } : {};
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    onUpdate(
      {
        ...getValueOptional(value),
        ...getDescriptionOptional(description),
        ...getNameOptional(name)
      },
      false
    ).then();
    onDone();

    e.preventDefault();
  };

  const onValueChange: StandardInputProps['onChange'] = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onRangeChange = useCallback((event: ChangeEvent<{}>, value: number | number[]) => {
    setValue(Array.isArray(value) ? value[0] : value);
  }, []);

  const debouncedAutoSave = useDebouncedCallback(
    useCallback(
      async ({ description, name }: { description?: string; name?: string }) => {
        try {
          setIsLoading(true);

          await onUpdate(
            {
              ...getValueOptional(value),
              ...getDescriptionOptional(description),
              ...getNameOptional(name)
            },
            true
          );
        } finally {
          setIsLoading(false);
        }
      },
      [getDescriptionOptional, getNameOptional, getValueOptional, onUpdate, value]
    ),
    1000
  );

  const onDescriptionChange = useCallback(
    (description: string) => {
      setDescription(description);
      debouncedAutoSave.callback({ description });
    },
    [debouncedAutoSave]
  );

  const onNameChange = useCallback(
    (name: string) => {
      setName(name);
      debouncedAutoSave.callback({ name });
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
  const isWithName = entry.name || activity.valueType === ActivityType.Todoist;
  const isSimpleActivity = activity.valueType === ActivityType.Simple;
  const valueLabel = activity.valueLabel || activity.name;
  const descriptionLabel =
    !isWithValue && activity.isWithDescription ? activity.name : 'Description';

  const isFileUploading = useReactiveVar(isUploadingVar);

  if (!activity) return <Fragment />;

  return (
    <form onSubmit={onSubmit}>
      <CardContentStyled>
        {isWithValue && (
          <FlexBox column gap={4}>
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
            isSaving={isLoading}
          />
        )}

        {isWithName && (
          <TextEditField
            label="Name"
            value={name}
            onChange={onNameChange}
            isFocusDescription={isSimpleActivity}
            isLoading={isLoading}
          />
        )}
      </CardContentStyled>

      <CardActionsStyled>
        <Button onClick={onDelete} disabled={isFileUploading}>
          Delete
        </Button>

        <Button type="submit" variant="contained" color="primary" disabled={isFileUploading}>
          Done
        </Button>
      </CardActionsStyled>
    </form>
  );
};
