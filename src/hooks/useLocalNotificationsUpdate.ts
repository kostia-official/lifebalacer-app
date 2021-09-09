import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { useGetReminderQuery } from '../generated/apollo';
import { LocalNotifications } from '@capacitor/local-notifications';
import { DateTime } from 'luxon';
import { useMount } from 'react-use';
import { useNavigationHelpers } from './useNavigationHelpers';
import { getAppType } from '../common/platform';

export interface UseApolloErrorProps {
  onError?: (error: ApolloError) => void;
}

export interface NotificationExtra {
  date: string;
}

const notificationId = Date.now();

export const useLocalNotificationsUpdate = ({ onError }: UseApolloErrorProps) => {
  const { data } = useGetReminderQuery({ onError });
  const { goForwardTo } = useNavigationHelpers();

  const remindAt = data?.reminder?.remindAt;

  useMount(() => {
    if (getAppType() === 'pwa') return;

    LocalNotifications.addListener('localNotificationActionPerformed', (e) => {
      const extra: NotificationExtra = e.notification.extra;
      goForwardTo('EntriesForm', { date: extra.date });
    });
  });

  useEffect(() => {
    (async () => {
      if (getAppType() === 'pwa') return;
      if (!remindAt) return;

      const luxonDate = DateTime.fromISO(remindAt);
      const hour = luxonDate.get('hour');
      const minute = luxonDate.get('minute');

      try {
        await LocalNotifications.cancel(await LocalNotifications.getPending());
      } catch (e) {}

      await LocalNotifications.requestPermissions();
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Life Balancer Reminder',
            body: 'Hi! How was your day?',
            id: notificationId,
            extra: { date: luxonDate.toISODate() },
            schedule: { on: { hour, minute } }
          }
        ]
      });
    })();
  }, [remindAt]);
};
