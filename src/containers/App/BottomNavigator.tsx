import React from 'react';
import { MainColors } from '../../common/colors';
import { TabBarButton } from '../../components/TabBarButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useIsKeyboardOpen } from '../../hooks/useIsKeyboardOpen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import baselineReceiptLong from '@iconify/icons-ic/baseline-receipt-long';
import outlineReceiptLong from '@iconify/icons-ic/outline-receipt-long';
import baselineActivities from '@iconify/icons-ic/baseline-manage-accounts';
import outlineActivities from '@iconify/icons-ic/outline-manage-accounts';
import baselineInsights from '@iconify/icons-ic/baseline-insights';
import baselineTimeline from '@iconify/icons-ic/baseline-timeline';
import baselineMoreHoriz from '@iconify/icons-ic/baseline-more-horiz';
import baselineImportContacts from '@iconify/icons-ic/baseline-import-contacts';
import twotoneImportContacts from '@iconify/icons-ic/twotone-import-contacts';
import { css } from 'styled-components';
import {
  EntriesScreen,
  JournalScreen,
  StatisticScreen,
  OtherScreen,
  ActivitiesScreen
} from './Navigation';

const BottomTabs = createBottomTabNavigator();
const tabBarTestID = 'lb-tab-bar';

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

export const BottomNavigator: React.FC = () => {
  const isKeyboardOpen = useIsKeyboardOpen();

  const { backgroundColor, inactiveTintColor } = tabBarColorSchemas.grey;

  return (
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
        },

        labelPosition: 'below-icon'
      }}
    >
      <BottomTabs.Screen
        name="EntriesStack"
        options={{
          tabBarTestID,
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
        component={EntriesScreen}
      />

      <BottomTabs.Screen
        name="ActivitiesStack"
        options={{
          title: 'Activities',
          tabBarButton: TabBarButton,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              icon={baselineActivities}
              iconInactive={outlineActivities}
              isActive={focused}
            />
          )
        }}
        component={ActivitiesScreen}
      />

      <BottomTabs.Screen
        name="JournalStack"
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
        component={JournalScreen}
      />

      <BottomTabs.Screen
        name="StatisticStack"
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
        component={StatisticScreen}
      />

      <BottomTabs.Screen
        name="OtherStack"
        options={{
          title: 'Other',
          tabBarButton: TabBarButton,
          tabBarIcon: ({ color }) => <TabBarIcon color={color} icon={baselineMoreHoriz} />
        }}
        component={OtherScreen}
      />
    </BottomTabs.Navigator>
  );
};
