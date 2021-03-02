import * as React from 'react';
import { Fragment, RefObject } from 'react';
import { NavigationContainer, DarkTheme, NavigationContainerRef } from '@react-navigation/native';
import { MainColors } from '../../common/colors';
import { useAuth } from '../../hooks/useAuth';
import { ErrorCatcher } from '../ErrorCatcher';
import { Navigator } from './Navigator';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from '../Auth/Auth';
import { useMount } from 'react-use';
import Loadable from 'react-loadable';
import { AppUpdateDialog } from '../AppUpdateDialog';
import { PrivacyPolicy } from '../About/PrivacyPolicy';
import { TermsAndConditions } from '../About/TermsAndConditions';
import { PaymentInfo } from '../About/PaymentInfo';
import { RefundPolicy } from '../About/RefundPolicy';
import { ContactInfo } from '../About/ContactInfo';
import About from '../About/About';
import { AppBar } from './AppBar';

export type NavigationParams = {
  Auth: { error_description: string };
  EntriesForm: { date: string };
  ActivityStatistic: { id: string };
  ActivityEdit: { id: string };
  TodoistAuth: { code: string; error: string };
};

export const navigationRef: RefObject<NavigationContainerRef> | null = React.createRef();

const RootStack = createStackNavigator();
const AnonAboutStack = createStackNavigator();

const AnonAboutStackComponent = () => {
  return (
    <AnonAboutStack.Navigator screenOptions={{ headerShown: true, header: () => <AppBar /> }}>
      <AnonAboutStack.Screen name="About" component={About} />
      <AnonAboutStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AnonAboutStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <AnonAboutStack.Screen name="PaymentInfo" component={PaymentInfo} />
      <AnonAboutStack.Screen name="RefundPolicy" component={RefundPolicy} />
      <AnonAboutStack.Screen name="ContactInfo" component={ContactInfo} />
    </AnonAboutStack.Navigator>
  );
};

export default function App() {
  const { user, isAuthenticated } = useAuth();

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
      linking={{
        prefixes: ['https://*.lifebalancer.app', 'http://localhost:3000'],
        config: {
          screens: {
            Auth: 'auth',
            AnonAboutStack: {
              initialRouteName: 'About',
              screens: {
                About: 'about',
                PrivacyPolicy: 'about/privacy-policy',
                TermsAndConditions: 'about/terms-conditions',
                PaymentInfo: 'about/payment',
                RefundPolicy: 'about/refund',
                ContactInfo: 'about/contact'
              }
            },
            Home: {
              screens: {
                EntriesTab: {
                  initialRouteName: 'EntriesByDay',
                  screens: {
                    EntriesByDay: '',
                    EntriesForm: 'entries/:date'
                  }
                },
                CalendarTab: {
                  initialRouteName: 'Calendar',
                  screens: {
                    Calendar: 'calendar',
                    CalendarEntries: 'calendar/:date'
                  }
                },
                JournalTab: {
                  initialRouteName: 'Journal',
                  screens: {
                    Journal: 'journal',
                    JournalEntries: 'journal/:date'
                  }
                },
                StatisticTab: {
                  initialRouteName: 'ActivitiesStatistic',
                  screens: {
                    ActivitiesStatistic: 'statistic/activities',
                    ActivityStatistic: 'statistic/activities/:id'
                  }
                },
                OtherTab: {
                  initialRouteName: 'Other',
                  screens: {
                    Other: 'other',
                    Activities: 'activities',
                    ActivityEdit: 'activities/:id',
                    ActivityCreate: 'activities/create',
                    TodoistAuth: 'todoist/auth',
                    Reminders: 'reminders',
                    About: 'other/about',
                    PrivacyPolicy: 'other/about/privacy-policy',
                    TermsAndConditions: 'other/about/terms-conditions',
                    PaymentInfo: 'other/about/payment',
                    RefundPolicy: 'other/about/refund',
                    ContactInfo: 'other/about/contact',
                    DevTools: 'other/dev-tools'
                  }
                }
              }
            }
          }
        }
      }}
    >
      <ErrorCatcher userEmail={user?.email} userName={user?.name}>
        <AppUpdateDialog />

        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <RootStack.Screen name="Home" component={Navigator} />
          ) : (
            <Fragment>
              <RootStack.Screen name="Auth" component={Auth} />
              <RootStack.Screen
                name="AnonAboutStack"
                component={AnonAboutStackComponent}
                // options={{ headerShown: true, header: () => <AppBar /> }}
              />
            </Fragment>
          )}
        </RootStack.Navigator>
      </ErrorCatcher>
    </NavigationContainer>
  );
}
