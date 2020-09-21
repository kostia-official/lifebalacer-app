import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './containers/App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './ThemeProvider';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import { Auth0Provider } from '@auth0/auth0-react';
import { config } from './config';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const history = createBrowserHistory();

ReactDOM.render(
  <Auth0Provider {...config.auth}>
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <ThemeProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.register();
