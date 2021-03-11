import { createStackNavigator } from '@react-navigation/stack';
import { LazyComponent } from '../../components/LazyComponent';
import { AppBar } from './AppBar';
import EntriesByDay from '../EntriesByDay/EntriesByDay';
import { TodoistAuth } from '../TodoistAuth';
import { PrivacyPolicy } from '../About/PrivacyPolicy';
import { TermsAndConditions } from '../About/TermsAndConditions';
import { PaymentInfo } from '../About/PaymentInfo';
import { RefundPolicy } from '../About/RefundPolicy';
import { ContactInfo } from '../About/ContactInfo';
import React, { Fragment } from 'react';
import Other from '../Other';
import { LinkingOptions } from '@react-navigation/native';
import { BottomNavigator } from './BottomNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { Auth } from '../Auth/Auth';
import { useAuth } from '../../hooks/useAuth';
import { useDeviceMediaQuery } from '../../hooks/useDeviceMediaQuery';

export const linking: LinkingOptions = {
  prefixes: ['https://*.lifebalancer.app', 'http://localhost:3000'],
  config: {
    screens: {
      Auth: 'auth',
      AboutStack: {
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
          EntriesStack: {
            initialRouteName: 'EntriesByDay',
            screens: {
              EntriesByDay: '',
              EntriesCalendar: 'entries/calendar',
              EntriesForm: 'entries/:date'
            }
          },
          CalendarStack: {
            initialRouteName: 'Calendar',
            screens: {
              Calendar: 'calendar',
              CalendarEntries: 'calendar/:date'
            }
          },
          JournalStack: {
            initialRouteName: 'Journal',
            screens: {
              Journal: 'journal',
              JournalCalendar: 'journal/calendar',
              JournalEntries: 'journal/:date'
            }
          },
          StatisticStack: {
            initialRouteName: 'ActivitiesStatistic',
            screens: {
              ActivitiesStatistic: 'statistic/activities',
              ActivityStatistic: 'statistic/activities/:id'
            }
          },
          ActivitiesStack: {
            initialRouteName: 'Activities',
            screens: {
              Activities: 'activities',
              ActivityEdit: 'activities/:id',
              ActivityCreate: 'activities/create',
              TodoistAuth: 'activities/todoist/auth'
            }
          },
          OtherStack: {
            initialRouteName: 'Other',
            screens: {
              Other: 'other',
              Reminders: 'other/reminders',
              About: 'other/about',
              PrivacyPolicy: 'other/about/privacy-policy',
              TermsAndConditions: 'other/about/terms-conditions',
              PaymentInfo: 'other/about/payment',
              RefundPolicy: 'other/about/refund',
              ContactInfo: 'other/about/contact',
              DevTools: 'other/dev-tools'
            }
          },
          RemindersStack: { screens: { Reminders: 'reminders' } }
        }
      }
    }
  }
};

const RootStack = createStackNavigator();
const AnonAboutStack = createStackNavigator();
const EntriesStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const JournalStack = createStackNavigator();
const StatisticStack = createStackNavigator();
const ActivitiesStack = createStackNavigator();
const ReminderStack = createStackNavigator();
const AboutStack = createStackNavigator();
const OtherStack = createStackNavigator();

const EntriesForm = LazyComponent(() => import('../EntriesForm/EntriesForm'));
const Journal = LazyComponent(() => import('../Journal/Journal'));
const ActivityForm = LazyComponent(() => import('../ActivityForm/ActivityForm'));
const Activities = LazyComponent(() => import('../Activities'));
const Calendar = LazyComponent(() => import('../Calendar/Calendar'));
const Reminders = LazyComponent(() => import('../Reminders'));
const About = LazyComponent(() => import('../About/About'));
const DevTools = LazyComponent(() => import('../About/DevTools'));
const ActivitiesStatistic = LazyComponent(() => import('../Statistic/ActivitiesStatistic'));
const ActivityStatistic = LazyComponent(() => import('../Statistic/ActivityStatistic'));

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

export const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  const { isMobile } = useDeviceMediaQuery();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Fragment>
          <RootStack.Screen name="Home" component={isMobile ? BottomNavigator : DrawerNavigator} />
          <RootStack.Screen
            name="TodoistAuth"
            component={TodoistAuth}
            options={{ header: () => <AppBar />, headerShown: true }}
          />
        </Fragment>
      ) : (
        <Fragment>
          <RootStack.Screen name="Auth" component={Auth} />
          <RootStack.Screen name="AboutStack" component={AnonAboutStackComponent} />
        </Fragment>
      )}
    </RootStack.Navigator>
  );
};

export const EntriesScreen = () => (
  <EntriesStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <EntriesStack.Screen name="EntriesByDay" component={EntriesByDay} />
    <EntriesStack.Screen name="EntriesCalendar" component={Calendar} />
    <EntriesStack.Screen name="EntriesForm" component={EntriesForm} />
  </EntriesStack.Navigator>
);

export const CalendarScreen = () => (
  <CalendarStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <CalendarStack.Screen name="Calendar" component={Calendar} />
    <CalendarStack.Screen name="CalendarEntries" component={EntriesForm} />
  </CalendarStack.Navigator>
);

export const JournalScreen = () => (
  <JournalStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <JournalStack.Screen name="Journal" component={Journal} />
    <EntriesStack.Screen name="JournalCalendar" component={Calendar} />
    <JournalStack.Screen name="JournalEntries" component={EntriesForm} />
  </JournalStack.Navigator>
);

export const StatisticScreen = () => (
  <StatisticStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <StatisticStack.Screen name="ActivitiesStatistic" component={ActivitiesStatistic} />
    <StatisticStack.Screen name="ActivityStatistic" component={ActivityStatistic} />
  </StatisticStack.Navigator>
);

export const ActivitiesScreen = () => (
  <ActivitiesStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <ActivitiesStack.Screen name="Activities" component={Activities} />
    <ActivitiesStack.Screen name="ActivityEdit" component={ActivityForm} />
    <ActivitiesStack.Screen name="ActivityCreate" component={ActivityForm} />
    <ActivitiesStack.Screen name="TodoistAuth" component={TodoistAuth} />
  </ActivitiesStack.Navigator>
);

export const ReminderScreen = () => (
  <ReminderStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <ReminderStack.Screen name="Reminders" component={Reminders} />
  </ReminderStack.Navigator>
);

export const AboutScreen = () => (
  <AboutStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <AboutStack.Screen name="About" component={About} />
    <AboutStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <AboutStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    <AboutStack.Screen name="PaymentInfo" component={PaymentInfo} />
    <AboutStack.Screen name="RefundPolicy" component={RefundPolicy} />
    <AboutStack.Screen name="ContactInfo" component={ContactInfo} />
    <AboutStack.Screen name="DevTools" component={DevTools} />
  </AboutStack.Navigator>
);

export const OtherScreen = () => (
  <OtherStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <OtherStack.Screen name="Other" component={Other} />

    <OtherStack.Screen name="Reminders" component={Reminders} />

    <OtherStack.Screen name="About" component={About} />
    <OtherStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <OtherStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    <OtherStack.Screen name="PaymentInfo" component={PaymentInfo} />
    <OtherStack.Screen name="RefundPolicy" component={RefundPolicy} />
    <OtherStack.Screen name="ContactInfo" component={ContactInfo} />
    <OtherStack.Screen name="DevTools" component={DevTools} />
  </OtherStack.Navigator>
);