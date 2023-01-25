import { ApolloError } from '@apollo/client';
import { pushService } from '../../services/push';
import { useCallback } from 'react';
import {
  useUpsertPushTokenMutation,
  useGetReminderQuery,
  refetchGetPushTokensQuery,
  useGetPushTokensQuery
} from '../../generated/apollo';
import { useGetSyncedCachePolicy } from './useSyncedCachePolicy';
import { getAppType } from '../../common/platform';

export interface UseApolloErrorProps {
  onError?: (error: ApolloError) => void;
}

export const usePushTokenUpdate = ({ onError }: UseApolloErrorProps) => {
  const [upsertPushTokenMutation] = useUpsertPushTokenMutation({
    onError,
    refetchQueries: [refetchGetPushTokensQuery()]
  });
  const { getSyncedCachePolicy } = useGetSyncedCachePolicy();

  const { data: pushTokenData } = useGetPushTokensQuery({
    onError,
    ...getSyncedCachePolicy({
      onCompleted: () => {
        upsertPushToken();
      }
    })
  });
  const { data: reminderData } = useGetReminderQuery({ onError, ...getSyncedCachePolicy() });

  const getIsTokenExists = useCallback(
    (newToken: string) => {
      return !!pushTokenData?.pushTokens?.find((saved) => saved.token === newToken);
    },
    [pushTokenData?.pushTokens]
  );

  const upsertPushToken = useCallback(async () => {
    if (getAppType() === 'cap') return;

    if (!reminderData?.reminder?.remindAt) return;

    const token = await pushService.getToken();
    if (!token) return;
    if (getIsTokenExists(token)) return;

    await upsertPushTokenMutation({ variables: { data: { token } } });
  }, [getIsTokenExists, reminderData?.reminder?.remindAt, upsertPushTokenMutation]);

  return { upsertPushToken };
};
