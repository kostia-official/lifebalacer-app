import React, { useCallback, useState } from 'react';
import { useApolloError } from '../hooks/useApolloError';
import { Loadable } from '../components/Loadable';
import _ from 'lodash';
import {
  useGetReminderQuery,
  useUpsertReminderMutation,
  refetchGetReminderQuery
} from '../generated/apollo';
import { TimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const Reminders = () => {
  const { errorMessage, onError, errorTime } = useApolloError();
  const { data } = useGetReminderQuery({ onError });
  const [upsertReminderMutation] = useUpsertReminderMutation({
    onError,
    refetchQueries: [refetchGetReminderQuery()]
  });

  const [date, setDate] = useState<string | null>(data?.reminder?.remindAt || null);

  const upsertReminder = useCallback(
    (remindAt: string) => {
      const idField = { _id: data?.reminder?._id };
      upsertReminderMutation({
        variables: { data: { remindAt, ...idField } }
      }).then();
      setDate(remindAt);
    },
    [upsertReminderMutation, data]
  );

  const onDateChange = useCallback(
    (date: MaterialUiPickersDate) => {
      date && upsertReminder(date.toISO());
    },
    [upsertReminder]
  );

  return (
    <Loadable errorMessage={errorMessage} errorTime={errorTime} isLoading={_.isEmpty(data)}>
      <TimePicker
        label="Remind at"
        value={date}
        emptyLabel="Select time..."
        onChange={onDateChange}
        ampm={false}
      />
    </Loadable>
  );
};
