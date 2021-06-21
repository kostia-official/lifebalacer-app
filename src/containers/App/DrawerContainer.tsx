import React, { useMemo } from 'react';
import { Drawer } from '../../components/Drawer';
import { useAuth } from '../../hooks/useAuth';
import { useIsExpandedDrawer } from '../../hooks/useIsExpandedDrawer';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { useIsInternalTestUser } from '../../hooks/useIsInternalTestUser';

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
    name: 'Subscription',
    icon: 'stars',
    screen: 'PremiumPlan',
    isInternalTesting: true
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
  const isInternalTestUser = useIsInternalTestUser();

  const filteredItems = useMemo(() => {
    return items.reduce((acc, item) => {
      if (item.isInternalTesting && !isInternalTestUser) return acc;

      return [...acc, item];
    }, [] as typeof items);
  }, [isInternalTestUser]);

  const { user, logout } = useAuth();

  return (
    <Drawer
      isExpanded={isExpandedDrawer}
      items={filteredItems}
      onItemClick={switchTo}
      onLogout={logout}
      user={user && { name: user?.username, email: user.email, avatar: user.picture }}
    />
  );
};
