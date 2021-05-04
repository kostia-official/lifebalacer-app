import './polyfills';
import './services/sentry';
import './index.css';
import React from 'react';
import * as serviceWorker from './serviceWorkerRegistration';
import { ThemeProvider } from './providers/ThemeProvider';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { ApolloCacheLoader } from './providers/ApolloCacheLoader';
import { LogsProvider } from './providers/LogsProvider';
import App from './containers/App/App';
import ReactDOM from 'react-dom';
import { CapacitorProvider } from './providers/CapacitorProvider';
import { AuthProvider } from './providers/AuthProvider';

export const history = createBrowserHistory();

ReactDOM.render(
  <LogsProvider>
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <AuthProvider>
          <ApolloCacheLoader>
            <ApolloProvider client={apolloClient}>
              <CapacitorProvider>
                <App />
              </CapacitorProvider>
            </ApolloProvider>
          </ApolloCacheLoader>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </LogsProvider>,
  document.getElementById('root')
);

serviceWorker.register();
