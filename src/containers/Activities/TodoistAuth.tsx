import React, { useEffect } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useConnectTodoistMutation, refetchGetActivitiesQuery } from '../../generated/apollo';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { useActivities } from '../../hooks/apollo/useActivities';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import { ScreenWrapper } from '../App/ScreenWrapper';

export const TodoistAuth = () => {
  const { errorMessage, onError, setErrorMessage } = useApolloError();

  const { params } = useRoute<RouteProp<NavigationParams, 'TodoistAuth'>>();
  const navigation = useNavigation();

  const queryErrorMessage = String(params?.error || '');
  const authCode = String(params?.code);

  useEffect(() => {
    setErrorMessage(queryErrorMessage);
  }, [queryErrorMessage, setErrorMessage]);

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

  useEffect(() => {
    if (todoistActivity) {
      navigation.navigate('Activities');
    }
  }, [navigation, todoistActivity]);

  return (
    <ScreenWrapper isLoading={!errorMessage}>
      <ErrorMessage errorMessage={errorMessage} />
    </ScreenWrapper>
  );
};
