import React, { useState, useCallback, Fragment } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import styled from 'styled-components';
import { Route, Switch, useHistory } from 'react-router-dom';
import { HeaderRightContent } from './HeaderRightContent';
import { Auth } from './Auth';
import { useAuth } from '../hooks/useAuth';
import { Persist } from '../components/Persist';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { useSwipeable } from 'react-swipeable';
import { ActivityForm } from './ActivityForm';
import { Activities } from './Activities';
import { Entries } from './Entries';
import { EntriesForm } from './EntriesForm';
import { Calendar } from './Calendar';
import { TodoistAuth } from './TodoistAuth';
import { useLoadCache } from '../hooks/useLoadCache';
import { Reminders } from "./Reminders";

export interface IPage {
  name: string;
  icon: string;
  path: string;
  component: React.ComponentType<any>;
}

const pages: IPage[] = [
  {
    name: 'Entries',
    icon: 'receipt_long',
    path: '/',
    component: Entries
  },
  {
    name: 'Calendar',
    icon: 'date_range',
    path: '/calendar',
    component: Calendar
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
  const { isAuthenticated, user } = useAuth();
  const history = useHistory();
  const { isDesktop } = useDeviceDetect();
  const [isExpandedMenu, setIsExpandedMenu] = useState(isDesktop);
  const { isCacheLoading } = useLoadCache();

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setIsExpandedMenu(true),
    onSwipedLeft: () => setIsExpandedMenu(false)
  });

  const onMenuClick = useCallback(() => {
    setIsExpandedMenu((prevValue) => !prevValue);
  }, [setIsExpandedMenu]);

  const onNavigationItemClick = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history]
  );

  const onBackClick = useCallback(() => {
    history.goBack();
  }, [history]);

  if (!isAuthenticated) return <Auth />;
  if (isCacheLoading) return <Fragment />;

  return (
    <AppWrapper {...swipeHandlers}>
      {isDesktop && (
        <Persist
          name="app"
          data={{ isExpandedMenu }}
          onMount={({ isExpandedMenu }) => {
            setIsExpandedMenu(isExpandedMenu);
          }}
        />
      )}

      <Header
        title="Rewarder"
        onMenuClick={onMenuClick}
        onBackClick={onBackClick}
        rightContent={<HeaderRightContent />}
      />

      <ContentWrapper>
        <Navigation
          isExpanded={isExpandedMenu}
          items={pages}
          onClose={onMenuClick}
          onItemClick={onNavigationItemClick}
          user={user && { name: user.given_name, email: user.email, avatar: user.picture }}
        />

        <PageWrapper>
          <Switch>
            {pages.map((page) => {
              return <Route key={page.path} path={page.path} exact component={page.component} />;
            })}
            <Route path="/activities/create" exact component={ActivityForm} />
            <Route path="/activities/edit/:_id" exact component={ActivityForm} />
            <Route path="/entries/:date" exact component={EntriesForm} />
            <Route path="/todoist/auth" exact component={TodoistAuth} />
          </Switch>
        </PageWrapper>
      </ContentWrapper>
    </AppWrapper>
  );
};
