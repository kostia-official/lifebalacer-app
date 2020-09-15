import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import styled from 'styled-components';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Rewards } from './Rewards';
import { HeaderRightContent } from './HeaderRightContent';
import { Achievements } from './Achievements';
import { Spendings } from './Spendings';
import { Auth } from './Auth';
import { useAuth } from '../hooks/useAuth';
import { TodoistAuth } from './TodoistAuth';
import { Persist } from '../components/Persist';
import { useDeviceDetect } from '../hooks/useIsDesktop';

export interface IPage {
  name: string;
  icon: string;
  path: string;
  component: React.ComponentType<any>;
}

const pages: IPage[] = [
  {
    name: 'Rewards',
    icon: 'emoji_events',
    path: '/',
    component: Rewards
  },
  {
    name: 'Achievements',
    path: '/achievements',
    icon: 'assignment_turned_in',
    component: Achievements
  },
  {
    name: 'Spendings',
    path: '/spendings',
    icon: 'receipt_long',
    component: Spendings
  }
];

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
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  const { isDesktop } = useDeviceDetect();
  const [isExpandedMenu, setIsExpandedMenu] = useState(isDesktop);

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

  return (
    <div>
      <Persist
        name="app"
        data={{ isExpandedMenu }}
        onMount={({ isExpandedMenu }) => {
          setIsExpandedMenu(isExpandedMenu);
        }}
      />
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
        />

        <PageWrapper>
          <Switch>
            {pages.map((page) => {
              return <Route key={page.path} path={page.path} exact component={page.component} />;
            })}
            <Route path="/todoist/auth" exact component={TodoistAuth} />
          </Switch>
        </PageWrapper>
      </ContentWrapper>
    </div>
  );
};
