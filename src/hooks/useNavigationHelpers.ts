import { useCallback } from 'react';
import { StackActions, useNavigation, useNavigationState } from '@react-navigation/native';

export const useNavigationHelpers = () => {
  const navigation = useNavigation();
  const stateIndex = useNavigationState((state) => state.index);

  const callbackify = <T extends (...args: any) => any>(fn: T) => (...args: Parameters<T>) => () =>
    fn(...args);

  const goForwardTo = useCallback(
    (routeName: string, params: any = {}) => {
      navigation.navigate(routeName, { ...params });
    },
    [navigation]
  );

  const switchTo = useCallback(
    (routeName: string, params: any = {}) => {
      navigation.dispatch(StackActions.replace(routeName, { ...params }));
    },
    [navigation]
  );

  const goBack = useCallback(
    (fallbackRoute: string = 'EntriesByDay') => {
      if (stateIndex > 0) {
        navigation.goBack();
      } else {
        navigation.navigate(fallbackRoute);
      }
    },
    [navigation, stateIndex]
  );

  const isNested = stateIndex > 0;

  return {
    goForwardTo: goForwardTo,
    goForwardToCb: callbackify(goForwardTo),
    switchTo,
    switchToCb: callbackify(switchTo),
    goBack,
    goBackCb: callbackify(goBack),
    isNested
  };
};
