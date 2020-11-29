import React, { useCallback } from 'react';
import {
  Page,
  Tabbar,
  Tab,
  Toolbar,
  BackButton,
  ToolbarButton,
  Icon,
  Navigator
} from 'react-onsenui';
import { EntriesByDay } from './EntriesByDay/EntriesByDay';
import { Activities } from './Activities';
import { Calendar } from './Calendar/Calendar';
import { About } from './About/About';
import { navigatorVar } from '../reactiveState';

export const AppMobile = () => {
  const setNavigator = useCallback((navigator) => {
    if (!navigatorVar()) navigatorVar(navigator);
  }, []);

  return (
    <Navigator
      initialRoute={{ component: EntriesByDay }}
      renderPage={(route, navigator) => {
        setNavigator(navigator);

        return (
          <Page>
            <Tabbar
              index={0}
              position="bottom"
              animation="none"
              renderTabs={() => [
                {
                  content: (
                    <Page key="entries">
                      <EntriesByDay />
                    </Page>
                  ),
                  tab: <Tab key="entries" label="Entries" icon="md-home" />
                },
                {
                  content: (
                    <Page key="calendar">
                      <Calendar />
                    </Page>
                  ),
                  tab: <Tab key="calendar" label="Calendar" icon="md-calendar-alt" />
                },
                {
                  content: (
                    <Page key="activities">
                      <Activities />
                    </Page>
                  ),
                  tab: <Tab key="activities" label="Activities" icon="md-assignment" />
                },
                {
                  content: (
                    <Page key="other">
                      <About />
                    </Page>
                  ),
                  tab: <Tab key="other" label="Other" icon="md-more" />
                }
              ]}
            />
          </Page>
        );
      }}
    />
  );
};
