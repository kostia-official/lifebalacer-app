import { useState, useCallback } from 'react';
import { ApolloError } from '@apollo/client';

export const useApolloError = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const onError = useCallback((error: ApolloError) => setErrorMessage(error.message), [
    setErrorMessage
  ]);

  return { errorMessage, setErrorMessage, onError };
};
