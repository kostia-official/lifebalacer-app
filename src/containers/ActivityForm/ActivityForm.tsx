import React, { useState, useCallback, SyntheticEvent } from 'react';
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
  useGetActivityQuery,
  refetchGetActivitiesExtremesQuery
} from '../../generated/apollo';
import _ from 'lodash';
import { useUpdateInput } from '../../hooks/useUpdateInput';
import { useApolloError } from '../../hooks/useApolloError';
import { FabButton } from '../../components/FabButton';
import { ActivityResult } from '../../common/types';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import { TooltipCheckbox } from '../../components/TooltipCheckbox';
import { LinearPointsTooltip } from './LinearPointsTooltip';
import { useSelectOnInputFocus } from '../../hooks/useSelectOnInputFocus';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { EmojiPicker } from './EmojiPicker';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import { FabWrapper } from '../../components/FabWrapper';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;

  justify-content: flex-end;
`;

const EmojiFormControl = styled(FormControl)`
  max-width: 54px;
  min-width: 54px;
`;

const EmojiLabel = styled(InputLabel)`
  white-space: nowrap;
  margin-left: 8px;
`;

const EmojiInput = styled(Input)`
  font-size: 20px;

  & .MuiInputBase-input {
    padding: 2px 0 3px 0;
  }

  input {
    text-align: center;
  }
`;

const NameFormControl = styled(FormControl)`
  margin-right: 5px;
`;

const EMOJI_PICKER_CLASS_NAME = 'emoji-picker-' + Date.now();

const ActivityForm = () => {
  const { params } = useRoute<RouteProp<NavigationParams, 'ActivityEdit'>>();
  const _id = params.id;

  const isEdit = !!_id;

  const { errorMessage, onError, errorTime } = useApolloError({ isForceShowError: true });

  const { goBackCb } = useNavigationHelpers();

  const { data } = useGetActivityQuery({ onError, variables: { _id }, skip: !isEdit });
  const existingActivity: Partial<ActivityResult> = isEdit && data?.activity ? data?.activity : {};

  const mutationOptions = {
    onError,
    onCompleted: goBackCb('/'),
    refetchQueries: [refetchGetActivitiesQuery(), refetchGetActivitiesExtremesQuery()]
  };

  const [createActivity] = useCreateActivityMutation(mutationOptions);
  const [updateActivity] = useUpdateActivityMutation(mutationOptions);

  const [activity, setActivity] = useState<Partial<CreateActivityInput>>({
    name: '',
    emoji: '',
    valueType: ActivityType.Simple,
    pointsType: PointsType.Const,
    category: ActivityCategory.Neutral,
    points: undefined,
    isWithDescription: false,
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
        points: _.isNil(activity.points) ? 0 : Number(activity.points),
        isWithDescription: activity.isWithDescription,
        isRequired: activity.isRequired,
        dateIsRequiredSet: activity.dateIsRequiredSet,
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

  const onToggleIsWithDescription: SwitchBaseProps['onChange'] = useCallback((e) => {
    const isCheck: boolean = e.target.checked;

    setActivity((prev) => ({ ...prev, isWithDescription: isCheck }));
  }, []);

  const onToggleIsRequired: SwitchBaseProps['onChange'] = useCallback((e) => {
    const isCheck: boolean = e.target.checked;

    setActivity((prev) => ({
      ...prev,
      isRequired: isCheck,
      dateIsRequiredSet: new Date().toISOString()
    }));
  }, []);

  const { preventMobileSelectionMenu, selectAllOnFocus } = useSelectOnInputFocus();

  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);

  const onEmojiClick = useCallback((e) => {
    setIsShowEmojiPicker((prev) => !prev);
    e.stopPropagation();
  }, []);

  const onEmojiSelect = useCallback((emoji) => {
    setActivity((prev) => ({ ...prev, emoji }));
    setIsShowEmojiPicker(false);
  }, []);

  return (
    <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!existingActivity}>
      <FormContainer onSubmit={onSubmit}>
        <NameContainer>
          <NameFormControl fullWidth>
            <InputLabel shrink required>
              Name
            </InputLabel>
            <Input
              required
              value={activity.name}
              onChange={updateActivityField('name')}
              inputProps={{
                shrink: 'true'
              }}
              margin="dense"
            />
          </NameFormControl>

          <EmojiFormControl>
            <EmojiLabel shrink required onClick={onEmojiClick}>
              Emoji
            </EmojiLabel>
            <EmojiInput
              required
              value={activity.emoji}
              onChange={updateActivityField('emoji')}
              margin="dense"
              onClick={onEmojiClick}
              readOnly
              className={EMOJI_PICKER_CLASS_NAME}
            />
            <EmojiPicker
              isShow={isShowEmojiPicker}
              setIsShow={setIsShowEmojiPicker}
              onSelect={onEmojiSelect}
              ignoreClassClickOutside={EMOJI_PICKER_CLASS_NAME}
            />
          </EmojiFormControl>
        </NameContainer>

        <FormControl margin="normal" required>
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
            inputMode: 'numeric'
          }}
          value={activity.points ?? 0}
          onChange={updateActivityField('points')}
          onFocus={selectAllOnFocus}
          onSelect={preventMobileSelectionMenu}
        />

        <TooltipCheckbox
          text="Required for every day tracking"
          tooltipContent={
            <Typography color="inherit" variant="body2" component="p">
              Good for activities that need to be tracked every day, like mood or sleep. You will
              see if you miss to add an entry.
            </Typography>
          }
          onChange={onToggleIsRequired}
          checked={!!activity.isRequired}
        />

        {!activity.isWidget && (
          <TooltipCheckbox
            text="With value"
            tooltipContent={
              <Typography color="inherit" variant="body2" component="p">
                Value can be the number of push-ups, how good was your mood, or how many swearing
                words you said. Track whatever you want
              </Typography>
            }
            onChange={onToggleIsWithValue}
            checked={isWithValue}
          />
        )}

        {!activity.isWidget && isWithValue && (
          <TooltipCheckbox
            text="Value has a specific range"
            tooltipContent={
              <Typography color="inherit" variant="body2" component="p">
                If you know the exact range of your value, like rating of your sleep from 1 to 5,
                you can specify these boundaries
              </Typography>
            }
            onChange={onToggleIsWithRange}
            checked={isWithRange}
          />
        )}

        {activity.valueType === ActivityType.Range && (
          <FormControl margin="dense">
            <FormLabel>Range</FormLabel>

            <FormControl margin="normal">
              <InputLabel shrink required>
                From
              </InputLabel>
              <Input
                required
                type="text"
                margin="dense"
                inputProps={{ inputMode: 'numeric' }}
                value={rangeMeta.from ?? ''}
                onChange={updateRangeMetaField('from')}
                onFocus={selectAllOnFocus}
                onSelect={preventMobileSelectionMenu}
              />
            </FormControl>

            <FormControl margin="dense">
              <InputLabel shrink required>
                To
              </InputLabel>
              <Input
                required
                margin="dense"
                type="text"
                inputProps={{ inputMode: 'numeric' }}
                value={rangeMeta.to ?? ''}
                onChange={updateRangeMetaField('to')}
                onFocus={selectAllOnFocus}
                onSelect={preventMobileSelectionMenu}
              />
            </FormControl>
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

        {!activity.isWidget && (
          <TooltipCheckbox
            text="With description"
            tooltipContent={
              <Typography color="inherit" variant="body2" component="p">
                You can add additional text to the entry. For example, you can describe your day or
                note what your dream was.
              </Typography>
            }
            onChange={onToggleIsWithDescription}
            checked={!!activity.isWithDescription}
          />
        )}

        <FabWrapper>
          <FabButton type="submit" icon="save" />
        </FabWrapper>
      </FormContainer>
    </ScreenWrapper>
  );
};

export default ActivityForm;
