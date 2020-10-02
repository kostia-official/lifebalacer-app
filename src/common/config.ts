import { Auth0ProviderOptions } from '@auth0/auth0-react';

export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'https://rewarder-staging.herokuapp.com/graphql',
  wsUrl: process.env.REACT_APP_WS_URL || 'wss://rewarder-staging.herokuapp.com/graphql',
  auth: {
    domain: 'kozzztya.auth0.com',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'kSGokvSXbW2fpANxozdHRE7MvU6GFZAa',
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI || 'http://localhost:3000',
    responseType: 'token id_token',
    scope: 'openid email profile',
    audience: 'rewarder-api',
    useRefreshTokens: true
  } as Auth0ProviderOptions,
  todoist: {
    clientId: process.env.REACT_APP_TODOIST_CLIENT_ID || 'c2620bca88914009852a7efa297317e8',
    scope: 'data:read'
  }
};
