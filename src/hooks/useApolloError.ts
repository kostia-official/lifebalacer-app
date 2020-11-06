import { useState, useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import _ from 'lodash';
import { sentryService } from '../services/sentry';

export interface OnErrorParams {
  onError?: (error: ApolloError) => void;
}

export const useApolloError = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTime, setErrorTime] = useState<number>();
  const onError = useCallback((error: ApolloError) => {
    sentryService.captureException(error);

    const errors = _.get(error, 'networkError.result.errors');

    const message = _.isEmpty(errors)
      ? error.message
      : errors.map((e: any) => e?.message).join(' ');

    setErrorMessage(message);
    setErrorTime(Date.now());
  }, []);

  return { errorMessage, errorTime, setErrorMessage, onError };
};
