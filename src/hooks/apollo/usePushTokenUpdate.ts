import { ApolloError } from '@apollo/client';
import { pushService } from '../../services/push';
import { useEffect, useCallback } from 'react';
import {
  useUpsertPushTokenMutation,
  useGetReminderQuery,
  refetchGetPushTokensQuery,
  useGetPushTokensQuery
} from '../../generated/apollo';
import { useSyncedCachePolicy } from './useSyncedCachePolicy';
import { getAppType } from '../../common/platform';

export interface UseApolloErrorProps {
  onError?: (error: ApolloError) => void;
}

export const usePushTokenUpdate = ({ onError }: UseApolloErrorProps) => {
  const [upsertPushTokenMutation] = useUpsertPushTokenMutation({
    onError,
    refetchQueries: [refetchGetPushTokensQuery()]
  });
  const syncedCachePolicy = useSyncedCachePolicy();

  const { data: pushTokenData } = useGetPushTokensQuery({
    onError,
    ...syncedCachePolicy
  });
  const { data: reminderData } = useGetReminderQuery({ onError, ...syncedCachePolicy });

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

  useEffect(() => {
    upsertPushToken().then();
  }, [upsertPushToken]);

  return { upsertPushToken };
};
