import React, { useMemo } from 'react';
import { Drawer } from '../components/Drawer';
import { useAuth } from '../hooks/useAuth';
import { useIsExpandedDrawer } from '../hooks/useIsExpandedDrawer';
import { useNavigationHelpers } from '../hooks/useNavigationHelpers';
import { useIsInternalTestUser } from '../hooks/useIsInternalTestUser';
import { useActiveSubscription } from '../hooks/useActiveSubscription';
import { Icon } from '@iconify/react';
import baselineReceiptLong from '@iconify/icons-ic/baseline-receipt-long';
import manageAccounts from '@iconify/icons-ic/baseline-manage-accounts';
import baselineInsights from '@iconify/icons-ic/baseline-insights';
import outlineWorkspacePremium from '@iconify/icons-ic/outline-workspace-premium';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InfoIcon from '@material-ui/icons/Info';
import goalIcon from '@iconify/icons-fluent/target-arrow-20-filled';

export const items = [
  {
    name: 'Entries',
    icon: <Icon icon={baselineReceiptLong} width={24} />,
    screen: 'EntriesStack'
  },
  {
    name: 'Calendar',
    icon: <DateRangeIcon />,
    screen: 'CalendarStack'
  },
  {
    name: 'Journal',
    icon: <ImportContactsIcon />,
    screen: 'JournalStack'
  },
  {
    name: 'Activities',
    icon: <Icon icon={manageAccounts} width={26} />,
    screen: 'ActivitiesStack'
  },
  {
    name: 'Goals',
    icon: <Icon icon={goalIcon} width={26} />,
    screen: 'GoalsStack'
  },
  {
    name: 'Statistic',
    icon: <Icon icon={baselineInsights} width={24} />,
    screen: 'StatisticStack'
  },
  {
    name: 'Reminders',
    icon: <NotificationsIcon />,
    screen: 'RemindersStack'
  },
  {
    name: 'Subscription',
    icon: <Icon icon={outlineWorkspacePremium} width={24} />,
    screen: 'PremiumPlan',
    isInternalTesting: true
  },
  {
    name: 'About',
    icon: <InfoIcon />,
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
  const { isPremium } = useActiveSubscription({ withSyncedCachePolicy: true });

  return (
    <Drawer
      isExpanded={isExpandedDrawer}
      items={filteredItems}
      onItemClick={switchTo}
      onLogout={logout}
      user={user && { name: user?.username, email: user.email, avatar: user.picture, isPremium }}
    />
  );
};
