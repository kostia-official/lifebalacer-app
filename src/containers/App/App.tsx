import * as React from 'react';
import { RefObject } from 'react';
import { NavigationContainer, DarkTheme, NavigationContainerRef } from '@react-navigation/native';
import { MainColors } from '../../common/colors';
import { useAuth } from '../../hooks/useAuth';
import { ErrorCatcher } from '../ErrorCatcher';
import { useMount } from 'react-use';
import Loadable from 'react-loadable';
import { AppUpdateDialog } from '../AppUpdateDialog';
import { linking, RootNavigator } from './Navigation';

export type NavigationParams = {
  Auth: { error_description: string };
  EntriesForm: { date: string };
  ActivityStatistic: { id: string };
  ActivityEdit: { id: string };
  GoalEdit: { id: string };
  TodoistAuth: { code: string; error: string };
};

export const navigationRef: RefObject<NavigationContainerRef> | null = React.createRef();

export default function App() {
  const { user } = useAuth();

  useMount(() => {
    Loadable.preloadAll().then();
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      documentTitle={{ formatter: () => 'Life Balancer' }}
      theme={{
        ...DarkTheme,
        dark: true,
        colors: {
          ...DarkTheme.colors,
          background: MainColors.Background,
          primary: MainColors.Primary
        }
      }}
      linking={linking}
    >
      <ErrorCatcher userEmail={user?.email} userName={user?.name}>
        <AppUpdateDialog />

        <RootNavigator />
      </ErrorCatcher>
    </NavigationContainer>
  );
}
