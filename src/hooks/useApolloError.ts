import { useState, useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import _ from 'lodash';

export const useApolloError = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTime, setErrorTime] = useState<number>();
  const onError = useCallback(
    (error: ApolloError) => {
      console.log({...error});
      const errors = _.get(error, 'networkError.result.errors');
      console.log(errors);
      const message = _.isEmpty(errors)
        ? error.message
        : errors.map((e: any) => e?.message).join(' ');

      setErrorMessage(message);
      setErrorTime(Date.now());
    },
    []
  );

  return { errorMessage, errorTime, setErrorMessage, onError };
};
