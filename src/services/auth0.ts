import { config } from '../common/config';
import { Auth0Client, IdToken } from "@auth0/auth0-spa-js";

export interface Auth0User {
  name: string;
  given_name: string;
  email: string;
  picture: string;
}

class Auth {
  private auth0: Auth0Client;

  public isAuthError = false;
  private token: string | null = null;
  private user: Auth0User | null = null;

  private getTokenSilentlyPromise: Promise<string> | null = null;
  private getIdTokenClaimsPromise: Promise<IdToken> | null = null;

  constructor() {
    this.auth0 = new Auth0Client({
      ...config.auth,
      client_id: config.auth.clientId,
      redirect_uri: config.auth.redirectUri
    });
  }

  async updateToken(): Promise<string | null> {
    try {
      const accessToken = await this.getTokenSilentlyCached();
      localStorage.setItem('token', accessToken);
      this.isAuthError = false;
      this.token = accessToken;

      return accessToken;
    } catch (err) {
      this.isAuthError = true;
      this.token = null;

      return null;
    }
  }

  // TOOD: Finish and refactor useAuth
  // async updateUser(): Promise<string | null> {
    // try {
    //   const claims = await this.getIdTokenClaimsCached();
    //   const user: Auth0User = {
    //     ...claims,
    //
    //   }
    //
    //   localStorage.setItem('user', JSON.stringify(user));
    //   this.user = user;
    //
    //   return user;
    // } catch (err) {
    //   this.isAuthError = true;
    //   this.token = null;
    //
    //   return null;
    // }
  // }

  async getTokenSilentlyCached(): Promise<string> {
    if (this.getTokenSilentlyPromise) return this.getTokenSilentlyPromise;
    this.getTokenSilentlyPromise = this.auth0.getTokenSilently();
    return this.getTokenSilentlyPromise;
  }

  async getIdTokenClaimsCached(): Promise<IdToken> {
    if (this.getIdTokenClaimsPromise) return this.getIdTokenClaimsPromise;
    this.getIdTokenClaimsPromise = this.auth0.getIdTokenClaims();
    return this.getIdTokenClaimsPromise;
  }

  async getToken(): Promise<string | null> {
    const token = this.token || localStorage.getItem('token');

    if (!this.isAuthError && token) return token;

    return this.updateToken();
  }
}

export const authService = new Auth();
