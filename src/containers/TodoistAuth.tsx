import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { ErrorMessage } from '../components/ErrorMessage';
import { useConnectTodoistMutation, refetchGetActivitiesQuery } from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';
import { useActivities } from '../hooks/useActivities';

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
    refetchQueries: [refetchGetActivitiesQuery()]
  });
  const { todoistActivity } = useActivities({ onError });

  useEffect(() => {
    connectTodoist({
      variables: { authCode }
    }).then();
  }, [connectTodoist, authCode]);

  if (todoistActivity) {
    return <Redirect to="/activities" />;
  }

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
