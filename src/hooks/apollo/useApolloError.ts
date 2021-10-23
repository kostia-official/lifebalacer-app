import { useState, useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import _ from 'lodash';
import { sentryService } from '../../services/sentry';
import { getApolloErrorCode, ApolloErrorCodesEnum } from '../../helpers/error';
import { config } from '../../common/config';

export interface OnErrorParams {
  onError?: (error: ApolloError) => void;
}

export const useApolloError = ({ isForceShowError = false } = {}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTime, setErrorTime] = useState<number>();

  const onError = useCallback(
    (error: ApolloError) => {
      sentryService.captureException(error, { extra: { errorStringified: JSON.stringify(error) } });

      const errorCode = getApolloErrorCode(error);
      const isBadInput = errorCode === ApolloErrorCodesEnum.BAD_USER_INPUT;
      const isShowError = isForceShowError || config.isDev || isBadInput;

      const errors = _.get(error, 'networkError.result.errors');

      const message = _.isEmpty(errors)
        ? error.message
        : errors.map((e: any) => e?.message).join(' ');

      setErrorMessage(isShowError ? message : '');
      setErrorTime(Date.now());
    },
    [isForceShowError]
  );

  return { errorMessage, errorTime, setErrorMessage, onError };
};
