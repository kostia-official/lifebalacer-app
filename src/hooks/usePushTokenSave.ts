import { ApolloError } from '@apollo/client';
import { pushService } from '../services/push';
import { useEffect, useCallback } from 'react';
import {
  useGetPushTokenQuery,
  useUpsertPushTokenMutation,
  refetchGetPushTokenQuery, useGetReminderQuery
} from "../generated/apollo";

export interface UseApolloErrorProps {
  onError?: (error: ApolloError) => void;
}

export const usePushTokenSave = ({ onError }: UseApolloErrorProps) => {
  const [upsertPushTokenMutation] = useUpsertPushTokenMutation({
    onError,
    refetchQueries: [refetchGetPushTokenQuery()]
  });
  const { data: pushTokenData } = useGetPushTokenQuery({ onError, fetchPolicy: "cache-and-network" });
  const { data: reminderData } = useGetReminderQuery({ onError, fetchPolicy: "cache-and-network" });

  const upsertPushToken = useCallback(async () => {
    if (!reminderData || !pushTokenData) return;
    if (!reminderData.reminder?.remindAt) return;

    const token = await pushService.getToken();
    if (!token) return;

    if (pushTokenData.pushToken?.token === token) return;

    await upsertPushTokenMutation({ variables: { data: { token } } });
  }, [pushTokenData, reminderData, upsertPushTokenMutation]);

  useEffect(() => {
    upsertPushToken().then();
  }, [upsertPushToken]);

  return { upsertPushToken };
};
