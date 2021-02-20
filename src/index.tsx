import './services/sentry';
import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorkerRegistration';
import { ThemeProvider } from './ThemeProvider';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import { Auth0Provider } from '@auth0/auth0-react';
import { config } from './common/config';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { ApolloCacheLoader } from './containers/ApolloCacheLoader';
import { LogsProvider } from './components/LogsProvider';
import App from './containers/App/App';
import ReactDOM from 'react-dom';

export const history = createBrowserHistory();

ReactDOM.render(
  <LogsProvider>
    <Auth0Provider {...config.auth}>
      <ThemeProvider>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ApolloCacheLoader>
            <ApolloProvider client={apolloClient}>
              <App />
            </ApolloProvider>
          </ApolloCacheLoader>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Auth0Provider>
  </LogsProvider>,
  document.getElementById('root')
);

serviceWorker.register();
