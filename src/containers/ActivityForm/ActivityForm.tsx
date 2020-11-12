import React, { useState, useCallback, SyntheticEvent, useEffect } from 'react';
import styled from 'styled-components';
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Typography,
  Input
} from '@material-ui/core';
import {
  ActivityType,
  PointsType,
  ActivityCategory,
  RangeMeta,
  useCreateActivityMutation,
  CreateActivityInput,
  refetchGetActivitiesQuery,
  useUpdateActivityMutation,
  RangeMetaInput,
  useGetActivityQuery
} from '../../generated/apollo';
import _ from 'lodash';
import { useUpdateInput } from '../../hooks/useUpdateInput';
import { useApolloError } from '../../hooks/useApolloError';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useHistory, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { FabButton } from '../../components/FabButton';
import { ActivityResult } from '../../common/types';
import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import { TooltipCheckbox } from '../../components/TooltipCheckbox';
import { LinearPointsTooltip } from './LinearPointsTooltip';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EmojiInput = styled(Input)`
  width: 32px;
  margin-right: 10px;

  input {
    text-align: center;
  }
`;

export const ActivityForm = () => {
  const history = useHistory();
  let { _id } = useParams<{ _id: string }>();
  const isEdit = !!_id;

  const { errorMessage, onError, errorTime } = useApolloError({ isForceShowError: true });

  const onCompleted = useCallback(() => {
    history.replace('/activities');
  }, [history]);

  const { data } = useGetActivityQuery({ onError, variables: { _id }, skip: !isEdit });
  const existingActivity: Partial<ActivityResult> = isEdit && data?.activity ? data?.activity : {};

  const [createActivity] = useCreateActivityMutation({
    onError,
    onCompleted,
    refetchQueries: [refetchGetActivitiesQuery()]
  });
  const [updateActivity] = useUpdateActivityMutation({
    onError,
    onCompleted,
    refetchQueries: [refetchGetActivitiesQuery()]
  });

  const [activity, setActivity] = useState<Partial<CreateActivityInput>>({
    name: '',
    emoji: '',
    valueType: ActivityType.Simple,
    pointsType: PointsType.Const,
    category: ActivityCategory.Neutral,
    points: undefined,
    ...existingActivity
  });
  const [rangeMeta, setRangeMeta] = useState<Partial<RangeMeta>>({
    ...existingActivity?.rangeMeta
  });
  const [isWithValue, setIsWithValue] = useState(
    existingActivity?.valueType === ActivityType.Value ||
      existingActivity?.valueType === ActivityType.Range
  );
  const [isWithRange, setIsWithRange] = useState(existingActivity.valueType === ActivityType.Range);
  const [isLinearPoints, setIsLinearPoints] = useState(
    existingActivity.pointsType === PointsType.Linear
  );

  const updateActivityField = useUpdateInput<CreateActivityInput>(setActivity);
  const updateRangeMetaField = useUpdateInput<RangeMeta>(setRangeMeta);

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      const rangeMetaInput: RangeMetaInput | undefined =
        activity.valueType === ActivityType.Range
          ? ({ from: rangeMeta.from, to: rangeMeta.to } as RangeMetaInput)
          : undefined;

      const formData = {
        name: activity.name!,
        emoji: activity.emoji!,
        valueType: activity.valueType!,
        pointsType: activity.pointsType!,
        category: activity.category!,
        points: Number(activity.points),
        rangeMeta:
          activity.valueType === ActivityType.Range
            ? { from: Number(rangeMetaInput?.from!), to: Number(rangeMetaInput?.to!) }
            : null
      };

      if (isEdit) {
        updateActivity({ variables: { _id, data: formData } }).then();
      } else {
        createActivity({ variables: { data: formData } }).then();
      }

      e.preventDefault();
    },
    [activity, rangeMeta, createActivity, updateActivity, _id, isEdit]
  );

  const onToggleIsWithValue: SwitchBaseProps['onChange'] = useCallback((e) => {
    const isCheck: boolean = e.target.checked;

    setIsWithValue(isCheck);
    if (!isCheck) setIsWithRange(false);

    setActivity((prev) => ({
      ...prev,
      valueType: isCheck ? ActivityType.Value : ActivityType.Simple
    }));
  }, []);

  const onToggleIsWithRange: SwitchBaseProps['onChange'] = useCallback((e) => {
    const isCheck: boolean = e.target.checked;

    setIsWithRange(isCheck);
    setActivity((prev) => ({
      ...prev,
      valueType: isCheck ? ActivityType.Range : ActivityType.Value
    }));
  }, []);

  const onToggleIsLinearPoints: SwitchBaseProps['onChange'] = useCallback((e) => {
    const isCheck: boolean = e.target.checked;

    setIsLinearPoints(isCheck);
    setActivity((prev) => ({
      ...prev,
      pointsType: isCheck ? PointsType.Linear : PointsType.Const
    }));
  }, []);

  const selectAll: StandardInputProps['onFocus'] = useCallback((event) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.setSelectionRange(0, target.value.length ?? 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!existingActivity) return <Spinner />;

  return (
    <FormContainer onSubmit={onSubmit}>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

      <NameContainer>
        <FormControl>
          <InputLabel>Emoji</InputLabel>
          <EmojiInput
            required
            value={activity.emoji}
            onChange={updateActivityField('emoji')}
            inputProps={{
              shrink: 'true'
            }}
            margin="dense"
            onFocus={selectAll}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Name *</InputLabel>
          <Input
            required
            value={activity.name}
            onChange={updateActivityField('name')}
            inputProps={{
              shrink: 'true'
            }}
            margin="dense"
          />
        </FormControl>
      </NameContainer>

      <FormControl margin="dense" required>
        <InputLabel>Category</InputLabel>
        <Select value={activity.category} onChange={updateActivityField('category')} displayEmpty>
          {Object.values(ActivityCategory).map((category) => (
            <MenuItem key={category} value={category}>
              {_.capitalize(category)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        required
        margin="dense"
        label="Points"
        type="text"
        inputProps={{
          shrink: 'true',
          inputMode: 'numeric'
        }}
        value={activity.points ?? 0}
        onChange={updateActivityField('points')}
        onFocus={selectAll}
      />

      <TooltipCheckbox
        text="Activity with value"
        tooltipContent={
          <Typography color="inherit" variant="body2" component="p">
            Value can be the number of push-ups, how good was your mood, or how many swearing words
            you said. Track whatever you want
          </Typography>
        }
        onChange={onToggleIsWithValue}
        checked={isWithValue}
      />

      {isWithValue && (
        <TooltipCheckbox
          text="Value has specific range"
          tooltipContent={
            <Typography color="inherit" variant="body2" component="p">
              If you know the exact range of your value, like rating of your sleep from 1 to 5, you
              can specify these boundaries
            </Typography>
          }
          onChange={onToggleIsWithRange}
          checked={isWithRange}
        />
      )}

      {activity.valueType === ActivityType.Range && (
        <FormControl margin="dense">
          <FormLabel>Range</FormLabel>
          <TextField
            required
            type="text"
            margin="dense"
            inputProps={{
              shrink: 'true',
              inputMode: 'numeric'
            }}
            label="From"
            value={rangeMeta.from ?? ''}
            onChange={updateRangeMetaField('from')}
            onFocus={selectAll}
          />
          <TextField
            required
            margin="dense"
            label="To"
            type="text"
            inputProps={{
              shrink: 'true',
              inputMode: 'numeric'
            }}
            value={rangeMeta.to ?? ''}
            onChange={updateRangeMetaField('to')}
            onFocus={selectAll}
          />
        </FormControl>
      )}

      {isWithValue && (
        <TooltipCheckbox
          text="Linear points grow"
          tooltipContent={<LinearPointsTooltip />}
          onChange={onToggleIsLinearPoints}
          checked={isLinearPoints}
        />
      )}

      <FabButton type="submit" icon="save" />
    </FormContainer>
  );
};
