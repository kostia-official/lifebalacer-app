import './services/sentry';
import React from 'react';
import { AppRegistry } from 'react-native';
import './index.css';
import { App } from './containers/App';
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
import { LogsProvider } from './components/LogsProvider';
import AppNew from './containers/AppNew';

export const history = createBrowserHistory();

const Index = () => <AppNew />;

AppRegistry.registerComponent('Index', () => Index);

AppRegistry.runApplication('Index', {
  rootTag: document.getElementById('root')
});

serviceWorker.register();
