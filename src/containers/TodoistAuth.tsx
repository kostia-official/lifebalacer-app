import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { ErrorMessage } from '../components/ErrorMessage';
import {
  useConnectTodoistMutation,
  refetchGetAchievementsQuery,
  refetchGetProfileQuery,
  useGetProfileQuery
} from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';

export const TodoistAuth = () => {
  const { errorMessage, onError, setErrorMessage } = useApolloError();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const queryErrorMessage = String(query?.error || '');

  useEffect(() => {
    setErrorMessage(queryErrorMessage);
  }, [queryErrorMessage, setErrorMessage]);

  const authCode = String(query?.code);
  const [connectTodoist] = useConnectTodoistMutation({
    onError,
    refetchQueries: [refetchGetProfileQuery(), refetchGetAchievementsQuery()]
  });
  const { data: profileData } = useGetProfileQuery({ onError });

  useEffect(() => {
    connectTodoist({
      variables: { authCode }
    }).then();
  }, [connectTodoist, authCode]);

  if (profileData?.profile?.todoistUserId) {
    return <Redirect to="/achievements" />;
  }

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
