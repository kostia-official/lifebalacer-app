import { useEffect, EffectCallback, DependencyList } from 'react';

// Like useEffect but without harassment from eslint to update deps
// Needed to watch changes only of things that you need
export const useWatchChanges = (effect: EffectCallback, deps?: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, deps);
};
