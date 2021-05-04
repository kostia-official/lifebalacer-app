import { config } from './config';
import { Auth0Client } from '@auth0/auth0-spa-js';

export interface Auth0User {
  name: string;
  username: string;
  email: string;
  picture: string;
  userId: string;
}

export const auth0Client = new Auth0Client({
  ...config.auth,
  client_id: config.auth.clientId,
  redirect_uri: config.auth.redirectUri
});
