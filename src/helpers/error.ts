import _ from 'lodash';
import { ApolloError } from '@apollo/client';

export enum ApolloErrorCodesEnum {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export const getApolloErrorCode = (error: ApolloError) => _.get(error, 'result.errors[0].extensions.code');
