import React, { useState, useCallback, Suspense, useEffect } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import styled from 'styled-components';
import { Switch, useHistory } from 'react-router-dom';
import { HeaderRightContent } from './HeaderRightContent';
import { useAuth } from '../hooks/useAuth';
import { Persist } from '../components/Persist';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { useSwipeable } from 'react-swipeable';
import { TodoistAuth } from './TodoistAuth';
import { isSwipeHandlersEnabledVar } from '../reactiveState';
import { ErrorCatcher } from './ErrorCatcher';
import { AppUpdateDialog } from './AppUpdateDialog';
import { About } from './About/About';
import { PrivacyPolicy } from './About/PrivacyPolicy';
import { TermsAndConditions } from './About/TermsAndConditions';
// @ts-ignore
import ScrollRestoration from 'react-scroll-restoration';
import { Button } from '@material-ui/core';
import { RouteWrapper } from '../components/RouteWrapper';
import { Spinner } from '../components/Spinner';
import EntriesByDay from './EntriesByDay/EntriesByDay';
import EntriesForm from './EntriesForm/EntriesForm';
import ActivityForm from './ActivityForm/ActivityForm';
import Journal from './Journal/Journal';

const Calendar = React.lazy(() => import('./Calendar/Calendar'));
const Activities = React.lazy(() => import('./Activities'));
const Reminders = React.lazy(() => import('./Reminders'));

export interface IPage {
  name: string;
  icon: string;
  path: string;
  component: React.ComponentType<any>;
  isPublic?: boolean;
}

const pages: IPage[] = [
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
    name: 'Reminders',
    icon: 'notifications',
    path: '/reminders',
    component: Reminders
  },
  {
    name: 'About',
    icon: 'info',
    path: '/about',
    component: About,
    isPublic: true
  }
];

const AppWrapper = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const PageWrapper = styled.div`
  flex-grow: 1;
  margin: 10px;
  position: relative;
`;

export interface IAppState {
  isExpandedMenu: boolean;
}

export interface IAppProps {
  history: History;
}

export const App: React.FC = () => {
  const { isAuthenticated, user, login } = useAuth();
  const history = useHistory();
  const { isDesktop } = useDeviceDetect();
  const [isExpandedMenu, setIsExpandedMenu] = useState(isDesktop);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (isSwipeHandlersEnabledVar()) {
        setIsExpandedMenu(true);
      }
    },
    onSwipedLeft: () => {
      if (isSwipeHandlersEnabledVar()) {
        setIsExpandedMenu(false);
      }
    }
  });

  const onMenuClick = useCallback(() => {
    setIsExpandedMenu((prevValue) => !prevValue);
  }, [setIsExpandedMenu]);

  const onNavigationItemClick = useCallback(
    (path: string) => {
      history.replace(path);
    },
    [history]
  );

  const onBackClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <AppWrapper {...swipeHandlers}>
      {isDesktop && (
        <Persist
          name="app"
          data={{ isExpandedMenu }}
          onMount={({ isExpandedMenu }) => {
            setIsExpandedMenu(!!isExpandedMenu);
          }}
        />
      )}

      <AppUpdateDialog />

      <Header
        title="Life Balancer"
        onMenuClick={onMenuClick}
        onBackClick={onBackClick}
        rightContent={
          isAuthenticated ? <HeaderRightContent /> : <Button onClick={() => login()}>Login</Button>
        }
      />

      <ContentWrapper>
        <Navigation
          isExpanded={isExpandedMenu}
          items={isAuthenticated ? pages : pages.filter(({ isPublic }) => isPublic)}
          onClose={onMenuClick}
          onItemClick={onNavigationItemClick}
          user={user && { name: user?.given_name, email: user.email, avatar: user.picture }}
        />

        <PageWrapper>
          <ErrorCatcher userEmail={user?.email} userName={user?.name}>
            <ScrollRestoration />
            <Suspense fallback={<Spinner />}>
              <Switch>
                {pages.map((page) => (
                  <RouteWrapper
                    key={page.path}
                    path={page.path}
                    isPublic={page.isPublic}
                    exact
                    component={page.component}
                  />
                ))}
                <RouteWrapper path="/activities/create" exact component={ActivityForm} />
                <RouteWrapper path="/activities/edit/:_id" exact component={ActivityForm} />
                <RouteWrapper path="/entries/:date" exact component={EntriesForm} />
                <RouteWrapper path="/todoist/auth" exact component={TodoistAuth} />
                <RouteWrapper
                  path="/about/privacy-policy"
                  isPublic
                  exact
                  component={PrivacyPolicy}
                />
                <RouteWrapper
                  path="/about/terms-and-conditions"
                  isPublic
                  exact
                  component={TermsAndConditions}
                />
              </Switch>
            </Suspense>
          </ErrorCatcher>
        </PageWrapper>
      </ContentWrapper>
    </AppWrapper>
  );
};
