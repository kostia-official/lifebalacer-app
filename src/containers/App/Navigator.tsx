import React, { useState, useCallback } from 'react';
import { MainColors } from '../../common/colors';
import { TabBarButton } from '../../components/TabBarButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useIsKeyboardOpen } from '../../hooks/useIsKeyboardOpen';
import { AppBar } from './AppBar';
import EntriesByDay from '../EntriesByDay/EntriesByDay';
import Other from '../Other/Other';
import { PrivacyPolicy } from '../About/PrivacyPolicy';
import { TermsAndConditions } from '../About/TermsAndConditions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LazyComponent } from '../../components/LazyComponent';
import baselineReceiptLong from '@iconify-icons/ic/baseline-receipt-long';
import outlineReceiptLong from '@iconify-icons/ic/outline-receipt-long';
import baselineDateRange from '@iconify-icons/ic/baseline-date-range';
import outlineDateRange from '@iconify-icons/ic/outline-date-range';
import baselineInsights from '@iconify-icons/ic/baseline-insights';
import baselineTimeline from '@iconify-icons/ic/baseline-timeline';
import baselineMoreHoriz from '@iconify-icons/ic/baseline-more-horiz';
import baselineImportContacts from '@iconify-icons/ic/baseline-import-contacts';
import twotoneImportContacts from '@iconify-icons/ic/twotone-import-contacts';
import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useAuth } from '../../hooks/useAuth';
import { DrawerMenu } from '../../components/DrawerMenu';

const BottomTabs = createBottomTabNavigator();
// const DrawerStack = createStackNavigator();

const EntriesStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const JournalStack = createStackNavigator();
const StatisticStack = createStackNavigator();
const OtherStack = createStackNavigator();

const EntriesForm = LazyComponent(() => import('../EntriesForm/EntriesForm'));
const Journal = LazyComponent(() => import('../Journal/Journal'));
const ActivityForm = LazyComponent(() => import('../ActivityForm/ActivityForm'));
const Activities = LazyComponent(() => import('../Activities'));
const Calendar = LazyComponent(() => import('../Calendar/Calendar'));
const Reminders = LazyComponent(() => import('../Reminders'));
const About = LazyComponent(() => import('../About/About'));
const DevTools = LazyComponent(() => import('../Other/DevTools'));
const ActivitiesStatistic = LazyComponent(() => import('../Statistic/ActivitiesStatistic'));
const ActivityStatistic = LazyComponent(() => import('../Statistic/ActivityStatistic'));

export interface IRoute {
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  path: string;
}

export const drawerMenu: IRoute[] = [
  {
    name: 'Entries',
    icon: 'receipt_long',
    path: '/',
    component: EntriesByDay
  },
  {
    name: 'Calendar',
    icon: 'date_range',
    path: '/calendar',
    component: Calendar
  },
  {
    name: 'Journal',
    icon: 'import_contacts',
    path: '/journal',
    component: Journal
  },
  {
    name: 'Activities',
    icon: 'assignment_turned_in',
    path: '/activities',
    component: Activities
  },
  {
    name: 'Statistic',
    icon: 'insights',
    path: '/statistic',
    component: ActivitiesStatistic
  },
  {
    name: 'Reminders',
    icon: 'notifications',
    path: '/reminders',
    component: Reminders
  },
  {
    name: 'About',
    icon: 'info',
    path: '/about',
    component: About
  }
];

const EntriesTab = () => (
  <EntriesStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <EntriesStack.Screen name="EntriesByDay" component={EntriesByDay} />
    <EntriesStack.Screen name="EntriesForm" component={EntriesForm} />
  </EntriesStack.Navigator>
);

const CalendarTab = () => (
  <CalendarStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <CalendarStack.Screen name="Calendar" component={Calendar} />
    <CalendarStack.Screen name="CalendarEntries" component={EntriesForm} />
  </CalendarStack.Navigator>
);

const JournalTab = () => (
  <JournalStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <JournalStack.Screen name="Journal" component={Journal} />
    <JournalStack.Screen name="JournalEntries" component={EntriesForm} />
  </JournalStack.Navigator>
);

const StatisticTab = () => (
  <StatisticStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <StatisticStack.Screen name="ActivitiesStatistic" component={ActivitiesStatistic} />
    <StatisticStack.Screen name="ActivityStatistic" component={ActivityStatistic} />
  </StatisticStack.Navigator>
);

const OtherTab = () => (
  <OtherStack.Navigator screenOptions={{ header: () => <AppBar /> }}>
    <OtherStack.Screen name="Other" component={Other} />

    <OtherStack.Screen name="Activities" component={Activities} />
    <OtherStack.Screen name="ActivityEdit" component={ActivityForm} />
    <OtherStack.Screen name="ActivityCreate" component={ActivityForm} />

    <OtherStack.Screen name="Reminders" component={Reminders} />

    <OtherStack.Screen name="About" component={About} />
    <OtherStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <OtherStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    <OtherStack.Screen name="DevTools" component={DevTools} />
  </OtherStack.Navigator>
);

const tabBarColorSchemas = {
  teal: {
    backgroundColor: MainColors.Primary,
    inactiveTintColor: '#b6f1ed'
  },
  grey: {
    backgroundColor: MainColors.Background,
    inactiveTintColor: '#bebebe'
  }
};

const Wrapper = styled.div`
  display: flex;
`;

export const Navigator: React.FC = () => {
  const { user, logout } = useAuth();
  const [isExpandedMenu, setIsExpandedMenu] = useState(!isMobile);
  const isKeyboardOpen = useIsKeyboardOpen();

  const onMenuClick = useCallback(() => {
    setIsExpandedMenu((prevValue) => !prevValue);
  }, [setIsExpandedMenu]);

  const { backgroundColor, inactiveTintColor } = tabBarColorSchemas.grey;

  return (
    <Wrapper>
      {!isMobile && (
        <DrawerMenu
          isExpanded={isExpandedMenu}
          items={drawerMenu}
          onClose={onMenuClick}
          onItemClick={() => {}}
          onLogout={logout}
          user={user && { name: user?.username, email: user.email, avatar: user.picture }}
        />
      )}

      <BottomTabs.Navigator
        lazy={false}
        tabBarOptions={{
          activeBackgroundColor: backgroundColor,
          inactiveBackgroundColor: backgroundColor,

          style: {
            display: isKeyboardOpen ? 'none' : 'flex',
            borderTopWidth: 0,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 2
          },

          activeTintColor: '#fff',
          inactiveTintColor,
          labelStyle: {
            marginBottom: 4,
            fontSize: 11
          }
        }}
      >
        <BottomTabs.Screen
          name="EntriesTab"
          options={{
            title: 'Entries',
            tabBarButton: TabBarButton,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                icon={baselineReceiptLong}
                iconInactive={outlineReceiptLong}
                isActive={focused}
              />
            )
          }}
          component={EntriesTab}
        />

        <BottomTabs.Screen
          name="CalendarTab"
          options={{
            title: 'Calendar',
            tabBarButton: TabBarButton,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                icon={baselineDateRange}
                iconInactive={outlineDateRange}
                isActive={focused}
              />
            )
          }}
          component={CalendarTab}
        />

        <BottomTabs.Screen
          name="JournalTab"
          options={{
            title: 'Journal',
            tabBarButton: TabBarButton,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                icon={baselineImportContacts}
                iconInactive={twotoneImportContacts}
                isActive={focused}
              />
            )
          }}
          component={JournalTab}
        />

        <BottomTabs.Screen
          name="StatisticTab"
          options={{
            title: 'Statistic',
            tabBarButton: TabBarButton,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                icon={baselineInsights}
                iconInactive={baselineTimeline}
                isActive={focused}
                inactiveStyle={css`
                  margin-bottom: -8px;
                `}
              />
            )
          }}
          component={StatisticTab}
        />

        <BottomTabs.Screen
          name="OtherTab"
          options={{
            title: 'Other',
            tabBarButton: TabBarButton,
            tabBarIcon: ({ color }) => <TabBarIcon color={color} icon={baselineMoreHoriz} />
          }}
          component={OtherTab}
        />
      </BottomTabs.Navigator>
    </Wrapper>
  );
};
