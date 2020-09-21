import React, { useState, useCallback, SyntheticEvent, useEffect } from 'react';
import styled from 'styled-components';
import { TextField } from '../components/TextField';
import { FormControl, FormLabel, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import {
  ActivityType,
  PointsType,
  ActivityCategory,
  RangeMeta,
  useCreateActivityMutation,
  CreateActivityInput,
  refetchGetActivitiesQuery,
  useUpdateActivityMutation,
  useGetActivityLazyQuery
} from '../generated/apollo';
import _ from 'lodash';
import { useUpdateInput } from '../hooks/useUpdateInput';
import { useApolloError } from '../hooks/useApolloError';
import { ErrorMessage } from '../components/ErrorMessage';
import { useHistory, useParams } from 'react-router-dom';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
`;

export const ActivityForm = () => {
  const history = useHistory();
  let { _id } = useParams();
  const isEdit = !!_id;

  const { errorMessage, onError } = useApolloError();

  const onCompleted = useCallback(() => {
    history.replace('/activities');
  }, [history]);

  const [getActivity] = useGetActivityLazyQuery({
    onError,
    onCompleted: (data) => {
      if (data.activity) setActivity(data.activity);
    }
  });
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

  const [activity, setActivity] = useState<CreateActivityInput>({
    name: '',
    emoji: '',
    valueType: ActivityType.Simple,
    pointsType: PointsType.Const,
    category: ActivityCategory.Neutral,
    points: 0
  });

  useEffect(() => {
    if (isEdit) getActivity({ variables: { _id } });
  }, [_id, isEdit, getActivity]);

  const [rangeMeta, setRangeMeta] = useState<Partial<RangeMeta>>({});

  const updateActivityField = useUpdateInput<CreateActivityInput>(setActivity);
  const updateRangeMetaField = useUpdateInput<RangeMeta>(setRangeMeta);

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      if (isEdit) {
        const updatedData = _.omit(activity, ['_id', 'createdAt', '__typename']);
        updateActivity({ variables: { _id, data: updatedData } }).then();
      } else {
        createActivity({ variables: { data: activity } }).then();
      }

      e.preventDefault();
    },
    [activity, createActivity, updateActivity, _id, isEdit]
  );

  return (
    <FormContainer onSubmit={onSubmit}>
      <ErrorMessage errorMessage={errorMessage} />

      <TextField
        required
        label="Name"
        value={activity.name}
        onChange={updateActivityField('name')}
      />
      <TextField
        required
        label="Emoji"
        value={activity.emoji}
        onChange={updateActivityField('emoji')}
      />

      <FormControl margin="normal" required>
        <InputLabel>Activity type</InputLabel>
        <Select value={activity.valueType} onChange={updateActivityField('valueType')} displayEmpty>
          {Object.values(ActivityType).map((activityType) => (
            <MenuItem key={activityType} value={activityType}>
              {_.capitalize(activityType)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

      <FormControl margin="normal" required>
        <InputLabel>Points type</InputLabel>
        <Select
          value={activity.pointsType}
          onChange={updateActivityField('pointsType')}
          displayEmpty
        >
          {Object.values(PointsType).map((pointsType) => (
            <MenuItem key={pointsType} value={pointsType}>
              {_.capitalize(pointsType)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        required
        label="Points"
        type="number"
        value={activity.points}
        onChange={updateActivityField('points', { isNumber: true })}
      />

      {activity.valueType === ActivityType.Range && (
        <FormControl margin="normal">
          <FormLabel>Range</FormLabel>
          <TextField
            required
            type="number"
            label="From"
            value={rangeMeta.from}
            onChange={updateRangeMetaField('from', { isNumber: true })}
          />
          <TextField
            required
            label="To"
            type="number"
            value={rangeMeta.to}
            onChange={updateRangeMetaField('to', { isNumber: true })}
          />
        </FormControl>
      )}

      <SubmitButton type="submit" variant="contained" color="primary">
        {isEdit ? 'Save' : 'Create'}
      </SubmitButton>
    </FormContainer>
  );
};
