import React, { useCallback } from 'react';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import {
  useGetGoalQuery,
  CreateGoalInput,
  ConditionType,
  DurationType,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  refetchGetGoalsQuery,
  refetchGetCurrentGoalsResultsQuery,
  useCheckFailedGoalsResultsMutation
} from '../../generated/apollo';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { FabWrapper } from '../../components/FabWrapper';
import { FabButton } from '../../components/FabButton';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, Select, InputLabel } from '@material-ui/core';
import { useActivities } from '../../hooks/apollo/useActivities';
import { Spacer } from '../../components/Spacer';
import { DateTime } from 'luxon';
import { formatDateLabel } from '../../common/datePicker';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { omit } from 'remeda';
import { parseFloatValue, parseIntValue } from '../../common/form';
import { conditionTypeTextMap } from '../../common/goals';
import { DatePickerWithActivityData } from './components/DatePickerWithActivityData';

const ConditionFormControl = styled(FormControl)`
  width: 74px;
`;

const ConditionInputLabel = styled(InputLabel)`
  white-space: nowrap;
`;

const GoalForm = () => {
  const { params } = useRoute<RouteProp<NavigationParams, 'GoalEdit'>>();
  const _id = params.id;
  const isEdit = !!_id && _id !== 'create';

  const { goBack } = useNavigationHelpers();

  const { errorMessage, onError, errorTime } = useApolloError();

  const { data } = useGetGoalQuery({ onError, variables: { _id }, skip: !isEdit });
  const isArchived = data?.goal?.isArchived;

  const { activities } = useActivities({ onError });

  const initialValues: Partial<CreateGoalInput> =
    isEdit && data?.goal
      ? omit(data?.goal, ['activity', '_id', '__typename', 'isArchived'])
      : {
          conditionType: ConditionType.GreaterOrEqual,
          durationType: DurationType.Week,
          lastSyncAt: DateTime.local().toISO()
        };

  const [checkFailedGoalsResults] = useCheckFailedGoalsResultsMutation({ onError });

  const mutationOptions = {
    onError,
    refetchQueries: isArchived
      ? []
      : [refetchGetGoalsQuery(), refetchGetCurrentGoalsResultsQuery()],
    onCompleted: async () => {
      goBack('/');
      if (!isArchived) await checkFailedGoalsResults();
    }
  };
  const [createGoalMutation] = useCreateGoalMutation(mutationOptions);
  const [updateGoalMutation] = useUpdateGoalMutation(mutationOptions);

  const onSubmit = useCallback(
    async (data: CreateGoalInput) => {
      if (isEdit) {
        updateGoalMutation({ variables: { _id, data } });
      } else {
        createGoalMutation({ variables: { data } });
      }
    },
    [_id, createGoalMutation, isEdit, updateGoalMutation]
  );

  return (
    <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={isEdit && !data}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Spacer flex column spacingY={16}>
              <Field
                name="activityId"
                render={({ input: { value, onChange } }) => (
                  <FormControl>
                    <InputLabel shrink required htmlFor="activity">
                      Activity
                    </InputLabel>
                    <Select
                      native
                      required
                      inputProps={{ id: 'activity' }}
                      value={value}
                      onChange={onChange}
                      disabled={isEdit}
                    >
                      <option key={-1} value={undefined}>
                        {' '}
                      </option>
                      {activities?.map(({ _id, name, emoji }) => (
                        <option key={_id} value={_id}>
                          {emoji} {name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

              <Spacer flex row spacingX={8}>
                <Field
                  name="conditionType"
                  render={({ input: { value, onChange } }) => (
                    <ConditionFormControl>
                      <ConditionInputLabel shrink required htmlFor="conditionType">
                        Condition
                      </ConditionInputLabel>
                      <Select
                        native
                        required
                        inputProps={{ id: 'conditionType' }}
                        value={value}
                        onChange={onChange}
                      >
                        <option value={ConditionType.GreaterOrEqual}>
                          {conditionTypeTextMap[ConditionType.GreaterOrEqual]}
                        </option>
                        <option value={ConditionType.LessOrEqual}>
                          {conditionTypeTextMap[ConditionType.LessOrEqual]}
                        </option>
                      </Select>
                    </ConditionFormControl>
                  )}
                />

                <Field
                  name="timesPerDuration"
                  parse={parseIntValue}
                  render={({ input: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      type="number"
                      required
                      fullWidth
                      label="Times"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Spacer>

              <Field
                name="durationType"
                render={({ input: { value, onChange } }) => (
                  <FormControl>
                    <InputLabel shrink required htmlFor="durationType">
                      Duration
                    </InputLabel>
                    <Select
                      native
                      required
                      disabled={isEdit}
                      inputProps={{ id: 'durationType' }}
                      value={value}
                      onChange={onChange}
                    >
                      <option value={DurationType.Week}>Week</option>
                      <option value={DurationType.Month}>Month</option>
                    </Select>
                  </FormControl>
                )}
              />

              <Spacer flex row spacingX={8}>
                <Field
                  name="successPoints"
                  parse={parseFloatValue}
                  render={({ input: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      type="number"
                      label="Success points"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />

                <Field
                  name="failPoints"
                  parse={parseFloatValue}
                  render={({ input: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      type="number"
                      label="Fail points"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Spacer>

              <Field
                name="lastSyncAt"
                render={({ input: { value, onChange } }) => (
                  <DatePickerWithActivityData
                    activityId={values.activityId}
                    required
                    label="Update result from"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    labelFunc={formatDateLabel}
                    autoOk
                  />
                )}
              />

              <FabWrapper>
                <FabButton type="submit" icon={<SaveIcon />} />
              </FabWrapper>
            </Spacer>
          </form>
        )}
      />
    </ScreenWrapper>
  );
};

export default GoalForm;
