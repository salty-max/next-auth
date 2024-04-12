/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to `/settings`.
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/forgot-password',
  '/auth/reset-password',
];

/**
 * The prefix for api authentication routes.
 * Routes that starts with this prefix are used for API authentication process.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';

export const Routes = {
  home: '/',
  settings: '/settings',
  server: '/server',
  client: '/client',
  admin: '/admin',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    error: '/auth/error',
    forgotPassword: '/auth/forgot-password',
    newVerification: '/auth/new-verification',
    resetPassword: '/auth/reset-password',
  },
};
