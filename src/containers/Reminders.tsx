import React, { useCallback, useState, useEffect } from 'react';
import { useApolloError } from '../hooks/useApolloError';
import { ScreenWrapper } from './App/ScreenWrapper';
import {
  useGetReminderQuery,
  useUpsertReminderMutation,
  refetchGetReminderQuery
} from '../generated/apollo';
import { TimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LogoContent } from '../components/LogoContent';
import { ReactComponent as ReminderLogo } from '../assets/reminder.svg';
import { css } from 'styled-components';
import { useLocalNotificationsUpdate } from '../hooks/useLocalNotificationsUpdate';

const logoStyles = css`
  max-width: 300px;
  width: 60vw;
  margin-top: 6px;
  margin-bottom: 10px;
`;

const Reminders = () => {
  const { errorMessage, onError, errorTime } = useApolloError();

  const { data } = useGetReminderQuery({ onError });
  const remindAt = data?.reminder?.remindAt;

  useLocalNotificationsUpdate({ onError });

  const [upsertReminderMutation] = useUpsertReminderMutation({
    onError,
    refetchQueries: [refetchGetReminderQuery()]
  });

  const [date, setDate] = useState<string | null>(remindAt || null);

  useEffect(() => {
    setDate(remindAt);
  }, [remindAt]);

  const updateDate = useCallback(
    async (remindAt: string) => {
      setDate(remindAt);

      const idField = { _id: data?.reminder?._id };
      await upsertReminderMutation({
        variables: { data: { remindAt, ...idField } }
      });
    },
    [data?.reminder?._id, upsertReminderMutation]
  );

  const onDateChange = useCallback(
    (date: MaterialUiPickersDate) => {
      date && updateDate(date.set({ second: 0, millisecond: 0 }).toISO());
    },
    [updateDate]
  );

  return (
    <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!data}>
      <LogoContent logo={ReminderLogo} logoStyles={logoStyles} />

      <TimePicker
        label="Remind at"
        value={date}
        emptyLabel="Select time..."
        onChange={onDateChange}
        ampm={false}
        fullWidth
      />
    </ScreenWrapper>
  );
};

export default Reminders;
