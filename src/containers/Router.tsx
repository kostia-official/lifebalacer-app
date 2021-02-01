import React, { Suspense } from 'react';
import { Spinner } from '../components/Spinner';
import { Switch } from 'react-router-dom';
import { RouteWrapper } from '../components/RouteWrapper';
import ActivityForm from './ActivityForm/ActivityForm';
import EntriesForm from './EntriesForm/EntriesForm';
import { TodoistAuth } from './TodoistAuth';
import { PrivacyPolicy } from './About/PrivacyPolicy';
import { TermsAndConditions } from './About/TermsAndConditions';
import EntriesByDay from './EntriesByDay/EntriesByDay';
import Journal from './Journal/Journal';
import { About } from './About/About';
import { DevTools } from './About/DevTools';
import { ActivitiesStatistic } from './Statistic/ActivitiesStatistic';
import { ActivityStatistic } from './Statistic/ActivityStatistic';

const Calendar = React.lazy(() => import('./Calendar/Calendar'));
const Activities = React.lazy(() => import('./Activities'));
const Reminders = React.lazy(() => import('./Reminders'));

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
    <Suspense fallback={<Spinner />}>
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
        <RouteWrapper
          path="/statistic/activity/:_id"
          isNested
          exact
          component={ActivityStatistic}
        />
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
    </Suspense>
  );
};
