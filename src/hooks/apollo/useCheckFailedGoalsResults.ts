import { OnErrorParams } from './useApolloError';
import { useCheckFailedGoalsResultsMutation } from '../../generated/apollo';
import { useEffect } from 'react';
import { makeGlobalState } from '../makeGlobalState';

const useIsCalled = makeGlobalState(false);

export const useCheckFailedGoalsResults = ({ onError }: OnErrorParams) => {
  const [isCalled, setIsCalled] = useIsCalled();
  const [checkFailedGoalsResults] = useCheckFailedGoalsResultsMutation({ onError });

  useEffect(() => {
    if (!isCalled) {
      checkFailedGoalsResults().then();
      setIsCalled(true);
    }
  }, [checkFailedGoalsResults, isCalled, setIsCalled]);
};
