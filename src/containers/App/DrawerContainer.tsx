import React from 'react';
import { Drawer } from '../../components/Drawer';
import { useAuth } from '../../hooks/useAuth';
import { useIsExpandedDrawer } from '../../hooks/useIsExpandedDrawer';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';

export const items = [
  {
    name: 'Entries',
    icon: 'receipt_long',
    screen: 'EntriesStack'
  },
  {
    name: 'Calendar',
    icon: 'date_range',
    screen: 'CalendarStack'
  },
  {
    name: 'Journal',
    icon: 'import_contacts',
    screen: 'JournalStack'
  },
  {
    name: 'Activities',
    icon: 'manage_accounts',
    screen: 'ActivitiesStack'
  },
  {
    name: 'Statistic',
    icon: 'insights',
    screen: 'StatisticStack'
  },
  {
    name: 'Reminders',
    icon: 'notifications',
    screen: 'RemindersStack'
  },
  {
    name: 'About',
    icon: 'info',
    screen: 'AboutStack'
  }
];

export const DrawerContainer: React.FC = () => {
  const { isExpandedDrawer } = useIsExpandedDrawer();
  const { switchTo } = useNavigationHelpers();

  const { user, logout } = useAuth();

  return (
    <Drawer
      isExpanded={isExpandedDrawer}
      items={items}
      onItemClick={switchTo}
      onLogout={logout}
      user={user && { name: user?.username, email: user.email, avatar: user.picture }}
    />
  );
};
