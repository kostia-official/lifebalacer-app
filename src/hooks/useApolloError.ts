import { useState, useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import _ from 'lodash';

export const useApolloError = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const onError = useCallback(
    (error: ApolloError) => {
      const errors = _.get(error, 'networkError.result.errors');
      const message = _.isEmpty(errors)
        ? error.message
        : errors.map((e: any) => e?.message).join(' ');

      setErrorMessage(message);
    },
    [setErrorMessage]
  );

  return { errorMessage, setErrorMessage, onError };
};
