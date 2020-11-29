import './services/sentry';
import React from 'react';
import './index.css';
import 'onsenui/css/onsenui.css';
import './styles/onsen-css-components.min.css';
import './styles/theme.css';
import './styles/theme.css';

import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorkerRegistration';
import { ThemeProvider } from './ThemeProvider';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import { Auth0Provider } from '@auth0/auth0-react';
import { config } from './common/config';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { ApolloCacheLoader } from './containers/ApolloCacheLoader';
import { AppMobile } from './containers/AppMobile';

export const history = createBrowserHistory();

ReactDOM.render(
  <Auth0Provider {...config.auth}>
    <Router history={history}>
      <ThemeProvider>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ApolloCacheLoader>
            <ApolloProvider client={apolloClient}>
              <AppMobile />
            </ApolloProvider>
          </ApolloCacheLoader>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.register();
