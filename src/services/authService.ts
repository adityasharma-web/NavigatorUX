import type { CurrentUser } from '../types';
import { navigatorApi } from './navigatorApi';
import { createLogger } from './logger';

const log = createLogger('authService');

/**
 * Mock auth. No real authentication is performed in pre-alpha — `signIn` simply
 * resolves the current mock user. A real implementation would exchange SSO/SAML
 * credentials for a session and return the authenticated principal.
 */
export const authService = {
  async signIn(): Promise<CurrentUser> {
    log.info('signIn (mock SSO)');
    return navigatorApi.getCurrentUser();
  },
  async signOut(): Promise<void> {
    log.info('signOut (mock)');
  },
  async getCurrentUser(): Promise<CurrentUser> {
    return navigatorApi.getCurrentUser();
  },
};
