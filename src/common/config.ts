import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { isWeb } from './platform';

class Config {
  host = window.location.origin;
  isCapacitorLocal = window.location.origin === 'http://localhost';
  isDev = process.env.NODE_ENV !== 'production';
  stage = process.env.STAGE || 'dev';
  apiUrl = process.env.REACT_APP_API_URL!;
  warmApiUrl = process.env.REACT_APP_WARM_API_URL;
  auth: Auth0ProviderOptions = {
    domain: 'rewarder.eu.auth0.com',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!,
    redirectUri: isWeb()
      ? this.host + '/auth'
      : 'app.lifebalancer.web.twa://rewarder.eu.auth0.com/cordova/app.lifebalancer.web.twa/auth',
    responseType: 'token id_token',
    scope: 'openid email profile',
    audience: 'rewarder-api',
    useRefreshTokens: true,
    customClaimNamespace: 'https://custom-claims.cycler.cc',
    cacheLocation: 'localstorage'
  };
  todoist = {
    clientId: process.env.REACT_APP_TODOIST_CLIENT_ID,
    scope: 'data:read'
  };
  firebase = {
    config: JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}'),
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
  };
  sentry = {
    dsn: process.env.REACT_APP_SENTRY_DSN
  };
  ably = {
    apiKey: process.env.REACT_APP_ABLY_API_KEY!
  };
  fileServer = {
    url: process.env.REACT_APP_FILES_SERVER_URL!
  };
}

export const config = new Config();
