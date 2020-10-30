export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'https://rewarder-api-gateway-prod.cycler.cc/graphql',
  wsUrl: process.env.REACT_APP_WS_URL || 'wss://rewarder-staging.herokuapp.com/graphql',
  auth: {
    domain: 'rewarder.eu.auth0.com',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'BDNB7kOtnhg1cnOTukKWuyZl4kksS1eP',
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI || 'http://localhost:3000',
    responseType: 'token id_token',
    scope: 'openid email profile',
    audience: 'rewarder-api',
    useRefreshTokens: true,
    customClaimNamespace: 'https://custom-claims.cycler.cc'
  },
  todoist: {
    clientId: process.env.REACT_APP_TODOIST_CLIENT_ID || 'c2620bca88914009852a7efa297317e8',
    scope: 'data:read'
  },
  firebase: {
    config: process.env.REACT_APP_FIREBASE_CONFIG && JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG),
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
  }
};
