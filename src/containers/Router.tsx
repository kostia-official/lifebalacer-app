import React from 'react';
import { Spinner } from '../components/Spinner';
import { Switch } from 'react-router-dom';
import { RouteWrapper } from '../components/RouteWrapper';
import { TodoistAuth } from './TodoistAuth';
import { PrivacyPolicy } from './About/PrivacyPolicy';
import { TermsAndConditions } from './About/TermsAndConditions';
import Loadable from 'react-loadable';
import styled from 'styled-components';
import EntriesByDay from './EntriesByDay/EntriesByDay';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingComponent = (props: { pastDelay: boolean }) => {
  if (props.pastDelay) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  return null;
};

const LoadableCommon = (loader: any) =>
  Loadable({
    loader,
    loading: LoadingComponent,
    delay: 100
  });

const EntriesForm = LoadableCommon(() => import('./EntriesForm/EntriesForm'));
const Journal = LoadableCommon(() => import('./Journal/Journal'));
const ActivityForm = LoadableCommon(() => import('./ActivityForm/ActivityForm'));
const Activities = LoadableCommon(() => import('./Activities'));
const Calendar = LoadableCommon(() => import('./Calendar/Calendar'));
const Reminders = LoadableCommon(() => import('./Reminders'));
const About = LoadableCommon(() => import('./About/About'));
const DevTools = LoadableCommon(() => import('./About/DevTools'));
const ActivitiesStatistic = LoadableCommon(() => import('./Statistic/ActivitiesStatistic'));
const ActivityStatistic = LoadableCommon(() => import('./Statistic/ActivityStatistic'));

export interface RouteState {
  path: string;
  isPublic?: boolean;
  isNested?: boolean;
}

export interface IRoute extends RouteState {
  name: string;
  icon: string;
  component: React.ComponentType<any>;
}

export const routes: IRoute[] = [
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
    component: About,
    isPublic: true
  }
];

export const Router = () => {
  return (
    <Switch>
      {routes.map((page) => (
        <RouteWrapper
          key={page.path}
          path={page.path}
          isPublic={page.isPublic}
          exact
          component={page.component}
        />
      ))}
      <RouteWrapper path="/activities/create" isNested exact component={ActivityForm} />
      <RouteWrapper path="/activities/edit/:_id" isNested exact component={ActivityForm} />
      <RouteWrapper path="/statistic/activity/:_id" isNested exact component={ActivityStatistic} />
      <RouteWrapper path="/entries/:date" isNested exact component={EntriesForm} />
      <RouteWrapper path="/todoist/auth" isNested exact component={TodoistAuth} />
      <RouteWrapper
        path="/about/privacy-policy"
        isNested
        isPublic
        exact
        component={PrivacyPolicy}
      />
      <RouteWrapper
        path="/about/terms-and-conditions"
        isPublic
        isNested
        exact
        component={TermsAndConditions}
      />
      <RouteWrapper path="/about/dev-tools" isPublic isNested exact component={DevTools} />
    </Switch>
  );
};
